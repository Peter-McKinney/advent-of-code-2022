import { Food } from "./food";

export class Elf {
    food: Food[] = [];
    id: number = 0;

    constructor(foodInput: string[], index: number) {
        this.food = foodInput?.map(m => new Food(+m));
        this.id = index;
    }

    get totalCalories(): number {
        const total = this.food.reduce((accumulator, current) => {
            return accumulator + current.calories;
        }, 0);

        return total;
    }
}
