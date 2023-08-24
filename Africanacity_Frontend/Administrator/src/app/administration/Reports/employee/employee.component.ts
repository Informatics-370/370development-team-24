import { Component, OnInit  } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataService } from 'src/app/service/data.Service';
import { EmployeeService } from 'src/app/service/employee.service';
import { Chart, ChartOptions, ChartType, ChartDataset } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { Employee } from 'src/app/shared/employee';
import { Employee_Role } from 'src/app/shared/EmployeeRole';
import { Gender } from 'src/app/shared/gender';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  employees: Employee[] = [];
  employeeRoles: Employee_Role[] = [];
  genders: Gender[] = [];
  filteredEmployees: Employee[] = [];

  isFilterActive = false;

  // Bar chart
  barChartOptions: ChartOptions = {
    responsive: true,
  };

  barChartLabels: string[] = [];
  barChartData: ChartDataset[] = [
    {
      data: [], // Array of employee counts
      label: 'Number of Employees',
    },
  ];
  barChartLegend = true;
  barChartType: ChartType = 'bar';

  // Pie Chart
  pieChartOptions: ChartOptions = {
    responsive: true,
  }
  pieChartLabels: string[] = [];
  pieChartData: ChartDataset[] = [
    {
      data: [], // Array of employee counts
      label: 'Number of Employees'
    }
  ];
  pieChartType: ChartType = 'pie';

  constructor(private http: HttpClient, private dataService: DataService, private employeeService: EmployeeService) { }

  ngOnInit() {
    this.fetchData()
    this.GetAllGenders()
  }

  fetchData()
  {
    this.dataService.GetAllEmployeeRoles().subscribe(result => {
      let employeeRoleList:any[] = result;
      this.employeeRoles = employeeRoleList;
      this.GetAllEmployees();
    });
  }

  GetAllEmployees()
  {
    this.employeeService.GetAllEmployees().subscribe(result => {
      let employeeList:any[] = result;
      this.employees = employeeList;

      this.generateBarChart();
    });
  }

  GetAllGenders()
  {
    this.employeeService.GetAllGenders().subscribe(result => {
      let genderList:any[] = result
      genderList.forEach((element) => {
        this.genders.push(element)
        
      });
    })
  }

  generateBarChart() {
    // Create a mapping object to store the count for each role
    const roleCountMap: { [roleName: string]: number } = {};
  
    // Count the employees for each role
    this.employees.forEach(emp => {
      const roleName  = emp.employeeRoleName;
      if (roleName ) {
        if (!roleCountMap.hasOwnProperty(roleName )) {
          roleCountMap[roleName ] = 1;
        } else {
          roleCountMap[roleName ]++;
        }
      }
    });
  
    // Use the employeeRoles array to get the role names for the chart labels
    const roleLabels = this.employeeRoles.map(role => role.name);
  
    // Map the counts to the corresponding roles for the chart data
    const employeeCountData = roleLabels.map(roleName => roleCountMap[roleName] ||0);  
  
    // Update the chart data and labels for BAR GRAPH
    this.barChartLabels = roleLabels;
    this.barChartData[0].data = employeeCountData;

    // Update the chart data and labels for PIE GRAPH
    this.pieChartLabels = roleLabels;
    this.pieChartData[0].data = employeeCountData;

  }

  filterByEmployeeRole(role: string) 
  {
    if (role === 'all') {
      this.isFilterActive = false;
    } else {
      this.filteredEmployees = this.employees.filter(item => item.employeeRoleName === role);
      this.isFilterActive = true;
    }
  }

  filterByEmployeeGender(gender: string) 
  {
    if (gender === 'all') {
      this.isFilterActive = false;
    } else {
      this.filteredEmployees = this.employees.filter(item => item.genderName === gender);
      this.isFilterActive = true;
    }
  }

  downloadPDF() {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text('Employee Report', 105, 25, { align: 'center' });
  
    // Add logo to the top left corner of the first page
    const logoImageUrl = 'assets/Pictures/Logo Black.png'; // Replace with the actual path to your logo image
    const logoWidth = 10; // Adjust the width of the logo as needed
    const logoHeight = 10; // Adjust the height of the logo as needed
    doc.addImage(logoImageUrl, 'PNG', 100, 5, logoWidth, logoHeight);

    const headers = [['ID', 'Name', 'Surname', 'Gender', 'Role', 'Email Address', 'Physical Address', 'Phone Number', 'Employment Date']];
    
    let employeesToDisplay = this.employees; // Default: Display all employees
  
    if (this.isFilterActive) {
      employeesToDisplay = this.filteredEmployees; // Display filtered employees
    }

    const data = employeesToDisplay.map(employees => [
      employees.employeeId, 
      employees.firstName, 
      employees.surname, 
      employees.genderName,
      employees.employeeRoleName,
      employees.email_Address, 
      employees.physical_Address, 
      employees.phoneNumber,
      employees.employment_Date instanceof Date ? employees.employment_Date.toDateString() : ''
    ]);
  
    doc.setFontSize(12);

    let startY = 40; // Adjust the Y position to leave space below the logo
  
    // Generate headers
    doc.autoTable({
      head: [headers],
      //margin: {top: 10},
      startY,
    });

    startY += 10; // Increment Y position for the next row

    // Generate rows
    data.forEach((row) => {
      // Check if the page height will be exceeded
      if (startY + 10 > doc.internal.pageSize.height) {
        // Add a new page
        doc.addPage();
        startY = 20; // Reset Y position
      }

      // Generate the table row
      doc.autoTable({
        body: [row,[{ theme: 'grid'}]], // Use 'row' for the current iteration
        startY,
      });
        
      startY += 10; // Increment Y position for the next row
    });
  
    // Convert the PDF blob to a Base64 string
    const pdfBlob = doc.output('blob');
  
    // Create a file-saver Blob object
    const file = new Blob([pdfBlob], { type: 'application/pdf' });
  
    // Save the Blob to a file
    saveAs(file, 'employee_report.pdf');
  }
}
