import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MainService } from '../service/main.service';
import { TableNumber } from '../shared/table-number';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent  implements OnInit {
  tableNumbers: TableNumber[] = [];
  selectedTableNumber: string | null = null;

  constructor(private mainService: MainService, private router: Router) { }

  ngOnInit() {
    this.mainService.GetAllTableNumbers().subscribe(
      (result: any) => {
        this.tableNumbers = result;
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

  onTableNumberSelected(tableNumber: string) {
    this.router.navigate(['/order', { tableNumber: tableNumber }]);
  }

}
