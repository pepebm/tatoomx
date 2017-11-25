import {Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";

@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']

})
export class LoginComponent implements OnInit {
  myForm: Formgroup;

  onSubmit(){
    if(this.myForm.valid){
      console.log(this.myForm.controls.username._value + " " + this.myForm.controls.password._value);
    }
  }
  ngOnInit(){
    this.myForm = new FormGroup({
      username: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required)
    });

  }
}
