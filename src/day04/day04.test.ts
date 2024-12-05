import { assertEquals } from "@std/assert";
import { day04, Snowflake } from "./day04.ts";

Deno.test(function test_day04() {
  const data = Deno.readTextFileSync("./src/day04/input");
  const r = day04(data);
  assertEquals(r.xmasCount, 2483);
  console.table(r);
});

const TEST_GRID = [
  "QWERTYUI",
  "OPASDFGH",
  "JKLZXCVB",
  "NMQWERTY",
  "IOPASDFG",
  "JKLZXCVB",
  "NMQWERTY",
  "UIOPASDF",
];

Deno.test(function test_snowflake_cc() {
  const sf1 = new Snowflake(TEST_GRID, 4, 4);
  assertEquals(sf1.cc(), "S");
  const sf2 = new Snowflake(TEST_GRID, 20, 20);
  assertEquals(sf2.cc(), undefined);
});

Deno.test(function test_snowflake_tt() {
  const sf1 = new Snowflake(TEST_GRID, 4, 4);
  assertEquals(sf1.tt(1), "E");
  assertEquals(sf1.tt(2), "X");
  assertEquals(sf1.tt(3), "D");
  assertEquals(sf1.tt(4), "T");
  const sf2 = new Snowflake(TEST_GRID, 20, 20);
  assertEquals(sf2.tt(1), undefined);
  const sf3 = new Snowflake(TEST_GRID, 0, 0);
  assertEquals(sf3.tt(1), undefined);
});

Deno.test(function test_snowflake_tr() {
  const sf1 = new Snowflake(TEST_GRID, 4, 4);
  assertEquals(sf1.tr(1), "R");
  assertEquals(sf1.tr(2), "V");
  assertEquals(sf1.tr(3), "H");
  assertEquals(sf1.tr(4), undefined);
  const sf2 = new Snowflake(TEST_GRID, 20, 20);
  assertEquals(sf2.tr(1), undefined);
  const sf3 = new Snowflake(TEST_GRID, 0, 0);
  assertEquals(sf3.tr(1), undefined);
});

Deno.test(function test_snowflake_rr() {
  const sf1 = new Snowflake(TEST_GRID, 3, 3);
  assertEquals(sf1.rr(1), "E");
  assertEquals(sf1.rr(2), "R");
  assertEquals(sf1.rr(3), "T");
  assertEquals(sf1.rr(4), "Y");
  assertEquals(sf1.rr(5), undefined);
  const sf2 = new Snowflake(TEST_GRID, 20, 20);
  assertEquals(sf2.rr(1), undefined);
  const sf3 = new Snowflake(TEST_GRID, 7, 7);
  assertEquals(sf3.rr(1), undefined);
});

Deno.test(function test_snowflake_br() {
  const sf1 = new Snowflake(TEST_GRID, 3, 3);
  assertEquals(sf1.br(1), "S");
  assertEquals(sf1.br(2), "C");
  assertEquals(sf1.br(3), "T");
  assertEquals(sf1.br(4), "F");
  assertEquals(sf1.br(5), undefined);
  const sf2 = new Snowflake(TEST_GRID, 20, 20);
  assertEquals(sf2.br(1), undefined);
  const sf3 = new Snowflake(TEST_GRID, 7, 7);
  assertEquals(sf3.br(1), undefined);
});
