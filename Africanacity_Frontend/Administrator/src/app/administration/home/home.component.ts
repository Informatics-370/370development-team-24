import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Chart, ChartOptions, ChartType, ChartDataset, ChartConfiguration } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { ApiService } from 'src/app/UserService/api.service';
import { AuthService } from 'src/app/UserService/auth.service';
import { UserStoreService } from 'src/app/UserService/user-store.service';
import { DataService } from 'src/app/service/data.Service';
import { EmployeeService } from 'src/app/service/employee.service';
import { InventoryService } from 'src/app/service/inventory.service';
import { Employee } from 'src/app/shared/employee';
import { Employee_Role } from 'src/app/shared/EmployeeRole';
import { Gender } from 'src/app/shared/gender';
import { StockTakeRecon } from 'src/app/shared/stocktake';
import { StockTake, StockTakeItem } from 'src/app/shared/stocktakeitem';
import { InventoryItem } from 'src/app/shared/inventoryitem';
import { Order } from 'src/app/shared/order';
import { VAT } from 'src/app/shared/Vat';
import { Discount } from 'src/app/shared/Discount';


interface Accumulator {
  [roleName: string]: {
    [gender: string]: number;
  };
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public fullName : string = "";

  // EMPLOYEE
  employees: Employee[] = [];
  employeeRoles: Employee_Role[] = [];
  genders: Gender[] = [];

  // INVENTORY RECON
  reconItems: StockTakeRecon[] = [];
  stockTakeItems: StockTakeItem [] = [];
  inventoryItems: InventoryItem [] = [];

  // SALES
  Orders: Order[] = [];
  Vat: VAT[] = [];
  Discount: Discount[] = [];

  currentDate: Date = new Date();
  startDate: Date = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() - 1, this.currentDate.getDate() + 1);
  endDate: Date = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), this.currentDate.getDate());

  orderCount = this.Orders.filter(item => item.orderDate >= this.startDate && item.orderDate <= this.endDate);

  // Bar chart
  barChartOptions: ChartOptions = {
    responsive: true,
  };

  barChartLabels: any[] = [];
  barChartData: any[] = [];
    /*{
      data: [], // Array of employee counts
      label: 'Number of Employees',
    },
  ];*/
  barChartLegend = true;
  barChartType: ChartType = 'bar';

  // Line chart
  lineChartData: ChartDataset[] = [];
  lineChartLabels: string[] = [];
  lineChartOptions: ChartOptions = { responsive: true,};
  lineChartLegend = true;
  lineChartType: ChartType = 'line';
  lineChartPlugins = [];

  constructor( private http: HttpClient,
    private auth: AuthService,
    private api : ApiService, 
    private userStore: UserStoreService,
    private dataService: DataService, 
    private employeeService: EmployeeService,
    private inventoryService: InventoryService
    ) { }

  ngOnInit(): void {
    this.userStore.getFullNameFromStore()
    .subscribe(val=>{
      const fullNameFromToken = this.auth.getfullNameFromToken();
      this.fullName = val || fullNameFromToken
    });

    // EMPLOYEE
    this.fetchData()
    this.GetAllGenders()

    console.log("employees", this.fetchData())

    // INVENTORY RECON
    this.GetAllReconItems()
    console.log('recon', this.reconItems)

    // SALES
    this.GetAllOrders()
    console.log("sale", this.Orders)
  }
 
  logout(){
    this.auth.signOut();
  }

  // EMPLOYEE
  fetchData()
  {
    this.dataService.GetAllEmployeeRoles().subscribe(result => {
      this.employeeRoles = result;
      this.GetAllEmployees();
    });
  }

  GetAllEmployees()
  {
    this.employeeService.GetAllEmployees().subscribe(result => {
      this.employees = result;
      this.generateBarChart();
    });
  }

  GetAllGenders()
  {
    this.employeeService.GetAllGenders().subscribe(result => {
      this.genders = result
      this.genders.forEach((element) => {
        this.genders.push(element)        
      });
    })
  }

  generateBarChart() {
    // Extract unique role names and genders from your data
    const uniqueRoles = Array.from(new Set(this.employees.map(emp => emp.employeeRoleName)));
    const uniqueGenders = Array.from(new Set(this.employees.map(emp => emp.gender)));
  
    // Create a mapping object to store the count for each role and gender combination
    const dataMap: { [key: string]: number } = {};
  
    // Count the employees for each role and gender combination
    this.employees.forEach(emp => {
      const key = `${emp.employeeRoleName}-${emp.gender}`;
      if (!dataMap[key]) {
        dataMap[key] = 1;
      } else {
        dataMap[key]++;
      }
    });
  
    // Prepare data for the chart
    const datasets = uniqueGenders.map(gender => ({
      label: gender,
      data: uniqueRoles.map(role => dataMap[`${role}-${gender}`] || 0),
      backgroundColor: this.getRandomColor() // You can implement getRandomColor() to generate random colors
    }));
  
    // Update the chart data and labels
    this.barChartLabels = uniqueRoles;
    this.barChartData = datasets;
  }
  

  getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  // INVENTORY RECON
  loadChartData() {
    this.lineChartData = [
      {
        data: this.reconItems.map(item => item.quantityDifference),
        label: 'Quantity Difference',
        fill: false,
      },
    ];
  
    this.lineChartLabels = this.reconItems.map(item => item.inventoryItemName);
  }
  
  GetAllReconItems()
  {
    this.inventoryService.GetAllReconItems().subscribe(result => {
      let reconList:any[] = result;
      this.reconItems = reconList;
        
      this.loadChartData();
    });
  }

  // ORDERS
  GetAllOrders()
  {
    this.dataService.getAllKitchenOrders().subscribe(result => {
      this.Orders = result;
    })
  }


}
