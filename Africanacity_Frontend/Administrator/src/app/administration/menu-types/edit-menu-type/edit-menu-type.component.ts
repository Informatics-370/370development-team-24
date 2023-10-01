import { Component, OnInit} from '@angular/core';
import { DataService } from 'src/app/service/data.Service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuTypes } from 'src/app/shared/menu-types';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';
import { ConfirmationDialogComponent } from '../add-menu-type/confirmation-dialog/confirmation-dialog.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { HelpEditmenutypeComponent } from './help-editmenutype/help-editmenutype.component';


@Component({
  selector: 'app-edit-menu-type',
  templateUrl: './edit-menu-type.component.html',
  styleUrls: ['./edit-menu-type.component.css'],
  
})
export class EditMenuTypeComponent implements OnInit{
  

  // menu_TypeId!: number;
 

  constructor(private dataService:DataService, private activated:ActivatedRoute,  private router : Router,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,) { }

  MenuTypes: MenuTypes = new MenuTypes();

  //the form
  //ensure all edit  forms are filled in
 

  editMenuTypeForm: FormGroup = new FormGroup({
    name: new FormControl('',[Validators.required])
  })

  cancel(){
    this.router.navigate(['/menu-types'])
  }

   ngOnInit(): void {

    this.activated.params.subscribe(params => { 
      this.dataService.GetMenuTypeById(params['id']).subscribe(edit => { 
        this.MenuTypes = edit as MenuTypes;
       this.editMenuTypeForm.controls['name'].setValue(this.MenuTypes.name);
      })
 
     })
  }


  /*after submission of edit*/
  /*editMenuType()
  {
    let menuType = new MenuTypes();
    menuType.name = this.editMenuTypeForm.value.name;
   this.dataService.EditMenuType(this.MenuTypes.menu_TypeId,menuType).subscribe((edit:any) => {

      this.router.navigate(['/menu-types'])
    
    
   });
   this.showSuccessMessage('Menu Type edited successfully!');

  }*/

  editMenuType() {
    if (this.MenuTypes?.menu_TypeId !== undefined) { // Check if menu_TypeId is defined
      const menuType = new MenuTypes();
      menuType.name = this.editMenuTypeForm.value.name;
  
      this.dataService.EditMenuType(this.MenuTypes.menu_TypeId, menuType).subscribe(
        (edit: any) => {
          this.router.navigate(['/menu-types']);
        },
        (error) => {
          // Handle error
        }
      )
      
  
      this.showSuccessMessage('Menu Type edited successfully!');
    } else {
      // Handle the case where menu_TypeId is undefined
      // You may want to display an error message or take appropriate action
    }
  }
  

  showSuccessMessage(message: string): void {
    const snackBarRef: MatSnackBarRef<any> = this.snackBar.open(message, 'Ok', {
      duration: 3000, // Duration in milliseconds
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    });
  }

  openHelpModal(field: string): void {
    const dialogRef = this.dialog.open(HelpEditmenutypeComponent, {
      width: '500px',
      data: { field } // Pass the field name to the modal
    });
  
    dialogRef.afterClosed().subscribe(result => {
      // Handle modal close if needed
    });
  }

}
