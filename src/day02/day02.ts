export function day02(data: string) {
  const lines = data.split("\n");

  let safeWithoutDampener = 0;
  let safeWithDampener = 0;
  for (const line of lines) {
    const levels = line.split(" ").map((v) => parseInt(v));
    if (isSafe(levels)) {
      safeWithoutDampener++;
    }
    for (let i = 0; i < levels.length; i++) {
      if (isSafe(levels, i)) {
        safeWithDampener++;
        break;
      }
    }
  }

  return {
    safeWithoutDampener,
    safeWithDampener,
  };
}

function isSafe(levels: number[], ignoring?: number): boolean {
  if (levels.length === 0 || levels.length === 1) {
    return true;
  }
  let direction = "";
  for (let i = 1; i < levels.length; i++) {
    if (i === ignoring || (i === 1 && ignoring === 0)) {
      continue;
    }
    const current = levels[i];
    const prev = ignoring === i - 1 ? levels[i - 2] : levels[i - 1];
    if (current === prev) {
      return false;
    }
    if (direction === "" && current > prev) {
      direction = "a";
    } else if (direction === "" && current < prev) {
      direction = "d";
    }
    if (direction === "a" && current < prev) {
      return false;
    } else if (direction === "d" && current > prev) {
      return false;
    }
    const diff = Math.abs(current - prev);
    if (diff < 1 || diff > 3) {
      return false;
    }
  }
  return true;
}
