import { expect, test } from "bun:test";
import { day02 } from "./day02";

test("day02", () => {
  const r = day02("./src/day02/input");
  expect(r.safeWithoutDampener).toBe(472);
  expect(r.safeWithDampener).toBe(520);
  console.table(r);
});
