import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from 'src/app/service/data.Service';
import { FoodType } from 'src/app/shared/food-type';
import { MenuItemCategory } from 'src/app/shared/menu-item-category';
import { ActivatedRoute} from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { HelpEditmenucategoryComponent } from '../help-editmenucategory/help-editmenucategory.component';
import { MenuTypes } from 'src/app/shared/menu-types';

@Component({
  selector: 'app-edit-menu-item-category',
  templateUrl: './edit-menu-item-category.component.html',
  styleUrls: ['./edit-menu-item-category.component.css']
})
export class EditMenuItemCategoryComponent {
  editMenuItemCategory: MenuItemCategory = new MenuItemCategory();
  // Add a property to store menu types
  menuTypesData: MenuTypes[] = [];

  updateMenuItemCategoryForm: FormGroup = new FormGroup({
    name: new FormControl('',[Validators.required]),
    description: new FormControl('',[Validators.required]),
    menu_TypeId: new FormControl('',[Validators.required]),
  })

  constructor(private dataService: DataService, private router: Router, private http: HttpClient, private activated:ActivatedRoute, private dialog: MatDialog) {}

  ngOnInit(): void {

    this.activated.params.subscribe(params => { 
      this.dataService.GetMenuItemCategory(params['id']).subscribe(res => { 
        this.editMenuItemCategory = res as MenuItemCategory;

        this.updateMenuItemCategoryForm.controls['name'].setValue(this.editMenuItemCategory.name);
        this.updateMenuItemCategoryForm.controls['description'].setValue(this.editMenuItemCategory.description);
        this.updateMenuItemCategoryForm.controls['menu_TypeId'].setValue(this.editMenuItemCategory.menu_TypeId);
      })
 
    })
    this.GetAllMenuTypes()
  }

  // ngOnInit() {
  //   const foodTypeId = this.activated.snapshot.params['id'];
  //   this.http.get(`/api/FoodTypes/${foodTypeId}`).subscribe((data: any) => {
  //     this.editFoodType = data;
  //   });
  // }

  GetAllMenuTypes(){
    this.dataService.GetAllMenuTypes().subscribe(result => {
    let menuTypesList:any[] = result
    menuTypesList.forEach((element) => {
    this.menuTypesData.push(element)
  });
});
}



  cancel(){
    this.router.navigate(['/menu-item-category'])
  }

  UpdateMenuItemCategory()
  {
    let menuItemCategory = new MenuItemCategory();
    menuItemCategory.name = this.updateMenuItemCategoryForm.value.name;
    menuItemCategory.description = this.updateMenuItemCategoryForm.value.description;
    menuItemCategory.menu_TypeId = this.updateMenuItemCategoryForm.value.menu_TypeId;
    
    this.dataService.EditMenuItemCategory(this.editMenuItemCategory.menu_CategoryId, menuItemCategory).subscribe((response:any) => {
        if(response)
      {
        this.router.navigate(['/menu-item-category'])
   
      }
      else
      {
        alert(response.message);
      }
    });
  }
  openHelpModal(field: string): void {
    const dialogRef = this.dialog.open(HelpEditmenucategoryComponent, {
      width: '500px',
      data: { field } // Pass the field name to the modal
    });
  
    dialogRef.afterClosed().subscribe(result => {
      // Handle modal close if needed
    });
  }
}
