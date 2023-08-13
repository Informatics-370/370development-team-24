import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from 'src/app/service/data.Service';
import { FoodType } from 'src/app/shared/food-type';
import { ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-edit-food-type',
  templateUrl: './edit-food-type.component.html',
  styleUrls: ['./edit-food-type.component.css']
})

export class EditFoodTypeComponent {

  editFoodType: FoodType = new FoodType();

  updateFoodTypeForm: FormGroup = new FormGroup({
    name: new FormControl('',[Validators.required]),
    description: new FormControl('',[Validators.required]),
  })

  constructor(private dataService: DataService, private router: Router, private http: HttpClient, private activated:ActivatedRoute) {}

  ngOnInit(): void {

    this.activated.params.subscribe(params => { 
      this.dataService.GetFoodType(params['id']).subscribe(res => { 
        this.editFoodType = res as FoodType;

        this.updateFoodTypeForm.controls['name'].setValue(this.editFoodType.name);
        this.updateFoodTypeForm.controls['description'].setValue(this.editFoodType.description);
      })
 
    })
  }

  cancel(){
    this.router.navigate(['/food-type'])
  }

  UpdateFoodType()
  {
    let foodType = new FoodType();
    foodType.name = this.updateFoodTypeForm.value.name;
    foodType.description = this.updateFoodTypeForm.value.description;
    


    this.dataService.EditFoodType(this.editFoodType.foodTypeId,foodType).subscribe((response:any) => {

      if(response.statusCode == 200)
      {
        this.router.navigate(['/food-type'])
        window.location.reload();
      }
      else
      {
        alert(response.message);
      }
    });
  }
  
}
