import { day01 } from "./day01/day01.ts";
import { day02 } from "./day02/day02.ts";
import { day03 } from "./day03/day03.ts";
import { day04 } from "./day04/day04.ts";

Deno.bench(function day01_all() {
  const data = Deno.readTextFileSync("./src/day01/input");
  day01(data);
});

Deno.bench(function day02_all() {
  const data = Deno.readTextFileSync("./src/day02/input");
  day02(data);
});

Deno.bench(function day03_all() {
  const data = Deno.readTextFileSync("./src/day03/input");
  day03(data);
});

Deno.bench(function day04_all() {
  const data = Deno.readTextFileSync("./src/day04/input");
  day04(data);
});
