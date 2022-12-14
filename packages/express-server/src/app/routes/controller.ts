import axios from "axios";
import express, { NextFunction, Request, Response } from "express";
import basicAuth from "express-basic-auth";

import { OpenloginScript } from "../../scripts/openlogin.scripts";
import { SapphireScript } from "../../scripts/sapphire.scripts";

const router = express.Router();

const format = (data: any): any[] => {
  const result: { email: string; registrationTime: string | null; loginTime: string | null }[] = [];
  Object.keys(data).forEach((key: string) => {
    const obj = { email: key, registrationTime: null, loginTime: null };
    obj.registrationTime = data[key].register.auth;
    obj.loginTime = data[key].login.auth;
    // obj["auth_time"] = data[key].registration.auth;
    // obj["tkey_time"] = data[key].registration.tkey;
    result.push(obj);
  });

  return result;
};
router.get("/health", (_req, res) => {
  return res.status(200).send("OK");
});

router.use(
  "/test-login/:type",
  basicAuth({
    users: { admin: process.env.BASIC_AUTH_PASSWORD ? process.env.BASIC_AUTH_PASSWORD : "testing" },
  })
);
router.post("/test-login/:type", async (req: Request, res: Response, _next: NextFunction) => {
  const queryParams = req.query;
  const { type } = req.params;
  const { count } = queryParams;
  const script = type === "current" ? OpenloginScript : SapphireScript;
  const baseAppUrl = process.env.APP_URL ?? "localhost:3000";
  res.json({ status: "ok", message: "script started" });
  const timingMap: Record<string, Record<string, Record<string, string | undefined>>> = {};

  for (let i = 0; i < parseInt(count as string, 10); i++) {
    // eslint-disable-next-line no-await-in-loop
    const result = await script(i, baseAppUrl).catch((err) => {
      console.log("error insider the script", err);
      return null;
    });
    if (result) timingMap[result.email] = result.timings;
  }

  console.log("----result---", JSON.stringify(timingMap));

  const formattedData = format(timingMap);

  await axios.post("https://f32c1d7f54459a992ecd30792af0425d.m.pipedream.net", formattedData);
});

export default router;
