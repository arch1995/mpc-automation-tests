import axios from "axios";
import dns from "dns";
import express, { NextFunction, Request, Response } from "express";
import basicAuth from "express-basic-auth";

import { OpenloginScript } from "../../scripts/openlogin.scripts";
import { SapphireScript } from "../../scripts/sapphire.scripts";

const router = express.Router();

const format = (data: any): any[] => {
  const result: { email: string; registrationTime: string | null; loginTime: string | null }[] = [];
  Object.keys(data).forEach((key: string) => {
    const obj: any = { email: key };
    obj.registrationTime = data[key].register.auth;
    obj.loginTime = data[key].login.auth;
    obj.r_reg_time = data[key].register.register;
    obj.r_tkey_time = data[key].register.tkeyTime;
    obj.r_sp_time = data[key].register.setPreferencesTime;
    obj.r_total_time = data[key].register.totalLogin;
    obj.log_auth_time = data[key].login.register;
    obj.log_tkey_time = data[key].login.tkeyTime;
    obj.log_sp_time = data[key].login.setPreferencesTime;
    obj.log_total_time = data[key].login.totalLogin;
    result.push(obj);
  });

  return result;
};
router.get("/health", (_req, res) => {
  return res.status(200).send("OK");
});

router.use(
  ["/test-login/:type", "/return-mpc-connected-geo"],
  basicAuth({
    users: { admin: process.env.BASIC_AUTH_PASSWORD ? process.env.BASIC_AUTH_PASSWORD : "testing" },
  })
);

router.post("/test-login/:type", async (req: Request, res: Response, _next: NextFunction) => {
  const queryParams = req.query;
  const { type } = req.params;
  const { count, network, up, down, latency, postURL } = queryParams;
  let scripts = [];
  if (type === "all") {
    scripts = [OpenloginScript, SapphireScript];
  } else {
    scripts = [type === "current" ? OpenloginScript : SapphireScript];
  }

  res.json({ status: "ok", message: "script started" });

  const formattedData: any = {};

  let throttling: any;

  if (up && down && latency) {
    throttling = { up: parseInt(up as string, 10), down: parseInt(down as string, 10), latency: parseInt(latency as string, 10) };
  }

  for (let j = 0; j < scripts.length; j++) {
    const timingMap: Record<string, Record<string, Record<string, string | undefined>>> = {};
    const baseAppUrl = process.env.APP_URL ?? "http://localhost:3000";

    let result = null;
    for (let i = 0; i < parseInt(count as string, 10); i++) {
      // eslint-disable-next-line no-await-in-loop
      result = await scripts[j]({ i, appurl: baseAppUrl, network: network as string, networkThrottle: throttling }).catch((err) => {
        console.log("error inside the script", err);
        return null;
      });
      console.log("result", result);
      if (result) {
        timingMap[result.email] = result.timings;
      }
    }

    console.log("----result---", JSON.stringify(timingMap));
    if (result) formattedData[result.type] = format(timingMap);
  }

  const eventPostURL = postURL ?? "https://385988892adf6447ed3bfaae2a948010.m.pipedream.net";

  await axios.post(`${eventPostURL}?network=${network}&up=${up}&down=${down}&latency=${latency}`, formattedData);
});

router.get("/return-mpc-connected-geo", async (req: Request, res: Response) => {
  try {
    const { url } = req.query;
    if (!url) {
      return res.status(200).send("Invalid URL");
    }
    const ip = await new Promise((resolve, reject) => {
      dns.lookup(url as string, 4, (err, result) => {
        if (err) reject(err);
        resolve(result);
      });
    });
    if (ip) {
      const data = await axios.get(`https://ipinfo.io/${ip}?token=9bda5615d03575`);
      let city = null;
      if (data.status === 200) {
        city = data.data.city;
      }
      return res.status(200).json({ ip, city });
    }
    return res.status(201).json("Didnt find anything");
  } catch (err: any) {
    console.log(err);
    return res.status(500).send(err ? err.message : "something went wrong");
  }
});

export default router;
