import {Component, OnInit } from "@angular/core";
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css', '../app.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  isTattooist: boolean = false;

  constructor(private formBuilder: FormBuilder){
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
    this.isTattooist = !this.isTattooist;
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
