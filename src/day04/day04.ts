// This code has been performance optimized to insanity.

// We work with a Uint8Array rather than a string as a pretty significant performance optimization; switching it over
// cut the average execution time by ~20%.
export function day04(data: Uint8Array) {
  // This block of code splits the incoming Uint8Array into lines by splitting on newlines.
  // `10` is a ascii newline (\n) and `13` is carriage return.
  // Breaking these int constants out into named variables is slow (ok not that slow, but we're being insane here).
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

  // The two results are returned from this function in a pre-allocated array, which is i think the fastest way to get
  // two numeric values out of a function in javascript? Faster than allocating an object.
  const result = new Array(2);
  result[0] = 0;
  result[1] = 0;

  // ====== PART 1 ======
  // The overall algorithm we've implemented here involves traveling to every character in the grid, then "radiating"
  // out from that in all eight directions to see if that direction matches the string we're searching for.
  //
  // It starts with a last-mile performance optimization: Imagine we're searching for the string 'GK' in a grid like:
  //
  //    A B C D
  //    E F G H
  //    I J K L
  //    M N O P
  //
  // We travel to 'A'; we should search the directions of 'AE', 'AF', and 'AB'; but we don't need to search left or up,
  // because we're on the perimeter of the grid. So; we don't.
  //
  // In the real grid, this actually saves a good number of unnecessary operations because the search string is four
  // characters, and the grid is over a hundred characters large; we only do a full 8-direction radiation once we're
  // in the core.
  //
  // But... we can't accept the cost of an additional comparison conditional within the core loop. So, we have to
  // manually unroll the perimieter checks. This all looks insane... but I've A/B benchmarked a ton of stuff and this
  // insanity is actually measurably faster, and almost every attempt at improving readability hurts performance.

  // Line 0
  for (let colno = 0; colno < grid[0].length; colno++) {
    if (grid[0][colno] === 88) {
      // Right
      if (grid[0]?.[colno + 1] === 77) {
        if (grid[0]?.[colno + 2] === 65) {
          if (grid[0]?.[colno + 3] === 83) {
            result[0]++;
          }
        }
      }
      // Bottom-Right
      if (grid[1]?.[colno + 1] === 77) {
        if (grid[2]?.[colno + 2] === 65) {
          if (grid[3]?.[colno + 3] === 83) {
            result[0]++;
          }
        }
      }
      // Bottom
      if (grid[1]?.[colno] === 77) {
        if (grid[2]?.[colno] === 65) {
          if (grid[3]?.[colno] === 83) {
            result[0]++;
          }
        }
      }
      // Bottom-Left
      if (grid[1]?.[colno - 1] === 77) {
        if (grid[2]?.[colno - 2] === 65) {
          if (grid[3]?.[colno - 3] === 83) {
            result[0]++;
          }
        }
      }
      // Left
      if (grid[0]?.[colno - 1] === 77) {
        if (grid[0]?.[colno - 2] === 65) {
          if (grid[0]?.[colno - 3] === 83) {
            result[0]++;
          }
        }
      }
    }
  }

  // Column 0
  // Another minor performance optimization here: we can start at line 3 and end 3 lines from the end because we'll
  // those numbers when we do the perimeter rows.
  for (let lineno = 3; lineno < grid.length - 3; lineno++) {
    if (grid[lineno][0] === 88) {
      if (grid[lineno - 1]?.[0] === 77) {
        if (grid[lineno - 2]?.[0] === 65) {
          if (grid[lineno - 3]?.[0] === 83) {
            result[0]++;
          }
        }
      }
      // Top-Right
      if (grid[lineno - 1]?.[1] === 77) {
        if (grid[lineno - 2]?.[2] === 65) {
          if (grid[lineno - 3]?.[3] === 83) {
            result[0]++;
          }
        }
      }
      // Right
      if (grid[lineno]?.[1] === 77) {
        if (grid[lineno]?.[2] === 65) {
          if (grid[lineno]?.[3] === 83) {
            result[0]++;
          }
        }
      }
      // Bottom-Right
      if (grid[lineno + 1]?.[1] === 77) {
        if (grid[lineno + 2]?.[2] === 65) {
          if (grid[lineno + 3]?.[3] === 83) {
            result[0]++;
          }
        }
      }
      // Bottom
      if (grid[lineno + 1]?.[0] === 77) {
        if (grid[lineno + 2]?.[0] === 65) {
          if (grid[lineno + 3]?.[0] === 83) {
            result[0]++;
          }
        }
      }
    }
  }

  // Line Last
  for (let colno = 0; colno < grid[grid.length - 1].length; colno++) {
    if (grid[grid.length - 1][colno] === 88) {
      // Top
      if (grid[grid.length - 2]?.[colno] === 77) {
        if (grid[grid.length - 3]?.[colno] === 65) {
          if (grid[grid.length - 4]?.[colno] === 83) {
            result[0]++;
          }
        }
      }
      // Top-Right
      if (grid[grid.length - 2]?.[colno + 1] === 77) {
        if (grid[grid.length - 3]?.[colno + 2] === 65) {
          if (grid[grid.length - 4]?.[colno + 3] === 83) {
            result[0]++;
          }
        }
      }
      // Right
      if (grid[grid.length - 1]?.[colno + 1] === 77) {
        if (grid[grid.length - 1]?.[colno + 2] === 65) {
          if (grid[grid.length - 1]?.[colno + 3] === 83) {
            result[0]++;
          }
        }
      }
      // Left
      if (grid[grid.length - 1]?.[colno - 1] === 77) {
        if (grid[grid.length - 1]?.[colno - 2] === 65) {
          if (grid[grid.length - 1]?.[colno - 3] === 83) {
            result[0]++;
          }
        }
      }
      // Top-Left
      if (grid[grid.length - 2]?.[colno - 1] === 77) {
        if (grid[grid.length - 3]?.[colno - 2] === 65) {
          if (grid[grid.length - 4]?.[colno - 3] === 83) {
            result[0]++;
          }
        }
      }
    }
  }

  // Column Last
  // Another minor performance optimization here: we can start at line 3 and end 3 lines from the end because we'll
  // those numbers when we do the perimeter rows.
  for (let lineno = 3; lineno < grid.length - 3; lineno++) {
    const colno = grid[lineno].length - 1;
    if (grid[lineno][colno] === 88) {
      // Top
      if (grid[lineno - 1]?.[colno] === 77) {
        if (grid[lineno - 2]?.[colno] === 65) {
          if (grid[lineno - 3]?.[colno] === 83) {
            result[0]++;
          }
        }
      }
      // Bottom
      if (grid[lineno + 1]?.[colno] === 77) {
        if (grid[lineno + 2]?.[colno] === 65) {
          if (grid[lineno + 3]?.[colno] === 83) {
            result[0]++;
          }
        }
      }
      // Bottom-Left
      if (grid[lineno + 1]?.[colno - 1] === 77) {
        if (grid[lineno + 2]?.[colno - 2] === 65) {
          if (grid[lineno + 3]?.[colno - 3] === 83) {
            result[0]++;
          }
        }
      }
      // Left
      if (grid[lineno]?.[colno - 1] === 77) {
        if (grid[lineno]?.[colno - 2] === 65) {
          if (grid[lineno]?.[colno - 3] === 83) {
            result[0]++;
          }
        }
      }
      // Top-Left
      if (grid[lineno - 1]?.[colno - 1] === 77) {
        if (grid[lineno - 2]?.[colno - 2] === 65) {
          if (grid[lineno - 3]?.[colno - 3] === 83) {
            result[0]++;
          }
        }
      }
    }
  }

  // Line 1
  for (let colno = 0; colno < grid[1].length; colno++) {
    if (grid[1][colno] === 88) {
      // Right
      if (grid[1]?.[colno + 1] === 77) {
        if (grid[1]?.[colno + 2] === 65) {
          if (grid[1]?.[colno + 3] === 83) {
            result[0]++;
          }
        }
      }
      // Bottom-Right
      if (grid[2]?.[colno + 1] === 77) {
        if (grid[3]?.[colno + 2] === 65) {
          if (grid[4]?.[colno + 3] === 83) {
            result[0]++;
          }
        }
      }
      // Bottom
      if (grid[2]?.[colno] === 77) {
        if (grid[3]?.[colno] === 65) {
          if (grid[4]?.[colno] === 83) {
            result[0]++;
          }
        }
      }
      // Bottom-Left
      if (grid[2]?.[colno - 1] === 77) {
        if (grid[3]?.[colno - 2] === 65) {
          if (grid[4]?.[colno - 3] === 83) {
            result[0]++;
          }
        }
      }
      // Left
      if (grid[1]?.[colno - 1] === 77) {
        if (grid[1]?.[colno - 2] === 65) {
          if (grid[1]?.[colno - 3] === 83) {
            result[0]++;
          }
        }
      }
    }
  }

  // Column 1
  // Another minor performance optimization here: we can start at line 3 and end 3 lines from the end because we'll
  // those numbers when we do the perimeter rows.
  for (let lineno = 3; lineno < grid.length - 3; lineno++) {
    if (grid[lineno][1] === 88) {
      if (grid[lineno - 1]?.[1] === 77) {
        if (grid[lineno - 2]?.[1] === 65) {
          if (grid[lineno - 3]?.[1] === 83) {
            result[0]++;
          }
        }
      }
      // Top-Right
      if (grid[lineno - 1]?.[2] === 77) {
        if (grid[lineno - 2]?.[3] === 65) {
          if (grid[lineno - 3]?.[4] === 83) {
            result[0]++;
          }
        }
      }
      // Right
      if (grid[lineno]?.[2] === 77) {
        if (grid[lineno]?.[3] === 65) {
          if (grid[lineno]?.[4] === 83) {
            result[0]++;
          }
        }
      }
      // Bottom-Right
      if (grid[lineno + 1]?.[2] === 77) {
        if (grid[lineno + 2]?.[3] === 65) {
          if (grid[lineno + 3]?.[4] === 83) {
            result[0]++;
          }
        }
      }
      // Bottom
      if (grid[lineno + 1]?.[1] === 77) {
        if (grid[lineno + 2]?.[1] === 65) {
          if (grid[lineno + 3]?.[1] === 83) {
            result[0]++;
          }
        }
      }
    }
  }

  // Line Last-1
  for (let colno = 0; colno < grid[grid.length - 2].length; colno++) {
    if (grid[grid.length - 2][colno] === 88) {
      // Top
      if (grid[grid.length - 3]?.[colno] === 77) {
        if (grid[grid.length - 4]?.[colno] === 65) {
          if (grid[grid.length - 5]?.[colno] === 83) {
            result[0]++;
          }
        }
      }
      // Top-Right
      if (grid[grid.length - 3]?.[colno + 1] === 77) {
        if (grid[grid.length - 4]?.[colno + 2] === 65) {
          if (grid[grid.length - 5]?.[colno + 3] === 83) {
            result[0]++;
          }
        }
      }
      // Right
      if (grid[grid.length - 2]?.[colno + 1] === 77) {
        if (grid[grid.length - 2]?.[colno + 2] === 65) {
          if (grid[grid.length - 2]?.[colno + 3] === 83) {
            result[0]++;
          }
        }
      }
      // Left
      if (grid[grid.length - 2]?.[colno - 1] === 77) {
        if (grid[grid.length - 2]?.[colno - 2] === 65) {
          if (grid[grid.length - 2]?.[colno - 3] === 83) {
            result[0]++;
          }
        }
      }
      // Top-Left
      if (grid[grid.length - 3]?.[colno - 1] === 77) {
        if (grid[grid.length - 4]?.[colno - 2] === 65) {
          if (grid[grid.length - 5]?.[colno - 3] === 83) {
            result[0]++;
          }
        }
      }
    }
  }

  // Column Last-1
  // Another minor performance optimization here: we can start at line 3 and end 3 lines from the end because we'll
  // those numbers when we do the perimeter rows.
  for (let lineno = 3; lineno < grid.length - 3; lineno++) {
    const colno = grid[lineno].length - 2;
    if (grid[lineno][colno] === 88) {
      // Top
      if (grid[lineno - 1]?.[colno] === 77) {
        if (grid[lineno - 2]?.[colno] === 65) {
          if (grid[lineno - 3]?.[colno] === 83) {
            result[0]++;
          }
        }
      }
      // Bottom
      if (grid[lineno + 1]?.[colno] === 77) {
        if (grid[lineno + 2]?.[colno] === 65) {
          if (grid[lineno + 3]?.[colno] === 83) {
            result[0]++;
          }
        }
      }
      // Bottom-Left
      if (grid[lineno + 1]?.[colno - 1] === 77) {
        if (grid[lineno + 2]?.[colno - 2] === 65) {
          if (grid[lineno + 3]?.[colno - 3] === 83) {
            result[0]++;
          }
        }
      }
      // Left
      if (grid[lineno]?.[colno - 1] === 77) {
        if (grid[lineno]?.[colno - 2] === 65) {
          if (grid[lineno]?.[colno - 3] === 83) {
            result[0]++;
          }
        }
      }
      // Top-Left
      if (grid[lineno - 1]?.[colno - 1] === 77) {
        if (grid[lineno - 2]?.[colno - 2] === 65) {
          if (grid[lineno - 3]?.[colno - 3] === 83) {
            result[0]++;
          }
        }
      }
    }
  }

  // Line 2
  for (let colno = 0; colno < grid[2].length; colno++) {
    if (grid[2][colno] === 88) {
      // Right
      if (grid[2]?.[colno + 1] === 77) {
        if (grid[2]?.[colno + 2] === 65) {
          if (grid[2]?.[colno + 3] === 83) {
            result[0]++;
          }
        }
      }
      // Bottom-Right
      if (grid[3]?.[colno + 1] === 77) {
        if (grid[4]?.[colno + 2] === 65) {
          if (grid[5]?.[colno + 3] === 83) {
            result[0]++;
          }
        }
      }
      // Bottom
      if (grid[3]?.[colno] === 77) {
        if (grid[4]?.[colno] === 65) {
          if (grid[5]?.[colno] === 83) {
            result[0]++;
          }
        }
      }
      // Bottom-Left
      if (grid[3]?.[colno - 1] === 77) {
        if (grid[4]?.[colno - 2] === 65) {
          if (grid[5]?.[colno - 3] === 83) {
            result[0]++;
          }
        }
      }
      // Left
      if (grid[2]?.[colno - 1] === 77) {
        if (grid[2]?.[colno - 2] === 65) {
          if (grid[2]?.[colno - 3] === 83) {
            result[0]++;
          }
        }
      }
    }
  }

  // Column 2
  // Another minor performance optimization here: we can start at line 3 and end 3 lines from the end because we'll
  // those numbers when we do the perimeter rows.
  for (let lineno = 3; lineno < grid.length - 3; lineno++) {
    if (grid[lineno][2] === 88) {
      if (grid[lineno - 1]?.[2] === 77) {
        if (grid[lineno - 2]?.[2] === 65) {
          if (grid[lineno - 3]?.[2] === 83) {
            result[0]++;
          }
        }
      }
      // Top-Right
      if (grid[lineno - 1]?.[3] === 77) {
        if (grid[lineno - 2]?.[4] === 65) {
          if (grid[lineno - 3]?.[5] === 83) {
            result[0]++;
          }
        }
      }
      // Right
      if (grid[lineno]?.[3] === 77) {
        if (grid[lineno]?.[4] === 65) {
          if (grid[lineno]?.[5] === 83) {
            result[0]++;
          }
        }
      }
      // Bottom-Right
      if (grid[lineno + 1]?.[3] === 77) {
        if (grid[lineno + 2]?.[4] === 65) {
          if (grid[lineno + 3]?.[5] === 83) {
            result[0]++;
          }
        }
      }
      // Bottom
      if (grid[lineno + 1]?.[2] === 77) {
        if (grid[lineno + 2]?.[2] === 65) {
          if (grid[lineno + 3]?.[2] === 83) {
            result[0]++;
          }
        }
      }
    }
  }

  // Line Last-2
  for (let colno = 0; colno < grid[grid.length - 3].length; colno++) {
    if (grid[grid.length - 3][colno] === 88) {
      // Top
      if (grid[grid.length - 4]?.[colno] === 77) {
        if (grid[grid.length - 5]?.[colno] === 65) {
          if (grid[grid.length - 6]?.[colno] === 83) {
            result[0]++;
          }
        }
      }
      // Top-Right
      if (grid[grid.length - 4]?.[colno + 1] === 77) {
        if (grid[grid.length - 5]?.[colno + 2] === 65) {
          if (grid[grid.length - 6]?.[colno + 3] === 83) {
            result[0]++;
          }
        }
      }
      // Right
      if (grid[grid.length - 3]?.[colno + 1] === 77) {
        if (grid[grid.length - 3]?.[colno + 2] === 65) {
          if (grid[grid.length - 3]?.[colno + 3] === 83) {
            result[0]++;
          }
        }
      }
      // Left
      if (grid[grid.length - 3]?.[colno - 1] === 77) {
        if (grid[grid.length - 3]?.[colno - 2] === 65) {
          if (grid[grid.length - 3]?.[colno - 3] === 83) {
            result[0]++;
          }
        }
      }
      // Top-Left
      if (grid[grid.length - 4]?.[colno - 1] === 77) {
        if (grid[grid.length - 5]?.[colno - 2] === 65) {
          if (grid[grid.length - 6]?.[colno - 3] === 83) {
            result[0]++;
          }
        }
      }
    }
  }

  // Column Last-2
  // Another minor performance optimization here: we can start at line 3 and end 3 lines from the end because we'll
  // those numbers when we do the perimeter rows.
  for (let lineno = 3; lineno < grid.length - 3; lineno++) {
    const colno = grid[lineno].length - 3;
    if (grid[lineno][colno] === 88) {
      // Top
      if (grid[lineno - 1]?.[colno] === 77) {
        if (grid[lineno - 2]?.[colno] === 65) {
          if (grid[lineno - 3]?.[colno] === 83) {
            result[0]++;
          }
        }
      }
      // Bottom
      if (grid[lineno + 1]?.[colno] === 77) {
        if (grid[lineno + 2]?.[colno] === 65) {
          if (grid[lineno + 3]?.[colno] === 83) {
            result[0]++;
          }
        }
      }
      // Bottom-Left
      if (grid[lineno + 1]?.[colno - 1] === 77) {
        if (grid[lineno + 2]?.[colno - 2] === 65) {
          if (grid[lineno + 3]?.[colno - 3] === 83) {
            result[0]++;
          }
        }
      }
      // Left
      if (grid[lineno]?.[colno - 1] === 77) {
        if (grid[lineno]?.[colno - 2] === 65) {
          if (grid[lineno]?.[colno - 3] === 83) {
            result[0]++;
          }
        }
      }
      // Top-Left
      if (grid[lineno - 1]?.[colno - 1] === 77) {
        if (grid[lineno - 2]?.[colno - 2] === 65) {
          if (grid[lineno - 3]?.[colno - 3] === 83) {
            result[0]++;
          }
        }
      }
    }
  }

  // Now that the three perimeter lines & columns have been checked, we enter the core of the grid.
  for (let lineno = 3; lineno < grid.length - 3; lineno++) {
    for (let colno = 3; colno < grid[lineno].length - 3; colno++) {
      // This is the character we're currently radiating out from. We check if its an 'X' (unicode 88). If it isn't,
      // no direction could possibly contain an 'XMAS', so we can skip this. Doing this as an inclusive conditional
      // rather than an exclusive `!== 88) continue;` appears to be slightly faster.
      if (grid[lineno][colno] === 88) {
        // Top
        //
        // All of these checks are inlined, because that appears to be faster than breaking them into functions.
        // Naturally, the integers are unicode codepoints for the three characters we're looking for (as we've already
        // checked for 'X'): 77=M 65=A 83=S.
        //
        // Naturally, a statement like `grid[lineno-1][colno] could evaluate to undefined if we were on the perimeter
        // and went out-of-bounds of the array. But, because we've already carefully checked the perimeter above, that
        // can never happen in this loop; so we don't have to worry about that.
        if (grid[lineno - 1]?.[colno] === 77) {
          if (grid[lineno - 2]?.[colno] === 65) {
            if (grid[lineno - 3]?.[colno] === 83) {
              result[0]++;
            }
          }
        }
        // Top-Right
        if (grid[lineno - 1]?.[colno + 1] === 77) {
          if (grid[lineno - 2]?.[colno + 2] === 65) {
            if (grid[lineno - 3]?.[colno + 3] === 83) {
              result[0]++;
            }
          }
        }
        // Right
        if (grid[lineno]?.[colno + 1] === 77) {
          if (grid[lineno]?.[colno + 2] === 65) {
            if (grid[lineno]?.[colno + 3] === 83) {
              result[0]++;
            }
          }
        }
        // Bottom-Right
        if (grid[lineno + 1]?.[colno + 1] === 77) {
          if (grid[lineno + 2]?.[colno + 2] === 65) {
            if (grid[lineno + 3]?.[colno + 3] === 83) {
              result[0]++;
            }
          }
        }
        // Bottom
        if (grid[lineno + 1]?.[colno] === 77) {
          if (grid[lineno + 2]?.[colno] === 65) {
            if (grid[lineno + 3]?.[colno] === 83) {
              result[0]++;
            }
          }
        }
        // Bottom-Left
        if (grid[lineno + 1]?.[colno - 1] === 77) {
          if (grid[lineno + 2]?.[colno - 2] === 65) {
            if (grid[lineno + 3]?.[colno - 3] === 83) {
              result[0]++;
            }
          }
        }
        // Left
        if (grid[lineno]?.[colno - 1] === 77) {
          if (grid[lineno]?.[colno - 2] === 65) {
            if (grid[lineno]?.[colno - 3] === 83) {
              result[0]++;
            }
          }
        }
        // Top-Left
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

  // ====== Part 2 ======
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
