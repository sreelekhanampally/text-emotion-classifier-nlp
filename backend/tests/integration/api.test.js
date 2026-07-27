import assert from "node:assert/strict";
import { after, test } from "node:test";

process.env.NODE_ENV = "test";
process.env.AI_SERVICE_BASE_URL = "http://127.0.0.1:8000";
process.env.AI_SERVICE_API_KEY = "test-service-key";

const { app } = await import("../../src/app.js");
const server = app.listen(0);
await new Promise((resolve) => server.once("listening", resolve));
const baseUrl = `http://127.0.0.1:${server.address().port}`;

after(() => new Promise((resolve, reject) => server.close((error) => (error ? reject(error) : resolve()))));

test("health endpoint returns the standard response envelope", async () => {
  const response = await fetch(`${baseUrl}/v1/health`);
  const body = await response.json();

  assert.equal(response.status, 200);
  assert.equal(body.data.status, "ok");
  assert.ok(body.meta.requestId);
});

test("prediction endpoint rejects an empty text value", async () => {
  const response = await fetch(`${baseUrl}/v1/emotions:predict`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ text: "   " })
  });
  const body = await response.json();

  assert.equal(response.status, 400);
  assert.equal(body.error.code, "VALIDATION_ERROR");
  assert.ok(body.error.requestId);
});
