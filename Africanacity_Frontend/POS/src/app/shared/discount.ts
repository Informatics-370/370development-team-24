import { DatetimeCustomEvent } from "@ionic/angular";

export interface Discount {
    discountId: number;
    name: string;
    description: string;
    amount: number;
    start_Date: DatetimeCustomEvent;
    end_Date: DatetimeCustomEvent;
}
