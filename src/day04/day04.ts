// I went a little crazy on performance optimization on this one, which made it pretty ugly.

export function day04(data: string) {
  const grid = data.split("\n");
  let xmasCount = 0;
  for (let lineno = 0; lineno < grid.length; lineno++) {
    for (let colno = 0; colno < grid[lineno].length; colno++) {
      if (grid[lineno][colno] === "X") {
        if (grid[lineno - 1]?.[colno] === "M") {
          if (grid[lineno - 2]?.[colno] === "A") {
            if (grid[lineno - 3]?.[colno] === "S") {
              xmasCount++;
            }
          }
        }
        if (grid[lineno - 1]?.[colno + 1] === "M") {
          if (grid[lineno - 2]?.[colno + 2] === "A") {
            if (grid[lineno - 3]?.[colno + 3] === "S") {
              xmasCount++;
            }
          }
        }
        if (grid[lineno]?.[colno + 1] === "M") {
          if (grid[lineno]?.[colno + 2] === "A") {
            if (grid[lineno]?.[colno + 3] === "S") {
              xmasCount++;
            }
          }
        }
        if (grid[lineno + 1]?.[colno + 1] === "M") {
          if (grid[lineno + 2]?.[colno + 2] === "A") {
            if (grid[lineno + 3]?.[colno + 3] === "S") {
              xmasCount++;
            }
          }
        }
        if (grid[lineno + 1]?.[colno] === "M") {
          if (grid[lineno + 2]?.[colno] === "A") {
            if (grid[lineno + 3]?.[colno] === "S") {
              xmasCount++;
            }
          }
        }
        if (grid[lineno + 1]?.[colno - 1] === "M") {
          if (grid[lineno + 2]?.[colno - 2] === "A") {
            if (grid[lineno + 3]?.[colno - 3] === "S") {
              xmasCount++;
            }
          }
        }
        if (grid[lineno]?.[colno - 1] === "M") {
          if (grid[lineno]?.[colno - 2] === "A") {
            if (grid[lineno]?.[colno - 3] === "S") {
              xmasCount++;
            }
          }
        }
        if (grid[lineno - 1]?.[colno - 1] === "M") {
          if (grid[lineno - 2]?.[colno - 2] === "A") {
            if (grid[lineno - 3]?.[colno - 3] === "S") {
              xmasCount++;
            }
          }
        }
      }
    }
  }
  let masmasCount = 0;
  for (let lineno = 1; lineno < grid.length - 1; lineno++) {
    for (let colno = 1; colno < grid[lineno].length - 1; colno++) {
      const centerChar = grid[lineno][colno];
      if (centerChar === "A") {
        const tl = grid[lineno - 1]?.[colno - 1];
        const tr = grid[lineno - 1]?.[colno + 1];
        const bl = grid[lineno + 1]?.[colno - 1];
        const br = grid[lineno + 1]?.[colno + 1];
        if (
          (tl === "M" && br === "S" && tr === "M" && bl === "S") ||
          (tl === "M" && br === "S" && tr === "S" && bl === "M") ||
          (tl === "S" && br === "M" && tr === "M" && bl === "S") ||
          (tl === "S" && br === "M" && tr === "S" && bl === "M")
        ) {
          masmasCount++;
        }
      }
    }
  }
  return { masmasCount, xmasCount };
}
