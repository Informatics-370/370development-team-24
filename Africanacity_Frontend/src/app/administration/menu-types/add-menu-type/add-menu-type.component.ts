import { Component } from '@angular/core';
import { DataService } from 'src/app/service/data.Service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuTypes } from 'src/app/shared/menu-types';


@Component({
  selector: 'app-add-menu-type',
  templateUrl: './add-menu-type.component.html',
  styleUrls: ['./add-menu-type.component.css']
})


export class AddMenuTypeComponent {
  menu_typeId: number = 0;
  addMenuTypeForm: FormGroup;


  constructor(private dataService:DataService,
    private route : ActivatedRoute,
     private router : Router,
      private fb: FormBuilder,
      
      ) {


//creating a form
   this.addMenuTypeForm = this.fb.group({
     menu_typeId: [0, [Validators.required]],
     name: ['', [Validators.required]] 
   })
 }

 ngOnInit(): void {}

 //code to add a new mmenu type
 addNewMenuType(){
  let menuType = new MenuTypes();
  menuType.name = this.addMenuTypeForm.value.name;

  this.dataService.AddMenuType(menuType).subscribe((add:any) =>{
    this.router.navigate(['/menu-types'])
  });
}


}
