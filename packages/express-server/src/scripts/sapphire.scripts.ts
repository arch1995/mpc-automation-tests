/* eslint-disable import/no-extraneous-dependencies */
import faker from "faker";
import puppeteer from "puppeteer";

import { extractTime } from "../utils/helper";

export const SapphireScript = async (i: number, appurl: string) => {
  const timingsMap: Record<string, Record<string, Record<string, string | undefined>>> = {};
  console.log(`iteration index: ${i}`);
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(`${appurl}/sapphire`);
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
        timingsMap[email][eventType].register = authTime;
      } else if (text.includes("@check_if_tkey_exist")) {
        tkeyTime = extractTime(text);
        console.log("tkey time taken: ", tkeyTime);
        timingsMap[email][eventType].tkeyTime = authTime;
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
  return { email, timings: timingsMap[email] };
};
