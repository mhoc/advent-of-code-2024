export function day01(data: string) {
  const locationIds1 = [];
  const locationIds2 = [];
  const locationIds2Freq: Record<number, number> = {};
  for (const line of data.split("\n")) {
    const lineValues = [];
    for (const value of line.split(" ")) {
      if (!value) continue;
      lineValues.push(parseInt(value, 10));
    }
    locationIds1.push(lineValues[0]);
    locationIds2.push(lineValues[1]);
    if (locationIds2Freq[lineValues[1]]) {
      locationIds2Freq[lineValues[1]] = locationIds2Freq[lineValues[1]] + 1;
    } else {
      locationIds2Freq[lineValues[1]] = 1;
    }
  }
  locationIds1.sort((a, b) => a - b);
  locationIds2.sort((a, b) => a - b);

  let totalDistance = 0;
  for (let i = 0; i < locationIds1.length; i++) {
    const v1 = locationIds1[i];
    const v2 = locationIds2[i];
    totalDistance += Math.abs(v1 - v2);
  }

  let similarityScore = 0;
  for (const v1 of locationIds1) {
    if (locationIds2Freq[v1]) {
      similarityScore += v1 * locationIds2Freq[v1];
    }
  }

  return {
    similarityScore,
    totalDistance,
  };
}
