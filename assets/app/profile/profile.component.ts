import {Component, OnInit } from "@angular/core";
import {FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css', '../app.component.css']
})
export class ProfileComponent {
  currentUser: any;
  registerForm: FormGroup;
  images: any[] = [
    {
      "src": "http://www.menstattooideas.net/tattooimages/2014/07/skull-tattoo-for-men.jpg"
    },
    {
      "src": "http://nextluxury.com/wp-content/uploads/small-tattoo-designs-for-men.jpg"
    },
    {
      "src": "https://i.pinimg.com/736x/63/cc/57/63cc57b9861fde527b6b6f4c6ea771a6--coolest-tattoo-forest-tattoos.jpg"
    },
    {
      "src": "http://nextluxury.com/wp-content/uploads/ring-finger-tattoo-designs-for-men-of-deer.jpg"
    },
    {
      "src": "http://trendy-tattoos.com/wp-content/uploads/2016/10/5ef1737744e48cee5606e1fcf992ded1.jpg"
    }
  ];
  studios: any[] = [
    {
      "src": "http://www.alexramonmas.com/wp-content/uploads/2014/10/AZTOON-LOGO-ARM3d.jpg"
    },
    {
      "src": "https://i.pinimg.com/736x/59/d1/f6/59d1f69a7e261295f7d1fa5dab602fee--studio-logo-tattoo-studio.jpg"
    },
    {
      "src": "https://logopond.com/logos/5188cb9649b0d6236bdd2f47938069b3.png"
    },
    {
      "src": "http://www.tattoomafiaindia.com/images/logo.png"
    },
    {
      "src": "https://www.dumagueteinfo.com/wp-content/uploads/2016/01/72abc67c6fadaaafb0dc0771bb2ae640.jpg"
    }
  ];

  temp = this.images.slice(0,4);
  temp_studios = this.studios.slice(0,4);
  image: any;

  constructor(private formBuilder: FormBuilder){
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.editForm = this.formBuilder.group({
        password:['', Validators.required],
        passwordConfirm:['', Validators.required]
    });
  }

  showMore() {
    console.log('show more');
    this.temp = this.images;
  }
  showLess() {
    this.temp = this.images.slice(0,4);
  }

  showMoreStudios() {
    console.log('show more');
    this.temp_studios = this.studios;
  }
  showLessStudios() {
    this.temp_studios = this.studios.slice(0,4);
  }

  /*
<input type="file" name="imageupload" id="file" accept="image/*" (change)="filehandler($event)">
<button type="button" name="uploadimage" (click)="uploadimage()">Upload</button>
*/

  filehandler(event){
    var selectedFile = event.target.files[0];
    var reader = new FileReader();
    reader.onload = ((theFile) => {
      return (e) => {
        this.image = e.target.result;
      };
    })(selectedFile);
    reader.readAsDataURL(selectedFile);
  }

  uploadimage(){
    this.imagesService.addImage(this.image).subscribe(
      data => {
        console.log(data);
        // IF data.status == 0 success ELSEIF data.status == 2 fail
      },
      e=> {
        console.log(e);
      }
    );
  }
}
