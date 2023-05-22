import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from 'src/app/service/data.Service';
import { FoodType } from 'src/app/shared/food-type';
import { MenuItemCategory } from 'src/app/shared/menu-item-category';
import { ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-edit-menu-item-category',
  templateUrl: './edit-menu-item-category.component.html',
  styleUrls: ['./edit-menu-item-category.component.css']
})
export class EditMenuItemCategoryComponent {
  editMenuItemCategory: MenuItemCategory = new MenuItemCategory();

  updateMenuItemCategoryForm: FormGroup = new FormGroup({
    name: new FormControl('',[Validators.required]),
    description: new FormControl('',[Validators.required]),
  })

  constructor(private dataService: DataService, private router: Router, private http: HttpClient, private activated:ActivatedRoute) {}

  ngOnInit(): void {

    this.activated.params.subscribe(params => { 
      this.dataService.GetFoodType(params['id']).subscribe(res => { 
        this.editMenuItemCategory = res as MenuItemCategory;

        this.updateMenuItemCategoryForm.controls['name'].setValue(this.editMenuItemCategory.name);
        this.updateMenuItemCategoryForm.controls['description'].setValue(this.editMenuItemCategory.description);
      })
 
    })
  }

  // ngOnInit() {
  //   const foodTypeId = this.activated.snapshot.params['id'];
  //   this.http.get(`/api/FoodTypes/${foodTypeId}`).subscribe((data: any) => {
  //     this.editFoodType = data;
  //   });
  // }



  cancel(){
    this.router.navigate(['/menu-item-category'])
  }

  UpdateMenuItemCategory()
  {
    let menuItemCategory = new MenuItemCategory();
    menuItemCategory.name = this.updateMenuItemCategoryForm.value.name;
    menuItemCategory.description = this.updateMenuItemCategoryForm.value.description;
    


    this.dataService.EditMenuItemCategory(this.editMenuItemCategory.MenuItemCategoryId, menuItemCategory).subscribe((response:any) => {

      if(response.statusCode == 200)
      {
        this.router.navigate(['/menu-item-category'])
        window.location.reload();
      }
      else
      {
        alert(response.message);
      }
    });
  }
}
