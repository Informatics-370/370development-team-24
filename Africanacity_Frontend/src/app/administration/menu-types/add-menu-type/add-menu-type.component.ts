import { Component, ViewChild, ViewContainerRef } from '@angular/core';
import { DataService } from 'src/app/service/data.Service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuTypes } from 'src/app/shared/menu-types';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-menu-type',
  templateUrl: './add-menu-type.component.html',
  styleUrls: ['./add-menu-type.component.css']
})

export class AddMenuTypeComponent {
  menu_typeId: number = 0;
  addMenuTypeForm: FormGroup;
  @ViewChild('toastContainer', { read: ViewContainerRef })
  toastContainer!: ViewContainerRef;
 


  constructor(private dataService:DataService,
    private route : ActivatedRoute,
     private router : Router,
      private fb: FormBuilder,
      private dialog: MatDialog,
      private snackBar: MatSnackBar,
      
      ) {


//creating a form
   this.addMenuTypeForm = this.fb.group({
     menu_typeId: [0, [Validators.required]],
     name: ['', [Validators.required]] 
   })
 }


//confirmation dialog method
 openDialog():void{
  const dialogRef = this.dialog.open(ConfirmationDialogComponent,{
    width: '250px',
    data: 'Add New Menu Type?'
  });


  dialogRef.afterClosed().subscribe(result => {
    if(result == 'Yes'){
      this.addNewMenuType();
      
    }
  })

 }


 /*openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
  this.dialog.open(CreateConfirmationDialog, {
    width: '25%',
    enterAnimationDuration,
    exitAnimationDuration,
  });
}*/
 
 ngOnInit(): void {}

 //code to add a new mmenu type
 addNewMenuType(){
  let menuType = new MenuTypes();
  menuType.name = this.addMenuTypeForm.value.name;

  this.dataService.AddMenuType(menuType).subscribe((add:any) =>{
    this.router.navigate(['/menu-types'])
    
  });
  this.showSuccessMessage('Menu Type added successfully!');
}

//success message
showSuccessMessage(message: string): void {
  const snackBarRef: MatSnackBarRef<any> = this.snackBar.open(message, 'Ok', {
    duration: 3000, // Duration in milliseconds
    horizontalPosition: 'center',
    verticalPosition: 'bottom'
  });

    snackBarRef.afterDismissed().subscribe(() => {
    this.toastContainer.clear();
  });

 
}







}
