import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Employee } from 'src/app/shared/employee';
import { EmployeeService } from 'src/app/service/employee.service';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { saveAs } from 'file-saver'; // Import file-saver for saving the PDF

@Component({
  selector: 'app-view-employees',
  templateUrl: './view-employees.component.html',
  template: `
  <button (click)="deleteItem()">Delete</button>
`,


  styleUrls: ['./view-employees.component.css']
})
export class ViewEmployeesComponent {
  employees: Employee[] = []
  filteredemployees: Employee[] = [];
  
  constructor(private employeeservice: EmployeeService, private snackBar: MatSnackBar, private httpClient: HttpClient, private router: Router){}

  deleteItem(): void {
    const confirmationSnackBar = this.snackBar.open('Are you sure you want to delete this employee?', 'Delete, Cancel',{
      duration: 5000, // Display duration in milliseconds

    });

    
    //  cancel(){
    //    this.router.navigate(['/home'])
    //  }
  

    confirmationSnackBar.onAction().subscribe(() => {
      // Perform the deletion action here
      this.deleteItemFromServer();
      window.location.reload();
    });
  }

deleteItemFromServer(): void {
  this.DeleteEmployee;
}

  ngOnInit(): void {
    this.GetAllEmployees()
    console.log(this.employees)

    this.filteredemployees= this.employees
    console.log(this.filteredemployees)

  }

  GetAllEmployees()
  {
    this.employeeservice.GetAllEmployees().subscribe(result => {
      let employeeList:any[] = result
      employeeList.forEach((element) => {
        this.employees.push(element)
        
      });
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.toLowerCase();
  
    this.filteredemployees = this.employees.filter(employee => {
      const column2Value = employee.firstName.toLowerCase() || employee.firstName.toUpperCase();
      const column3Value = employee.surname.toLowerCase();
      const column4Value = employee.email_Address.toLowerCase();
      const column5Value = employee.physical_Address.toLowerCase();
      const column6Value = employee.employeeRoleName.toLowerCase();
  
      return column2Value.includes(filterValue) || 
      column3Value.includes(filterValue) ||
      column4Value.includes(filterValue) ||
      column5Value.includes(filterValue) ||
      column6Value.includes(filterValue);
    });
  }


  DeleteEmployee(employeeId: Number){
    this.employeeservice.deleteEmployee(employeeId).subscribe(result => {
      this.deleteItem();
      });
    }
    downloadPDF() {
      const doc = new jsPDF();
      const headers = [['ID', 'Name', 'Surname', 'Role', 'Email', 'Phone Number', 'Address']];
      
      // Map the checklistItems to generate the data array
      const data = this.employees.map(employee => [employee.employeeId, employee.firstName, employee.surname, employee.employeeRole, employee.email_Address, employee.phoneNumber, employee.physical_Address]);
    
      doc.setFontSize(12);
    
      // Generate the table using autoTable
      // startY is the initial position for the table
      autoTable(doc, {
        head: headers,
        body: data,
        startY: 20,
        // Other options for styling the table if needed
      });
      
      // Convert the PDF blob to a Base64 string
      const pdfBlob = doc.output('blob');
    
      // Create a file-saver Blob object
      const file = new Blob([pdfBlob], { type: 'application/pdf' });
    
      // Save the Blob to a file
      saveAs(file, 'employee_listing.pdf');
    }
}
