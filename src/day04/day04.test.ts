import { assertEquals } from "@std/assert";
import { day04 } from "./day04.ts";

Deno.test(function test_day04() {
  const data = Deno.readTextFileSync("./src/day04/input");
  const r = day04(data);
  assertEquals(r.xmasCount, 2483);
  assertEquals(r.masmasCount, 1925);
  console.table(r);
});
