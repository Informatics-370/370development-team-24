import { Component, OnInit  } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { InventoryService } from 'src/app/service/inventory.service';
import { Chart, ChartOptions, ChartType, ChartDataset } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { InventoryItem } from 'src/app/shared/inventoryitem';
import { InventoryType } from 'src/app/shared/inventorytype';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {
  inventoryItems: InventoryItem[] = [];
  inventoryTypes: InventoryType[] = [];

  // Bar chart
  barChartOptions: ChartOptions = {
    responsive: true,
  };

  barChartLabels: string[] = [];
  barChartData: ChartDataset[] = [
    {
      data: [], // Array of inventory types
      label: 'Inventory Items',
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

  constructor(private http: HttpClient, private inventoryService: InventoryService) { }

  ngOnInit() {
    this.fetchData()
    console.log(this.inventoryItems)
    console.log(this.inventoryTypes)
  }

  fetchData()
  {
    this.inventoryService.GetAllInventoryTypes().subscribe(result => {
      let employeeTypeList:any[] = result
      employeeTypeList.forEach((element) => {
        this.inventoryTypes.push(element);
        this.GetAllInventoryItems();
      });
    })
    console.log("inventory types", this.inventoryTypes)
  }

  GetAllInventoryItems()
  {
    this.inventoryService.GetAllInventoryItems().subscribe(result => {
      let inventoryItemList:any[] = result
      inventoryItemList.forEach((element) => {
        this.inventoryItems.push(element);      
      });
      this.generateBarChart();
    });
    console.log("inventory items", this.inventoryItems)
  }

  generateBarChart() {
    // Create a mapping object to store the count for each role
    const typeCountMap: { [typeName: string]: number } = {};
  
    // Count the employees for each role
    this.inventoryItems.forEach(inv => {
      const typeName  = inv.inventoryTypeName;
      if (typeName ) {
        if (!typeCountMap.hasOwnProperty(typeName )) {
          typeCountMap[typeName ] = 1;
        } else {
          typeCountMap[typeName ]++;
        }
      }
    });
  
    // Use the employeeRoles array to get the role names for the chart labels
    const itemLabels = this.inventoryTypes.map(type => type.name);
  
    // Map the counts to the corresponding roles for the chart data
    const inventoryItemCountData = itemLabels.map(typeName => typeCountMap[typeName] ||0);  
  
    // Update the chart data and labels for BAR GRAPH
    this.barChartLabels = itemLabels;
    this.barChartData[0].data = inventoryItemCountData;

    // Update the chart data and labels for PIE GRAPH
    this.pieChartLabels = itemLabels;
    this.pieChartData[0].data = inventoryItemCountData;

  }
}
