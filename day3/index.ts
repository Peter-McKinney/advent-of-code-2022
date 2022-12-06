import * as fs from "fs";

(async () => {
  const rucksackData: string = fs.readFileSync("rucksack-input.txt", "utf8");
  const lines = rucksackData.split("\n");

  const priorityCompartmentSum = getPriorityOfCommonItemByCompartment(lines);

  const priorityElfGroupSum = await getPriorityOfCommonItemByElfGroup(lines);

  console.log(`Priority Sum: ${priorityCompartmentSum}`);
  console.log(`Priority Sum Elf Group: ${priorityElfGroupSum}`);
})();

async function getPriorityOfCommonItemByElfGroup(
  lines: string[]
): Promise<number> {
  let lineNumber = 1;
  let elfGroup: string[] = [];
  let prioritySum = 0;

  for await (let line of lines) {
    elfGroup.push(line);

    if (lineNumber === 3) {
      lineNumber = 0;
      const commonItem = findCommonItemElfGroup(
        elfGroup[0],
        elfGroup[1],
        elfGroup[2]
      );
      elfGroup = [];

      const priority = calculatePriority(commonItem);
      prioritySum += priority;
    }

    lineNumber++;
  }

  return Promise.resolve(prioritySum);
}

function getPriorityOfCommonItemByCompartment(lines: string[]): number {
  let prioritySum = 0;
  for (let line of lines) {
    const rucksackPocketLeft = line.slice(0, line.length / 2);
    const rucksackPocketRight = line.slice(line.length / 2, line.length);

    const commonItem = findCommonItem(rucksackPocketLeft, rucksackPocketRight);

    prioritySum += calculatePriority(commonItem);
  }

  return prioritySum;
}

function calculatePriority(character: string): number {
  if (!character) return 0;
  const code = character.charCodeAt(0);

  if (character === character.toUpperCase()) {
    return code - 38;
  }

  return code - 96;
}

function findCommonItemElfGroup(
  ruckSack1: string,
  ruckSack2: string,
  ruckSack3: string
): string {
  for (let char of ruckSack1) {
    if (ruckSack2.includes(char) && ruckSack3.includes(char)) return char;
  }

  return "";
}

function findCommonItem(
  rucksackCompartmentLeft: string,
  rucksackCompartmentRight: string
): string {
  for (let charLeft of rucksackCompartmentLeft) {
    for (let charRight of rucksackCompartmentRight) {
      if (charLeft === charRight) {
        return charLeft;
      }
    }
  }

  return "";
}
