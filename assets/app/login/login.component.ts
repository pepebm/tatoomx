import {Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { LoginService } from '../providers/login-service';

@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']

})
export class LoginComponent implements OnInit {
  myForm: Formgroup;

  constructor(private loginService: LoginService){

  }

  onSubmit(){
    if(this.myForm.valid){
      this.loginService.login(this.myForm.controls.username.value,this.myForm.controls.password.value,'tattooist').subscribe(
        data => {
          console.log(this.loginService.getSession());
        },
        err=>{
          console.log(err);
        }
      );
    }
  }

  ngOnInit(){
    this.myForm = new FormGroup({
      username: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required)
    });
  }
}
