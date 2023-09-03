export class OtherDrink {
    otherDrinkId!: number;
    name!: string;
    description!: string;
    drinkTypeName!: string;
    drinkPrices: {[otherDrinkId: number]: number} = {};
    amount!: number;
}
