import { expect, test } from "bun:test";
import { day01 } from "./day01";

test("day01", () => {
  const r = day01("./src/day01/input");
  expect(r.totalDistance).toBe(2113135);
  expect(r.similarityScore).toBe(19097157);
  console.table(r);
});
