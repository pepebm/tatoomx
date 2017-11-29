import {Component, OnInit } from "@angular/core";
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { TattooistsService } from '../providers/tattooists-service';
import { PeopleService } from '../providers/people-service';
import { Router } from '@angular/router';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css', '../app.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  isTattooist: boolean = false;

  constructor(private formBuilder: FormBuilder, private tattooistService: TattooistsService, private peopleService: PeopleService, private router: Router){
    this.registerForm = this.formBuilder.group({
        name:['',
          Validators.compose([
            Validators.required,
            Validators.pattern('[a-zA-Z]*')
          ])
        ],
        email:['',
          Validators.compose([
            Validators.required,
            Validators.pattern('^[a-zA-Z0-9._-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,6}')
          ])
        ],
        city:['',
          Validators.compose([
            Validators.required,
            Validators.pattern('[a-zA-Z]*')
          ])
        ],
        sex:['', Validators.required],
        phone:['',
          Validators.compose([
            Validators.required,
            Validators.pattern('[0-9- ]{8,22}$')
          ])
        ],
        password:['', Validators.required],
        passwordConfirm:['', Validators.required]
    });
  }

  onSubmit(){
    if(this.registerForm.valid && this.registerForm.controls.password.value == this.registerForm.controls.passwordConfirm.value) {
      if(this.isTattooist){
        this.tattooistService.create({
                                  name: this.registerForm.controls.name.value,
                                  mail: this.registerForm.controls.email.value,
                                  city: this.registerForm.controls.city.value,
                                  gender: this.registerForm.controls.sex.value,
                                  phone: this.registerForm.controls.phone.value,
                                  password: this.registerForm.controls.password.value,
                                  }).subscribe(
          data => {
            if(data.status >= 2) { console.log(data.message); }
            else {
              console.log(data)
              this.router.navigate(['login']);
            }
          },
          error => {
            console.log(error)
          }
        );
      } else {
        this.peopleService.create({
                                  name: this.registerForm.controls.name.value,
                                  mail: this.registerForm.controls.email.value,
                                  city: this.registerForm.controls.city.value,
                                  gender: this.registerForm.controls.sex.value,
                                  password: this.registerForm.controls.password.value,
                                  }).subscribe(
          data => {
            if(data.status >= 2) { console.log("Error"); }
            else {
              console.log(data)
            }
          },
          error => {
            console.log(error)
          }
        );
      }
    }

  }

  toggle(state){
    this.isTattooist = state;
  }
  ngonInit(){
    this.myForm = new FormGroup({
      username: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
      cpassword: new FormControl(null, Validators.required),
      email: new FormControl(null, Validators.required)
    });
  }
}
