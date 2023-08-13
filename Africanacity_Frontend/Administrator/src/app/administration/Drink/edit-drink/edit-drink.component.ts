import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from 'src/app/service/data.Service';
import { Drink } from 'src/app/shared/Drink';
import { ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-edit-drink',
  templateUrl: './edit-drink.component.html',
  styleUrls: ['./edit-drink.component.css']
})
export class EditDrinkComponent {
  editDrink: Drink = new Drink();

  updateDrinkForm: FormGroup = new FormGroup({
    name: new FormControl('',[Validators.required]),
  })

  constructor(private dataService: DataService, private router: Router, private http: HttpClient, private activated:ActivatedRoute) {}

  ngOnInit(): void {

    this.activated.params.subscribe(params => { 
      this.dataService.GetDrink(params['id']).subscribe(res => { 
        this.editDrink = res as Drink;

        this.updateDrinkForm.controls['name'].setValue(this.editDrink.name);
      })
 
    })
  }

  cancel(){
    this.router.navigate(['/drink'])
  }

  UpdateDrinkType()
  {
    let drink = new Drink();
    drink.name = this.updateDrinkForm.value.name;   

    this.dataService.EditDrink(this.editDrink.drinkId,drink).subscribe((response:any) => {

      if(response.statusCode == 200)
      {
        this.router.navigate(['/drink'])
        window.location.reload();
      }
      else
      {
        alert(response.message);
      }
    });
  }
}
