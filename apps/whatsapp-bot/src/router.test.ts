import { test } from "node:test";
import assert from "node:assert/strict";
import { route } from "./router.ts";

test("greets on hello", () => {
  const r = route("hello");
  assert.match(r.reply, /Welcome to \*Sylvara/);
});

test("returns catalog", () => {
  const r = route("CATALOG");
  assert.match(r.reply, /quick catalog/);
  assert.match(r.reply, /P01/);
});

test("parses quotation command", () => {
  const r = route("quote P01 200");
  assert.equal(r.lead?.code, "P01");
  assert.equal(r.lead?.quantity, 200);
  assert.match(r.reply, /Quotation request received/);
});

test("rejects unknown product code", () => {
  const r = route("QUOTE Z99 5");
  assert.match(r.reply, /Unknown product code/);
  assert.equal(r.lead, undefined);
});

test("handover on AGENT", () => {
  const r = route("agent");
  assert.equal(r.handover, true);
});

test("free-form falls through to AI", () => {
  const r = route("I need 500 printed pizza boxes delivered to Lagos");
  assert.equal(r.reply, "");
});
