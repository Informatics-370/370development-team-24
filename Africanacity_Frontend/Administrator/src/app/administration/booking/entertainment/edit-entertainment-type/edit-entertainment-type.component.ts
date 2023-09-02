import { Component,OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';
import { DataService } from 'src/app/service/data.Service';
import { MatDialog } from '@angular/material/dialog';
import { Entertainment_Type } from 'src/app/shared/entertainmentType';
import { HelpEditentertainmentComponent } from './help-editentertainment/help-editentertainment.component';

@Component({
  selector: 'app-edit-entertainment-type',
  templateUrl: './edit-entertainment-type.component.html',
  styleUrls: ['./edit-entertainment-type.component.css']
})
export class EditEntertainmentTypeComponent implements OnInit{

  ngOnInit(): void {
    this.activated.params.subscribe(params =>{
      this.dataService.GetEntertainmentType(params['id']).subscribe(result =>{
        this.editType = result as Entertainment_Type;
        this.updateTypeForm.controls['name'].setValue(this.editType.name);
        this.updateTypeForm.controls['description'].setValue(this.editType.description);
      })
    })
  }

  constructor( private dataService: DataService, 
    private router: Router, 
    private activated:ActivatedRoute,
    private snackBar: MatSnackBar,  private dialog: MatDialog,){}


    editType: Entertainment_Type = new Entertainment_Type();

   updateTypeForm: FormGroup = new FormGroup({
    name: new FormControl('',[Validators.required,this.noSpacesValidator]),
    description: new FormControl('',[Validators.required,this.noSpacesValidator])
   })

   cancel(){
    this.router.navigate(['/entertainment-types'])
  }
   
  updateEntertainment(){
    let entertainmentType = new Entertainment_Type();
      entertainmentType.name = this.updateTypeForm.value.name;
      entertainmentType.description= this.updateTypeForm.value.description;

      this.dataService.EditEntertainmentType(this.editType.entertainment_TypeId,entertainmentType).subscribe((response:any)=>{
        if (response.statusCode === 200) {
          this.router.navigate(['/entertainment-types']);
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

  openHelpModal(field: string): void {
    const dialogRef = this.dialog.open(HelpEditentertainmentComponent, {
      width: '500px',
      data: { field } // Pass the field name to the modal
    });
  
    dialogRef.afterClosed().subscribe(result => {
      // Handle modal close if needed
    });
  }

  
     // Custom validator to check for spaces
     noSpacesValidator(control: AbstractControl): { [key: string]: boolean } | null {
      if (control.value && control.value.trim().length === 0) {
        return { 'noSpaces': true };
      }
      return null;
    }
}
