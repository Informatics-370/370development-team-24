import { HttpClient } from '@angular/common/http';
import { Component, ViewChild, ViewContainerRef } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { DataService } from 'src/app/service/data.Service';
import { MenuItemCategory } from 'src/app/shared/menu-item-category';
import { ActivatedRoute, Router} from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from 'src/app/administration/menu-types/add-menu-type/confirmation-dialog/confirmation-dialog.component'
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';
import { HelpAddmenuitemcategoryComponent } from '../help-addmenuitemcategory/help-addmenuitemcategory.component';
import { MenuTypes } from 'src/app/shared/menu-types';



@Component({
  selector: 'app-create-menu-item-category',
  templateUrl: './create-menu-item-category.component.html',
  styleUrls: ['./create-menu-item-category.component.css']
})
export class CreateMenuItemCategoryComponent {
  MenuItemCategoryId: number = 0;
  AddMenuItemCategoryForm: FormGroup;
  menuTypesData: MenuTypes[]=[];
  formData = new FormData();

  @ViewChild('toastContainer', { read: ViewContainerRef})
  toastContainer!: ViewContainerRef;

  constructor(private dataService: DataService, 
    private router: Router, 
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private dialog: MatDialog, 
    private snackBar: MatSnackBar) {

      this.AddMenuItemCategoryForm = this.fb.group({
        MenuItemCategoryId: [0, [Validators.required]],
        name: ['',[Validators.required]],
        description: ['',[Validators.required]],
        menuType: ['', Validators.required],
      })
    }

    //confirmation dialog method
    openDialog():void{
      const dialogRef = this.dialog.open(ConfirmationDialogComponent,{
        width: '250px',
        data: 'Add New Menu Item Category?'
      });


      dialogRef.afterClosed().subscribe(result => {
        if(result == 'Yes'){
          this.AddMenuItemCategory();
          
        }
      })
    }

    //get menutypes options
    GetAllMenuTypes(){
        this.dataService.GetAllMenuTypes().subscribe(result => {
        let menuTypesList:any[] = result
        menuTypesList.forEach((element) => {
        this.menuTypesData.push(element)
      });
    });
  }

  ngOnInit(): void { 
    this.GetAllMenuTypes()
   }

  cancel(){
    this.router.navigate(['/menu-item-category'])
  }

  AddMenuItemCategory()
  {
  if(this.AddMenuItemCategoryForm.valid)
  {
    this.formData.append('name', this.AddMenuItemCategoryForm.get('name')!.value);
    this.formData.append('description', this.AddMenuItemCategoryForm.get('description')!.value);
    this.formData.append('menuType', this.AddMenuItemCategoryForm.get('menuType')!.value);

    this.dataService.AddMenuItemCategory(this.formData).subscribe(() => {
     
      this.router.navigateByUrl('menu-item-category').then((navigated: boolean) => {
        if(navigated) {
          this.snackBar.open(this.AddMenuItemCategoryForm.get('name')!.value + ` created successfully`, 'Ok', {duration: 5000});
        }
     });
    });
  }
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

  openHelpModal(field: string): void {
    const dialogRef = this.dialog.open(HelpAddmenuitemcategoryComponent, {
      width: '500px',
      data: { field } // Pass the field name to the modal
    });
  
    dialogRef.afterClosed().subscribe(result => {
      // Handle modal close if needed
    });
  }
}
