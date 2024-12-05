export function day04(data: string) {
  const lines = data.split("\n");
  let xmasCount = 0;
  for (let lineno = 0; lineno < lines.length; lineno++) {
    for (let charno = 0; charno < lines[lineno].length; charno++) {
      const centerChar = lines[lineno][charno];
      if (centerChar === "X") {
        const wordflake = new Wordflake(new Snowflake(lines, lineno, charno));
        xmasCount += wordflake
          .wordsRadial(4)
          .filter((w) => w === "XMAS").length;
      }
    }
  }
  let masmasCount = 0;
  for (let lineno = 0; lineno < lines.length; lineno++) {
    for (let charno = 0; charno < lines[lineno].length; charno++) {
      const centerChar = lines[lineno][charno];
      if (centerChar === "A") {
        const wordflake = new Wordflake(new Snowflake(lines, lineno, charno));
        const words = wordflake.wordsX3();
        masmasCount +=
          words.filter((w) => w === "MAS" || w === "SAM").length ===
          words.length
            ? 1
            : 0;
      }
    }
  }
  return { masmasCount, xmasCount };
}

/**
 * Wordflake is an abstraction layer above Snowflake which forms words of a given length, in all 8 cardinal snowflake
 * directions.
 */
export class Wordflake {
  constructor(private snowflake: Snowflake) {}

  public wordsRadial(length: number): string[] {
    let tt = "";
    for (let n = 0; n < length; n++) tt += this.snowflake.tt(n);
    let tr = "";
    for (let n = 0; n < length; n++) tr += this.snowflake.tr(n);
    let rr = "";
    for (let n = 0; n < length; n++) rr += this.snowflake.rr(n);
    let br = "";
    for (let n = 0; n < length; n++) br += this.snowflake.br(n);
    let bb = "";
    for (let n = 0; n < length; n++) bb += this.snowflake.bb(n);
    let bl = "";
    for (let n = 0; n < length; n++) bl += this.snowflake.bl(n);
    let ll = "";
    for (let n = 0; n < length; n++) ll += this.snowflake.ll(n);
    let tl = "";
    for (let n = 0; n < length; n++) tl += this.snowflake.tl(n);
    return [tt, tr, rr, br, bb, bl, ll, tl];
  }

  public wordsX3(): string[] {
    const tlbr = `${this.snowflake.tl(
      1
    )}${this.snowflake.cc()}${this.snowflake.br(1)}`;
    const trbl = `${this.snowflake.tr(
      1
    )}${this.snowflake.cc()}${this.snowflake.bl(1)}`;
    return [tlbr, trbl];
  }
}

/**
 * A picture is worth a thousand words:
 *
 * tl3 --- --- tt3 --- --- tr3
 * --- tl2 --- tt2 --- tr2 ---
 * --- --- tl1 tt1 tr1 --- ---
 * ll3 ll2 ll1 cc0 rr1 rr2 rr3
 * --- --- bl1 bb1 br1 --- ---
 * --- bl2 --- bb2 --- br2 ---
 * bl3 --- --- bb3 --- --- br3
 */
export class Snowflake {
  constructor(
    private grid: string[],
    private lineno: number,
    private colno: number
  ) {
    const linelen = grid[0].length;
    for (const line of grid) {
      if (line.length !== linelen) {
        throw new Error(`grid lines must all be of equal length`);
      }
    }
  }

  cc() {
    return this.grid.at(this.lineno)?.at(this.colno);
  }

  tt(f: number) {
    return this.linebounded(this.lineno - f) && this.colbounded(this.colno)
      ? this.grid.at(this.lineno - f)?.at(this.colno)
      : undefined;
  }

  tr(f: number) {
    return this.linebounded(this.lineno - f) && this.colbounded(this.colno + f)
      ? this.grid.at(this.lineno - f)?.at(this.colno + f)
      : undefined;
  }

  rr(f: number) {
    return this.linebounded(this.lineno) && this.colbounded(this.colno + f)
      ? this.grid.at(this.lineno)?.at(this.colno + f)
      : undefined;
  }

  br(f: number) {
    return this.linebounded(this.lineno + f) && this.colbounded(this.colno + f)
      ? this.grid.at(this.lineno + f)?.at(this.colno + f)
      : undefined;
  }

  bb(f: number) {
    return this.linebounded(this.lineno + f) && this.colbounded(this.colno)
      ? this.grid.at(this.lineno + f)?.at(this.colno)
      : undefined;
  }

  bl(f: number) {
    return this.linebounded(this.lineno + f) && this.colbounded(this.colno - f)
      ? this.grid.at(this.lineno + f)?.at(this.colno - f)
      : undefined;
  }

  ll(f: number) {
    return this.linebounded(this.lineno) && this.colbounded(this.colno - f)
      ? this.grid.at(this.lineno)?.at(this.colno - f)
      : undefined;
  }

  tl(f: number) {
    return this.linebounded(this.lineno - f) && this.colbounded(this.colno - f)
      ? this.grid.at(this.lineno - f)?.at(this.colno - f)
      : undefined;
  }

  private colbounded(i: number): boolean {
    return i >= 0 && i < this.grid[0].length;
  }

  private linebounded(i: number): boolean {
    return i >= 0 && i < this.grid.length;
  }
}
