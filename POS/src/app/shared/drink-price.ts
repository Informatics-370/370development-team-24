import { DecimalPipe } from "@angular/common";

export interface DrinkPrice {
    drink_PriceId: number;
    amount: DecimalPipe;
    drinkId: number;

}
