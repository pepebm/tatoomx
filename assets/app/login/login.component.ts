import {Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { SessionService } from '../providers/session-service';
import { Router } from '@angular/router';
import {LocalStorage, SessionStorage} from "angular2-localstorage/WebStorage";
import { ImagesService } from '../providers/images-service';

@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css', '../app.component.css']

})
export class LoginComponent implements OnInit {
  myForm: Formgroup;

  constructor(private sessionService: SessionService, private router: Router, private imagesService: ImagesService){

  }
  @LocalStorage() public username:string = '';
  onSubmit(){
    if(this.myForm.valid){
      this.sessionService.login(this.myForm.controls.mail.value,this.myForm.controls.password.value,(this.myForm.controls.type.value ? 'tattooist' : 'person')).subscribe(
        data => {
          if(data.data){

            this.router.navigate(['discover']);
          }
          else{
            // OPEN MODAL, modal text = data.err
            console.log(data.err);
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
