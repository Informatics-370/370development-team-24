import { HttpClient } from '@angular/common/http';
import { Component, ViewChild, ViewContainerRef } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { DataService } from 'src/app/service/data.Service';
import { MenuItemCategory } from 'src/app/shared/menu-item-category';
import { ActivatedRoute, Router} from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from 'src/app/administration/menu-types/add-menu-type/confirmation-dialog/confirmation-dialog.component'
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';

@Component({
  selector: 'app-create-menu-item-category',
  templateUrl: './create-menu-item-category.component.html',
  styleUrls: ['./create-menu-item-category.component.css']
})
export class CreateMenuItemCategoryComponent {
  MenuItemCategoryId: number = 0;
  AddMenuItemCategoryForm: FormGroup;
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

  ngOnInit(): void {  }

  cancel(){
    this.router.navigate(['/menu-item-category'])
  }

  AddMenuItemCategory()
  {
    let menuItemCategory = new MenuItemCategory();
    menuItemCategory.name = this.AddMenuItemCategoryForm.value.name;
    menuItemCategory.description = this.AddMenuItemCategoryForm.value.description;
    
    this.dataService.AddMenuItemCategory(menuItemCategory).subscribe((add:any) => {
      this.router.navigate(['/menu-item-category'])
  
    });
    this.showSuccessMessage('Menu Item Category added successfully!')
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
