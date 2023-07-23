import { Component,OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';
import { DataService } from 'src/app/service/data.Service';
import { Entertainment_Type } from 'src/app/shared/entertainmentType';

@Component({
  selector: 'app-edit-entertainment-type',
  templateUrl: './edit-entertainment-type.component.html',
  styleUrls: ['./edit-entertainment-type.component.css']
})
export class EditEntertainmentTypeComponent implements OnInit{

  ngOnInit(): void {
    this.activated.params.subscribe(params =>{
      this.dataService.GetEvent(params['id']).subscribe(result =>{
        this.editType = result as Entertainment_Type;
        this.updateTypeForm.controls['Name'].setValue(this.editType.Name);
        this.updateTypeForm.controls['Description'].setValue(this.editType.Description);
      })
    })
  }

  constructor( private dataService: DataService, 
    private router: Router, 
    private activated:ActivatedRoute,
    private snackBar: MatSnackBar){}


    editType: Entertainment_Type = new Entertainment_Type();

   updateTypeForm: FormGroup = new FormGroup({
    Name: new FormControl('',[Validators.required]),
    Description: new FormControl('',[Validators.required])
   })

   cancel(){
    this.router.navigate(['/entertainment-types'])
  }
   
  updateEntertainment(){
    let entertainmentType = new Entertainment_Type();
      entertainmentType.Name = this.updateTypeForm.value.event_name;
      entertainmentType.Description= this.updateTypeForm.value.description;

      this.dataService.EditEntertainment(this.editType.Entertainment_TypeId,entertainmentType).subscribe((response:any)=>{
        if (response.statusCode === 200) {
          this.router.navigate(['./entertainment-types']);
          window.location.reload();
          this.showSuccessMessage('Entertainment Type updated successfully!');
        } else {
          // Handle error if needed
        }
      },
      (error) => {
        // Handle error if needed
      }
      );
  }

  showSuccessMessage(message: string): void {
    const snackBarRef: MatSnackBarRef<any> = this.snackBar.open(message, 'Ok', {
      duration: 3000, // Duration in milliseconds
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    });
  }

}
