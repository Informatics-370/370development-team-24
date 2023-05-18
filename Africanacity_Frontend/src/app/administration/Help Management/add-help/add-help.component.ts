import { Component } from '@angular/core';

@Component({
  selector: 'app-add-help',
  templateUrl: './add-help.component.html',
  styleUrls: ['./add-help.component.css']
})
export class AddHelpComponent {
  password: string = '';
  showPassword: boolean = false;

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

}
