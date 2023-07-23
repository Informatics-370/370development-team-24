import { DatePipe } from "@angular/common";

export class Schedule{

    scheduleId!: number;
    date!: Date;
    start_time!: DatePipe;
    end_time!: DatePipe;
    eventId!: number;
    event_name!: string;
}