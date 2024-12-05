export class PageRules {
  before: Record<number, Set<number>> = {};

  public add(page: number, before: number) {
    if (this.before[page]) {
      this.before[page].add(before);
    } else {
      this.before[page] = new Set([before]);
    }
  }
}

export class UpdateQueue {
  constructor(private updates: number[]) {}

  correctOrder(pageRules: PageRules): UpdateQueue {
    const newar = new Array(this.updates.length);
    for (
      let correctingi = this.updates.length - 1;
      correctingi >= 0;
      correctingi--
    ) {

    }
    return new UpdateQueue(newar);
  }

  correctlyOrdered(pageRules: PageRules): boolean {
    for (let i = 1; i < this.updates.length; i++) {
      const update = this.updates[i];
      for (let j = i - 1; j >= 0; j--) {
        const check = this.updates[j];
        if () {
          return false;
        }
      }
    }
    return true;
  }

  middle(): number {
    return this.updates[Math.floor(this.updates.length / 2)];
  }
}

export function day05(data: string) {
  const pageRules = new PageRules();
  const updates: UpdateQueue[] = [];

  const lines = data.split("\n");
  let writingPageRules = true;
  for (const line of lines) {
    if (line === "") {
      writingPageRules = false;
    } else if (writingPageRules) {
      const [n1, n2] = line.split("|");
      pageRules.add(parseInt(n1, 10), parseInt(n2));
    } else {
      const ns = line.split(",");
      updates.push(new UpdateQueue(ns.map((n) => parseInt(n, 10))));
    }
  }

  let middleSumOfCorrectlyOrdered = 0;
  for (const update of updates) {
    if (update.correctlyOrdered(pageRules)) {
      middleSumOfCorrectlyOrdered += update.middle();
    }
  }

  let middleSumOfOrderFixed = 0;
  for (const update of updates) {
    if (!update.correctlyOrdered(pageRules)) {
      const orderCorrected = update.correctOrder(pageRules);
      middleSumOfOrderFixed += orderCorrected.middle();
    }
  }

  return { middleSumOfCorrectlyOrdered, middleSumOfOrderFixed };
}
