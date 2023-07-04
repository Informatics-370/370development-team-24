import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { UserStoreService } from 'src/app/services/user-store.service';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.scss']
})
export class UpdateProfileComponent implements OnInit {

  public users:any = [];
  public role!:string;
  public updateForm!: FormGroup;

  public fullName : string = "";
  constructor(private api : ApiService, 
    private auth: AuthService, 
    private userStore: UserStoreService,
    private fb : FormBuilder, ) { }

  ngOnInit() {
    this.updateForm = this.fb.group({
      firstName:['', Validators.required],
      lastName:['', Validators.required],
      username:['', Validators.required],
      email:['', Validators.required],
      physicalAddress:['', Validators.required],
      contactNumber:['', Validators.required],
      password:['', Validators.required]
    });
    
    this.api.getUsers()
    .subscribe(res=>{
    this.users = res;
    });

    this.userStore.getFullNameFromStore()
    .subscribe(val=>{
      const fullNameFromToken = this.auth.getfullNameFromToken();
      this.fullName = val || fullNameFromToken
    });

    this.userStore.getRoleFromStore()
    .subscribe(val=>{
      const roleFromToken = this.auth.getRoleFromToken();
      this.role = val || roleFromToken;
    })
  }
  onSubmit() {
  }

  logout(){
    this.auth.signOut();
  }
}
