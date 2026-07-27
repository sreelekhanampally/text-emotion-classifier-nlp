import { Router } from "express";
import { sendSuccess } from "../utils/response.js";
import { emotionRouter } from "./emotion.routes.js";

export const apiRouter = Router();

apiRouter.get("/health", (req, res) =>
  sendSuccess(res, {
    data: { status: "ok", service: "emotionsense-backend" },
    meta: { requestId: req.requestId }
  })
);

apiRouter.use(emotionRouter);
