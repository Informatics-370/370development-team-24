import { Component, OnInit} from '@angular/core';
import { DataService } from 'src/app/service/data.Service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuTypes } from 'src/app/shared/menu-types';


@Component({
  selector: 'app-edit-menu-type',
  templateUrl: './edit-menu-type.component.html',
  styleUrls: ['./edit-menu-type.component.css']
})
export class EditMenuTypeComponent implements OnInit{

  // menu_TypeId!: number;
 

  constructor(private dataService:DataService, private activated:ActivatedRoute,  private router : Router,) { }

  MenuTypes: MenuTypes = new MenuTypes();

  //the form
  //ensure all edit  forms are filled in
 

  editMenuTypeForm: FormGroup = new FormGroup({
    name: new FormControl('',[Validators.required])
  })



   ngOnInit(): void {

    this.activated.params.subscribe(params => { 
      this.dataService.GetMenuTypeById(params['id']).subscribe(edit => { 
        this.MenuTypes = edit as MenuTypes;
       this.editMenuTypeForm.controls['name'].setValue(this.MenuTypes.name);
      })
 
     })
  }


  /*after submission of edit*/
  editMenuType()
  {
    let menuType = new MenuTypes();
    menuType.name = this.editMenuTypeForm.value.name;
   this.dataService.EditMenuType(this.MenuTypes.menu_TypeId,menuType).subscribe((edit:any) => {

      this.router.navigate(['/menu-types'])
    
    
   });

  }

}
