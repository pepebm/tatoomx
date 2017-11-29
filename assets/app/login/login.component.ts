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
      console.log(this.myForm.controls.type.value)
      this.sessionService.login(this.myForm.controls.mail.value,this.myForm.controls.password.value,(this.myForm.controls.type.value ? 'tattooist' : 'person')).subscribe(
        data => {
          console.log(this.sessionService.getSession());
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
      mail: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
      type: new FormControl(false, Validators.required)
    });
  }
}
