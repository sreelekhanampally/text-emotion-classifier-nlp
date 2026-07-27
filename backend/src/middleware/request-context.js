import { randomUUID } from "node:crypto";

export function requestContext(req, res, next) {
  const suppliedRequestId = req.get("x-request-id");
  req.requestId = suppliedRequestId || randomUUID();
  res.setHeader("x-request-id", req.requestId);
  next();
}
