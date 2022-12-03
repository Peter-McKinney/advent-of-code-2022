import * as fs from "fs";
import { Elf } from "./classes/elf";

(() => {
  const data: string = fs.readFileSync("elf-calorie-input.txt", "utf8");

  const dataArray: string[] = data.split("\n");

  const elves = createElves(dataArray);

  const top3Elves = findTopNElvesByCalories(elves, 3);
  const calorieSum = top3Elves.reduce((acc, current) => {
    return acc + current.totalCalories;
  }, 0);

  console.log(`Top Elf Calories: ${findTopCalorieElf(elves).totalCalories}`);
  console.log(`Top calorie sum: ${calorieSum}`);
})();

function createElves(dataArray: string[]): Elf[] {
  let tempElf: string[] = [];

  let elfArray: Elf[] = [];

  dataArray.forEach((value, index) => {
    if (value != "") {
      tempElf.push(value);
    } else {
      elfArray.push(new Elf(tempElf, elfArray.length + 1));
      tempElf = [];
    }
  });

  return elfArray;
}

function findTopCalorieElf(elves: Elf[]): Elf {
  let currentTopElf = new Elf([], 0);

  for (let elf of elves) {
    if (!currentTopElf || elf.totalCalories > currentTopElf?.totalCalories) {
      currentTopElf = elf;
    }
  }

  return currentTopElf;
}

function findTopNElvesByCalories(elves: Elf[], N: number): Elf[] {
  return elves
    .sort((a, b) => {
      if (a.totalCalories < b.totalCalories) return 1;

      if (a.totalCalories > b.totalCalories) return -1;

      return 0;
    })
    .slice(0, N);
}
