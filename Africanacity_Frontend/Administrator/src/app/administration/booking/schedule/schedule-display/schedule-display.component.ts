 import { Component, OnInit } from '@angular/core';
 import { DataService } from 'src/app/service/data.Service';
 import { Schedule } from 'src/app/shared/schedule';
 import { MatDialog } from '@angular/material/dialog';
 import { BookingEvent } from 'src/app/shared/bookingevent';
 import { MatSnackBar } from '@angular/material/snack-bar';
 import { AddScheduleComponent } from '../add-schedule/add-schedule.component';


 @Component({
   selector: 'app-schedule-display',
   templateUrl: './schedule-display.component.html',
   styleUrls: ['./schedule-display.component.css']
 })
 
 export class ScheduleDisplayComponent implements OnInit {
   schedules: Schedule[] = []; // Array to store events retrieved from the backend
   bookingevents : BookingEvent[] = []
   viewDate: Date = new Date();
   formData = new FormData();

    // Define the weekDays and timeSlots arrays according to your requirements
    //weekDays: string[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday','Sunday'];
    weekDates: Date[]=[];
    timeSlots: string[] = ['8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', 
       '1:00 PM', '2:00 PM', '3:00 PM','4:00 PM','5:00 PM', '6:00 PM', '7:00 PM','8:00 PM','9:00 PM','10:00 PM', '11:00 PM'];
   timesheet: any;
    //two date variables to track the start and end dates of the current week
    currentWeekStartDate: Date = new Date();
    currentWeekEndDate: Date = new Date();

   constructor(private dataService: DataService,
     public dialog: MatDialog,
     private snackBar: MatSnackBar,
     
     ) { }


  ngOnInit(): void {
    this.currentWeekStartDate = this.getStartOfWeek(this.viewDate);
    this.currentWeekEndDate = this.getEndOfWeek(this.viewDate);
    this.populateWeekDates();
    this.GetAllSchedules();
   }

   populateWeekDates() {
    const currentDate = new Date(this.currentWeekStartDate);
    this.weekDates = [];
  
    while (currentDate <= this.currentWeekEndDate) {
      this.weekDates.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }
  }

   //Method to retrieve all schedule slots from the backend through the dataService
 GetAllSchedules(){
  this.dataService.ScheduleDisplay().subscribe(result => {
    let scheduleList:any[] = result
    scheduleList.forEach((element) => {
      this.schedules.push(element) //push the schedule object to the array 
    });
  })
 }

 //Method to retrieve the events from the backend that will be used for the event dropdown
 GetEvents(){
  this.dataService.GetAllEvents().subscribe(result => {
    let eventsList: any[] = result
    eventsList.forEach((element) => {
      this.bookingevents.push(element)
    });
  })
 }
  
//Delete item method 
 deleteItem(): void {
  const confirmationSnackBar = this.snackBar.open('Are you sure you want to delete this schedule slot?', 'Delete, Cancel',{
    duration: 5000, // Display duration in milliseconds

  });
 }

 //Method to delete the selected schedule from the backend
 DeleteSchedule(scheduleId : Number){
  this.dataService.RemoveSchedule(scheduleId).subscribe(result => {
  this.deleteItem();
  });
 }
 
  // Create a property to store the dragged event
  draggedEvent: Schedule | null = null;

   // Method to handle drag start to transfer data
   onDragStart(event: DragEvent, schedule: Schedule) {
    event.dataTransfer?.setData('text/plain', JSON.stringify(schedule));
    this.draggedEvent = schedule;
  }
  

    // Method to handle drag over
    onDragOver(event: DragEvent) {
      event.preventDefault();
    }

   // Method to handle drop
   onDrop(event: DragEvent, date: Date, timeSlot: string) {
    event.preventDefault();
    if (this.draggedEvent) {
      // New object to represent the event on the timesheet
      const eventOnTimesheet: Schedule = {
        title: this.draggedEvent.title,
        eventName: this.draggedEvent.eventName,
        scheduleStatus: this.draggedEvent.scheduleStatus,
      };
  
      // Update data structure to store the event on the timesheet based on day and timeSlot
      // Have an array or map to store events for each day and timeSlot.
      const dayIndex = this.weekDates.indexOf(date);
      const timeSlotIndex = this.timeSlots.indexOf(timeSlot);
  
      // Ensure that the dayIndex and timeSlotIndex are valid
      if (dayIndex >= 0 && timeSlotIndex >= 0) {
        // Initialize the timesheet if it's not already
        if (!this.timesheet) {
          this.timesheet = [];
        }
  
        if (!this.timesheet[dayIndex]) {
          this.timesheet[dayIndex] = [];
        }
  
        // Add the event to the timesheet
        this.timesheet[dayIndex][timeSlotIndex] = eventOnTimesheet;
      }
    }
  
    // Clear the dragged event
    this.draggedEvent = null;
  }
  


  // Method to get the title of the event on a specific day and timeSlot
  getEventTitle(date: Date, timeSlot: string): string {
    // Implement logic to retrieve the event title for the specified day and timeSlot
    // based on your data structure.
    return ''; // Return the event title here
  }

    // Method to handle drag enter
    onDragEnter(event: DragEvent) {
      event.preventDefault();
      event.stopPropagation();
  
      if (this.draggedEvent) {
        const targetCell = event.target as HTMLElement;
  
        // Check if the event is entering a valid drop target (timesheet cell)
        if (targetCell.classList.contains('timesheet-cell')) {
          targetCell.classList.add('drag-over'); // Add a visual indication of the drag-over state
        }
      }
    }

    
  // Method to handle drag leave
  onDragLeave(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();

    if (this.draggedEvent) {
      const targetCell = event.target as HTMLElement;

      // Remove the visual indication of the drag-over state
      if (targetCell.classList.contains('timesheet-cell')) {
        targetCell.classList.remove('drag-over');
      }
    }
  }

    // Method to handle drag end
    onDragEnd(event: DragEvent) {
      event.preventDefault();
      event.stopPropagation();
  
      if (this.draggedEvent) {
        // Clear the visual indication of the drag-over state from all timesheet cells
        const timesheetCells = document.querySelectorAll('.timesheet-cell');
        timesheetCells.forEach((cell) => {
          cell.classList.remove('drag-over');
        });
      }
    }

     // Method to handle cell click
  onCellClick(date: Date, timeSlot: string) {
    // Implement the logic to handle the click on a timesheet cell.
    // You can open a dialog, display event details, or perform any other action based on the cell's day and timeSlot.
    console.log(`Clicked on ${date} at ${timeSlot}`);
  }


  getStartOfWeek(date: Date): Date {
    const dayOfWeek = date.getDay();
    const diff = date.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1);
    const startOfWeek = new Date(date);
    startOfWeek.setDate(diff);
    startOfWeek.setHours(0, 0, 0, 0);
    return startOfWeek;
  }
  
  getEndOfWeek(date: Date): Date {
    const startOfWeek = this.getStartOfWeek(date);
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(endOfWeek.getDate() + 6);
    endOfWeek.setHours(23, 59, 59, 999);
    return endOfWeek;
  }
  
  goToPreviousWeek() {
    this.viewDate.setDate(this.viewDate.getDate() - 7);
    this.currentWeekStartDate = this.getStartOfWeek(this.viewDate);
    this.currentWeekEndDate = this.getEndOfWeek(this.viewDate);
    this.populateWeekDates();
    // Fetch schedules for the updated week if needed
  }
  
  goToNextWeek() {
    this.viewDate.setDate(this.viewDate.getDate() + 7);
    this.currentWeekStartDate = this.getStartOfWeek(this.viewDate);
    this.currentWeekEndDate = this.getEndOfWeek(this.viewDate);
    this.populateWeekDates();
    // Fetch schedules for the updated week if needed
  }
  
  
















}






