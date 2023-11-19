import express from "express";
import { Registry } from "prom-client";

import { promDefaultMetrics } from "./metrics/default";
import { promEventLoopUtilization } from "./metrics/elu";
import { promRequestLatency, promTotalRequests } from "./metrics/requests";

const register = new Registry();

const app = express();

promDefaultMetrics(register);
promEventLoopUtilization(register);
promRequestLatency(register, app);
promTotalRequests(register, app);

app.get("/metrics", async (req, res) => {
  try {
    res.set("Content-Type", register.contentType);
    res.end(await register.metrics());
  } catch (e) {
    res.status(500).end(e);
  }
});

const port = 8080;
app.listen(port, () => {
  console.log(`express 서버를 ${port}번 포트에서 시작합니다.`);
});
