import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from '../../../service/employee.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Help } from '../../../shared/help';

@Component({
  selector: 'app-add-help',
  templateUrl: './add-help.component.html',
  styleUrls: ['./add-help.component.css'],
  template: `
  <input type="text" [(ngModel)]="email" name="email" placeholder="Email" required>
  <button (click)="checkEmail()">Check Email</button>

  <div *ngIf="message" class="message">
    {{ message }}
  </div>
`,
styles: [`
.message {
  padding: 10px;
  background-color: lightgray;
  margin-top: 10px;
}
`]

})

export class AddHelpComponent {
  email!: string;
  message!: string;

  constructor(private employeeservice: EmployeeService, private router: Router) { }

  helpForm: FormGroup = new FormGroup({
    name: new FormControl('',[Validators.required]),
    description: new FormControl('',[Validators.required]),
 
  })

  //EmailVerification

  checkEmail() {
    this.employeeservice.checkEmail(this.email).subscribe(
      (response) => {
        this.message = response.message;
      },
      (error) => {
        console.error('Error checking email:', error);
      }
    );
  }

 ngOnInit(): void {
 
 }
 Category: string[] = ['Restaurant', 'Entertainment', 'Login'];

 cancel(){
   this.router.navigate(['/home'])
 }

    onSubmit(){

     let help = new Help();
     help.name = this.helpForm.value.name;
     help.description = this.helpForm.value.description;
     help.categoryName = this.helpForm.value.categoryName;
         this.employeeservice.AddHelp(help).subscribe(result => {
               this.router.navigate(['/view-help-list'])
         })
 
  this.employeeservice.AddHelp(help).subscribe((res:any) => {

   if(res.statusCode == 200)
   {
     this.router.navigate(['view-help-list'])
   }
   else
   {
     alert(res.message);
   }
  });
      }

}
