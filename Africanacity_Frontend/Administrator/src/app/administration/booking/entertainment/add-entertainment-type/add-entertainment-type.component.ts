import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/service/data.Service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';
import { Entertainment_Type } from 'src/app/shared/entertainmentType';


@Component({
  selector: 'app-add-entertainment-type',
  templateUrl: './add-entertainment-type.component.html',
  styleUrls: ['./add-entertainment-type.component.css'],
  styles: [`
.message {
  padding: 10px;
  background-color: lightgray;
  margin-top: 10px;
}
`]
})
export class AddEntertainmentTypeComponent implements OnInit {
 
  constructor(private router: Router, private dialog: MatDialog, private snackBar: MatSnackBar, private dataService: DataService){}

  ngOnInit(): void {
    
  }

  entertainmentform : FormGroup = new FormGroup({
    name: new FormControl('',[Validators.required]),
    description: new FormControl('',[Validators.required])
    
  });

  cancel(){
    this.router.navigate(['/entertainment-types'])
  }

  onSubmit() {
    if (this.entertainmentform.invalid) {
      return;
    }
  
    let entertainmentType = new Entertainment_Type();
    entertainmentType.name= this.entertainmentform.value.name;
    entertainmentType.description = this.entertainmentform.value.description;
  
  
    this.dataService.AddEntertainmentType(entertainmentType).subscribe(result => {
      this.router.navigate(['/entertainment-types'])
    });

    this.snackBar.open(
      this.entertainmentform.get('name')!.value + ` created successfully`,
      'X',
      { duration: 5000 }
    );
  }
}
