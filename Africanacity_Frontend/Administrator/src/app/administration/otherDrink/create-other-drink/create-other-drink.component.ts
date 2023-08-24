import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/service/data.Service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DrinkType } from 'src/app/shared/Drink_Type';



@Component({
  selector: 'app-create-other-drink',
  templateUrl: './create-other-drink.component.html',
  styleUrls: ['./create-other-drink.component.css']
})
export class CreateOtherDrinkComponent implements OnInit{

  formData = new FormData();
  drinkTypesData : DrinkType[]=[]
  
//form
drinkForm: FormGroup = this.fb.group({
  name: ['', Validators.required],
  description: ['', Validators.required],
  //drinkTypeName: ['', Validators.required],
  amount: [null, Validators.required]
  
})

constructor(private dataService: DataService, private fb: FormBuilder, private router: Router, private snackBar: MatSnackBar) { }




ngOnInit(): void {
  //this.GetAllDrinkTypes()
  
}

GetAllDrinkTypes(){
  this.dataService.GetAllDrinkTypes().subscribe(result => {
    let drinkTypesList:any[] = result
    drinkTypesList.forEach((element) => {
      this.drinkTypesData.push(element)
    });
  });
}


//submit form function
onSubmit() {
  if(this.drinkForm.valid)
  {
    this.formData.append('name', this.drinkForm.get('name')!.value);
    this.formData.append('description', this.drinkForm.get('description')!.value);
    //this.formData.append('drinkTypeName', this.drinkForm.get('drinkTypeName')!.value);

    
        // Add the price as well
        const amount = this.drinkForm.get('amount')!.value;
        this.formData.append('amount', amount.toString());

    this.dataService.AddDrink(this.formData, amount).subscribe(() => {
      this.clearData()
      this.router.navigateByUrl('view-other-drink').then((navigated: boolean) => {
        if(navigated) {
          this.snackBar.open(this.drinkForm.get('name')!.value + ` created successfully`, 'X', {duration: 5000});
        }
     });
    });
  }
}


clearData(){
  this.formData.delete("name");
  this.formData.delete("description");
  this.formData.delete("drinkTypeName");
  
}


}
