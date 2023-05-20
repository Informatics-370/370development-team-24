import { Component, OnInit} from '@angular/core';
import { DataService } from 'src/app/service/data.Service';
import { MenuTypes } from 'src/app/shared/menu-types';
import {Router} from '@angular/router';

@Component({
  selector: 'app-menu-types',
  templateUrl: './menu-types.component.html',
  styleUrls: ['./menu-types.component.css']
})
export class MenuTypesComponent implements OnInit{
  menuTypes:MenuTypes[] = [];

  constructor(private dataService: DataService, private router: Router){}
   
  ngOnInit(): void{
    this.GetAllMenuTypes()
    console.log(this.menuTypes)
  }

  //get all the menu types
  GetAllMenuTypes()
  {
    this.dataService.GetAllMenuTypes().subscribe(result => {
      let typesList:any[] = result
      typesList.forEach((element) => {
        this.menuTypes.push(element)
      });
    })
  }

}
