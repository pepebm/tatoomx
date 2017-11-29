import {Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { SessionService } from '../providers/session-service';
import { Router } from '@angular/router';

import { ImagesService } from '../providers/images-service';

@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css', '../app.component.css']

})
export class LoginComponent implements OnInit {
  myForm: Formgroup;
  image: any;

  constructor(private sessionService: SessionService, private router: Router, private imagesService: ImagesService){

  }

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

  hola(event){
    var selectedFile = event.target.files[0];
    var reader = new FileReader();
    reader.onload = (function(theFile) {
      return function(e) {
        // Render thumbnail.
        var span = document.createElement('span');
        span.innerHTML = ['<img class="thumb" src="', e.target.result,
                          '" title="', escape(theFile.name), '"/>'].join('');
        document.getElementById('list').insertBefore(span, null);
      };
    })(f);

    // Read in the image file as a data URL.
    reader.readAsDataURL(f);
    console.log(selectedFile);
    reader.readAsDataURL(selectedFile);
  }

  uploadimage(){

    this.imagesService.addImage(this.image).subscribe(
      data => {
        console.log(data);
      },
      e=> {
        console.log(e);
      }
    );
  }
}
