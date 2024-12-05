import { day01 } from "./day01/day01.ts";
import { day02 } from "./day02/day02.ts";
import { day03 } from "./day03/day03.ts";
import { day04 } from "./day04/day04.ts";

Deno.bench(function day01_all() {
  day01(Deno.readTextFileSync("./src/day01/input"));
});

Deno.bench(function day02_all() {
  day02(Deno.readTextFileSync("./src/day02/input"));
});

Deno.bench(function day03_all() {
  day03(Deno.readTextFileSync("./src/day03/input"));
});

Deno.bench(function day04_all() {
  day04(Deno.readFileSync("./src/day04/input"));
});
