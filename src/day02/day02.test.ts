import { assertEquals } from "@std/assert";
import { day02 } from "./day02.ts";

Deno.test(function test_day02() {
  const data = Deno.readTextFileSync("./src/day02/input");
  const r = day02(data);
  assertEquals(r.safeWithoutDampener, 472);
  assertEquals(r.safeWithDampener, 520);
  console.table(r);
});
