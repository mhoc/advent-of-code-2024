import { assertEquals } from "@std/assert";
import { day04 } from "./day04.ts";

Deno.test(function test_day04() {
  const r = day04(Deno.readFileSync("./src/day04/input"));
  assertEquals(r[0], 2483);
  assertEquals(r[1], 1925);
  console.table(r);
});
