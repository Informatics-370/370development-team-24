import { Component, OnInit  } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataService } from 'src/app/service/data.Service';
import { EmployeeService } from 'src/app/service/employee.service';
import { Chart, ChartOptions, ChartType, ChartDataset } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { Employee } from 'src/app/shared/employee';
import { Employee_Role } from 'src/app/shared/EmployeeRole';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  employees: Employee[] = [];
  employeeRoles: Employee_Role[] = [];

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
    console.log(this.employees)
    console.log(this.employeeRoles)
  }

  fetchData()
  {
    this.dataService.GetAllEmployeeRoles().subscribe(result => {
      let employeeRoleList:any[] = result
      employeeRoleList.forEach((element) => {
        this.employeeRoles.push(element);
        this.GetAllEmployees();
      });
    })
  }

  GetAllEmployees()
  {
    this.employeeService.GetAllEmployees().subscribe(result => {
      let employeeList:any[] = result
      employeeList.forEach((element) => {
        this.employees.push(element);      
      });
      this.generateBarChart();
    });
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
}
