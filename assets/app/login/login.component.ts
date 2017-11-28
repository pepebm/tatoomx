import {Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { SessionService } from '../providers/session-service';

@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css', '../app.component.css']

})
export class LoginComponent implements OnInit {
  myForm: Formgroup;

  constructor(private sessionService: SessionService){

  }

  onSubmit(){
    if(this.myForm.valid){
      this.sessionService.login(this.myForm.controls.username.value,this.myForm.controls.password.value,'tattooist').subscribe(
        data => {
          if(data){

          }
          else{
            //CANT LOGGIN
          }
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
