export function day03(data: string) {
  const lines = data.split("\n");
  let sumOnlyMults = 0;
  let sumWithEnabledDisabled = 0;
  let enabled = true;
  for (const line of lines) {
    const regexResult = line.matchAll(
      /(mul\((\d+)\,(\d+)\))|(do\(\))|(don't\(\))/g
    );
    for (const fullMatch of regexResult) {
      const [match, _, n1s, n2s] = fullMatch;
      const n1 = parseInt(n1s, 10);
      const n2 = parseInt(n2s, 10);
      if (!isNaN(n1) && !isNaN(n2)) {
        sumOnlyMults += n1 * n2;
      }
      if (match.startsWith("mul") && enabled) {
        if (!isNaN(n1) && !isNaN(n2)) {
          sumWithEnabledDisabled += n1 * n2;
        }
      } else if (match.startsWith("don't")) {
        enabled = false;
      } else if (match.startsWith("do")) {
        enabled = true;
      }
    }
  }
  return {
    sumOnlyMults,
    sumWithEnabledDisabled,
  };
}
