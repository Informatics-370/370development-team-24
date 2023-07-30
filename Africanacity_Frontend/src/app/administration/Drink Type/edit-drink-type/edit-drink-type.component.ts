import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from 'src/app/service/data.Service';
import { DrinkType } from 'src/app/shared/drink-type';
import { ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-edit-drink-type',
  templateUrl: './edit-drink-type.component.html',
  styleUrls: ['./edit-drink-type.component.css']
})
export class EditDrinkTypeComponent {
  editDrinkType: DrinkType = new DrinkType();

  updateDrinkTypeForm: FormGroup = new FormGroup({
    name: new FormControl('',[Validators.required]),
  })

  constructor(private dataService: DataService, private router: Router, private http: HttpClient, private activated:ActivatedRoute) {}

  ngOnInit(): void {

    this.activated.params.subscribe(params => { 
      this.dataService.GetDrinkType(params['id']).subscribe(res => { 
        this.editDrinkType = res as DrinkType;

        this.updateDrinkTypeForm.controls['name'].setValue(this.editDrinkType.name);
      })
 
    })
  }

  cancel(){
    this.router.navigate(['/drink-type'])
  }

  UpdateDrinkType()
  {
    let drinkType = new DrinkType();
    drinkType.name = this.updateDrinkTypeForm.value.name;   

    this.dataService.EditDrinkType(this.editDrinkType.drinkTypeId,drinkType).subscribe((response:any) => {

      if(response.statusCode == 200)
      {
        this.router.navigate(['/drink-type'])
        window.location.reload();
      }
      else
      {
        alert(response.message);
      }
    });
  }
}
