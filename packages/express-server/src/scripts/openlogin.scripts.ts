// eslint-disable-next-line import/no-extraneous-dependencies
import faker from "faker";
// eslint-disable-next-line import/no-extraneous-dependencies
import puppeteer from "puppeteer";

import { extractTime } from "../utils/helper";

export const OpenloginScript = async ({
  i,
  appurl,
  network = "mainnet",
  networkThrottle,
}: {
  i: number;
  appurl: string;
  network?: string;
  networkThrottle?: { up: number; down: number; latency: number };
}): Promise<any> => {
  const timingsMap: Record<string, Record<string, Record<string, string | undefined>>> = {};
  console.log(`iteration index: ${i}`);
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  page.setDefaultTimeout(90 * 1000);

  if (networkThrottle) {
    // Connect to Chrome DevTools
    const client = await page.target().createCDPSession();

    // Set throttling property
    await client.send("Network.emulateNetworkConditions", {
      offline: false,
      downloadThroughput: (networkThrottle.up * 1024 * 1024) / 8,
      uploadThroughput: (networkThrottle.down * 1024 * 1024) / 8,
      latency: networkThrottle.latency,
    });
  }
  await page.goto(`${appurl}/?network=${network}`);
  console.log("page loaded");

  await page.waitForSelector(".login-with-openlogin");
  const email = faker.internet.email();
  console.log("email loaded", email);
  // register the user with a new account.
  await page.type(".openlogin-input-text", email);
  await page.click(".login-with-openlogin");

  let authTime: string, regTime: string, tkeyTime: string;
  if (!timingsMap[email]) timingsMap[email] = {};

  let eventType = "register";

  page.on("console", (cnsl: any) => {
    const text = cnsl.text();
    console.log("PAGE LOG:", text);
    if (text.includes("time taken")) {
      if (!timingsMap[email][eventType]) timingsMap[email][eventType] = {};
      if (text.includes("@auth")) {
        authTime = extractTime(text);
        console.log("authentication time taken: ", authTime);
        timingsMap[email][eventType].auth = authTime;
      } else if (text.includes("@user_registeration")) {
        regTime = extractTime(text);
        console.log("user registration time taken: ", regTime);
        timingsMap[email][eventType].register = regTime;
      } else if (text.includes("@check_if_tkey_exist")) {
        tkeyTime = extractTime(text);
        console.log("tkey time taken: ", tkeyTime);
        timingsMap[email][eventType].tkeyTime = tkeyTime;
      }
    }
  });

  await page.waitForSelector(".logged-in-state");

  // log out the user.
  await page.click(".log-out-cta");
  await page.waitForSelector(".login-with-openlogin");

  eventType = "login";
  // log back in.
  await page.type(".openlogin-input-text", email);
  await page.click(".login-with-openlogin");
  await page.waitForSelector(".logged-in-state");

  await browser.close();
  return { type: "current", email, timings: timingsMap[email] };
};
