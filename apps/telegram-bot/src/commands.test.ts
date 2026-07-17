import { test } from "node:test";
import assert from "node:assert/strict";
import { handleCommand } from "./commands.ts";

test("/start shows menu", () => {
  assert.match(handleCommand("/start") ?? "", /Welcome to Sylvara/);
});

test("/quote validates arguments", () => {
  assert.match(handleCommand("/quote") ?? "", /Usage/);
  assert.match(handleCommand("/quote P01 200") ?? "", /Quotation request registered/);
  assert.match(handleCommand("/quote ZZZ 5") ?? "", /Unknown code/);
});

test("/track requires an order number", () => {
  assert.match(handleCommand("/track") ?? "", /Usage/);
  assert.match(handleCommand("/track SO-2026-000123") ?? "", /Tracking/);
});

test("non-commands return null for AI fallback", () => {
  assert.equal(handleCommand("do you ship to Brazil?"), null);
});
