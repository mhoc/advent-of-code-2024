// import { assertEquals } from "@std/assert";
import { assertEquals } from "@std/assert/equals";
import { day05 } from "./day05.ts";

Deno.test(function test_day04() {
  const r = day05(Deno.readTextFileSync("./src/day05/input"));
  assertEquals(r.middleSumOfCorrectlyOrdered, 5208);
  console.table(r);
});
