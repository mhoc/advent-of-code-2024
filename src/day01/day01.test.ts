import { assertEquals } from "@std/assert";
import { day01 } from "./day01.ts";

Deno.test(function test_day01() {
  const data = Deno.readTextFileSync("./src/day01/input");
  const r = day01(data);
  assertEquals(r.totalDistance, 2113135);
  assertEquals(r.similarityScore, 19097157);
  console.table(r);
});
