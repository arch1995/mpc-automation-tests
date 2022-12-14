/* eslint-disable import/no-extraneous-dependencies */
import faker from "faker";
import puppeteer from "puppeteer";

import { extractTime } from "../utils/helper";

export const SapphireScript = async (i: number, appurl: string) => {
  const timingsMap: Record<string, Record<string, Record<string, string | undefined>>> = {};
  console.log(`iteration index: ${i}`);
  const browser = await puppeteer.launch({
    pipe: true,
    headless: true,
    dumpio: true,
    args: [
      "--disable-dev-shm-usage",
      "--disable-setuid-sandbox",
      "--no-sandbox",
      "--no-zygote",
      "--disable-gpu",
      "--disable-audio-output",
      "--headless",
      "--single-process",
    ],
  });
  const page = await browser.newPage();
  await page.goto(`${appurl}/sapphire`);
  console.log("page loaded");

  await page.waitForSelector(".login-with-openlogin");
  const email = faker.internet.email();
  console.log("email loaded", email);
  // register the user with a new account.
  await page.type(".openlogin-input-text", email);
  await page.click(".login-with-openlogin");

  let authTime, regTime, tkeyTime;
  page.on("console", (cnsl: any) => {
    const text = cnsl.text();
    console.log("PAGE LOG:", text);
    if (text.includes("time taken")) {
      if (text.includes("@auth")) {
        authTime = extractTime(text);
        console.log("authentication time taken: ", authTime);
      } else if (text.includes("@user_registeration")) {
        regTime = extractTime(text);
        console.log("user registration time taken: ", regTime);
      } else if (text.includes("@check_if_tkey_exist")) {
        tkeyTime = extractTime(text);
        console.log("tkey time taken: ", tkeyTime);
      }
    }
  });

  await page.waitForSelector(".logged-in-state");
  if (!timingsMap[email]) timingsMap[email] = {};

  timingsMap[email].registration = {
    auth: authTime,
    reg: regTime,
    tkey: tkeyTime,
  };

  // log out the user.
  await page.click(".log-out-cta");
  await page.waitForSelector(".login-with-openlogin");

  // log back in.
  await page.type(".openlogin-input-text", email);
  await page.click(".login-with-openlogin");
  await page.waitForSelector(".logged-in-state");

  timingsMap[email].login = {
    auth: authTime,
    reg: regTime,
    tkey: tkeyTime,
  };
  await browser.close();
  return { email, timings: timingsMap[email] };
};
