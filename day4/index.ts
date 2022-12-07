import * as fs from "fs";
import { Elf } from "./elf";
import { SectionAssignment } from "./section-assignment";

(async () => {
  const sessionsData: string = fs.readFileSync("session-input.txt", "utf8");
  const lines = sessionsData.split("\n");

  const elves = lines.map((line) => buildElves(line));

  const totalSectionsContained = elves.reduce((accumulator, currentElfPair) => {
    if (currentElfPair.length === 2 && isContained(currentElfPair)) {
      accumulator++;
    }
    return accumulator;
  }, 0);
})();

function buildElves(line: string): Elf[] {
  let elves: Elf[] = [];
  let rawElves = line.split(",");

  if (rawElves.length === 2) {
    for (let range of rawElves) {
      elves.push(buildElf(range));
    }
  }

  return elves;
}

function buildElf(range: string): Elf {
  if (range) {
    let lower = +range.split("-")[0];
    let upper = +range.split("-")[1];

    let sectionAssignment = new SectionAssignment(lower, upper);
    let elf = new Elf(sectionAssignment);
    return elf;
  }

  //default elf
  return new Elf(new SectionAssignment(0, 0));
}

function isContained(elves: Elf[]): boolean {
  let containsSection = elves[0].containsElf(elves[1]);

  if (!containsSection) {
    containsSection = elves[1].containsElf(elves[0]);
  }

  return containsSection;
}
