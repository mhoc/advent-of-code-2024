// This code has been performance optimized to insanity.

export function day04(data: Uint8Array) {
  const grid = [];
  let lastIndex = 0;
  for (let i = 0; i < data.length; i++) {
    if (data[i] === 10) {
      const end = i > 0 && data[i - 1] === 13 ? i - 1 : i;
      grid.push(
        new Uint8Array(
          data.buffer,
          data.byteOffset + lastIndex,
          end - lastIndex
        )
      );
      lastIndex = i + 1;
    }
  }
  if (lastIndex < data.length) {
    grid.push(
      new Uint8Array(
        data.buffer,
        data.byteOffset + lastIndex,
        data.length - lastIndex
      )
    );
  }
  const result = new Array(2);
  result[0] = 0;
  for (let lineno = 0; lineno < grid.length; lineno++) {
    for (let colno = 0; colno < grid[lineno].length; colno++) {
      if (grid[lineno][colno] === 88) {
        if (grid[lineno - 1]?.[colno] === 77) {
          if (grid[lineno - 2]?.[colno] === 65) {
            if (grid[lineno - 3]?.[colno] === 83) {
              result[0]++;
            }
          }
        }
        if (grid[lineno - 1]?.[colno + 1] === 77) {
          if (grid[lineno - 2]?.[colno + 2] === 65) {
            if (grid[lineno - 3]?.[colno + 3] === 83) {
              result[0]++;
            }
          }
        }
        if (grid[lineno]?.[colno + 1] === 77) {
          if (grid[lineno]?.[colno + 2] === 65) {
            if (grid[lineno]?.[colno + 3] === 83) {
              result[0]++;
            }
          }
        }
        if (grid[lineno + 1]?.[colno + 1] === 77) {
          if (grid[lineno + 2]?.[colno + 2] === 65) {
            if (grid[lineno + 3]?.[colno + 3] === 83) {
              result[0]++;
            }
          }
        }
        if (grid[lineno + 1]?.[colno] === 77) {
          if (grid[lineno + 2]?.[colno] === 65) {
            if (grid[lineno + 3]?.[colno] === 83) {
              result[0]++;
            }
          }
        }
        if (grid[lineno + 1]?.[colno - 1] === 77) {
          if (grid[lineno + 2]?.[colno - 2] === 65) {
            if (grid[lineno + 3]?.[colno - 3] === 83) {
              result[0]++;
            }
          }
        }
        if (grid[lineno]?.[colno - 1] === 77) {
          if (grid[lineno]?.[colno - 2] === 65) {
            if (grid[lineno]?.[colno - 3] === 83) {
              result[0]++;
            }
          }
        }
        if (grid[lineno - 1]?.[colno - 1] === 77) {
          if (grid[lineno - 2]?.[colno - 2] === 65) {
            if (grid[lineno - 3]?.[colno - 3] === 83) {
              result[0]++;
            }
          }
        }
      }
    }
  }
  result[1] = 0;
  for (let lineno = 1; lineno < grid.length - 1; lineno++) {
    for (let colno = 1; colno < grid[lineno].length - 1; colno++) {
      if (grid[lineno][colno] === 65) {
        const tl = grid[lineno - 1]?.[colno - 1];
        const tr = grid[lineno - 1]?.[colno + 1];
        const bl = grid[lineno + 1]?.[colno - 1];
        const br = grid[lineno + 1]?.[colno + 1];
        if (
          (tl === 77 && br === 83 && tr === 77 && bl === 83) ||
          (tl === 77 && br === 83 && tr === 83 && bl === 77) ||
          (tl === 83 && br === 77 && tr === 77 && bl === 83) ||
          (tl === 83 && br === 77 && tr === 83 && bl === 77)
        ) {
          result[1]++;
        }
      }
    }
  }
  return result;
}
