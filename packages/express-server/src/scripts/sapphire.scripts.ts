/* eslint-disable import/no-extraneous-dependencies */
import faker from "faker";
import puppeteer from "puppeteer";

import { extractTime } from "../utils/helper";

export const SapphireScript = async ({
  i,
  appurl,
  network,
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

  await page.goto(`${appurl}/sapphire?network=${network}`);
  console.log("page loaded");

  await page.waitForSelector(".login-with-openlogin");
  const email = faker.internet.email();
  console.log("email loaded", email);
  // register the user with a new account.
  await page.type(".openlogin-input-text", email);
  await page.click(".login-with-openlogin");
  const startTime = Date.now();

  if (!timingsMap[email]) timingsMap[email] = {};

  let eventType = "register";

  page.on("console", (cnsl: any) => {
    const text = cnsl.text();
    console.log("PAGE LOG:", text);
    if (text.includes("time taken")) {
      if (!timingsMap[email][eventType]) timingsMap[email][eventType] = {};
      if (text.includes("@auth")) {
        const time = extractTime(text);
        console.log("authentication time taken: ", time);
        timingsMap[email][eventType].auth = time;
      } else if (text.includes("@user_registeration")) {
        const time = extractTime(text);
        console.log("user registration time taken: ", time);
        timingsMap[email][eventType].register = time;
      } else if (text.includes("@check_if_tkey_exist")) {
        const time = extractTime(text);
        console.log("tkey time taken: ", time);
        timingsMap[email][eventType].tkeyTime = time;
      } else if (text.includes("@set_preferences")) {
        const time = extractTime(text);
        console.log("setPreferences time taken: ", time);
        timingsMap[email][eventType].setPreferencesTime = time;
      } else if (text.includes("@totalLoginTime")) {
        const time = extractTime(text);
        console.log("total login time taken: ", time);
        timingsMap[email][eventType].totalLogin = time;
      }
    }
  });

  await page.waitForSelector(".logged-in-state");

  console.log("registration timer over", Date.now() - startTime);
  // eslint-disable-next-line require-atomic-updates
  timingsMap[email][eventType].totalLogin = (Date.now() - startTime).toString();

  // log out the user.
  await page.click(".log-out-cta");
  await page.waitForSelector(".login-with-openlogin");

  eventType = "login";
  // log back in.
  await page.type(".openlogin-input-text", email);
  await page.click(".login-with-openlogin");
  const loginTime = Date.now();
  await page.waitForSelector(".logged-in-state");
  console.log("login timer over", Date.now() - loginTime);
  // eslint-disable-next-line require-atomic-updates
  timingsMap[email][eventType].totalLogin = (Date.now() - loginTime).toString();
  await browser.close();
  return { type: "saphire", email, timings: timingsMap[email] };
};
