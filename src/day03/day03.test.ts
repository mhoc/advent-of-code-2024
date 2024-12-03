import { assertEquals } from "@std/assert";
import { day03 } from "./day03.ts";

Deno.test(function test_day03() {
  const data = Deno.readTextFileSync("./src/day03/input");
  const r = day03(data);
  assertEquals(r.sumOnlyMults, 164730528);
  assertEquals(r.sumWithEnabledDisabled, 70478672);
  console.table(r);
});
