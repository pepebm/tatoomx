import {Component, OnInit, Injectable } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { TattooistsService } from '../providers/tattooists-service';

@Component({
  selector: 'artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.css', '../app.component.css']
})
export class ArtistComponent {

  artists: any;
  independant: any = [];
  studio: any = [];
  constructor(private artistsService: TattooistsService){
    this.artistsService.getAll().subscribe(
      data => {
        //console.log(data);
        if(data.status >= 2){
          console.log("Error");
        }
        else {
          this.artists = data.data;

          console.log(data.data);
          console.log(this.artists);
          for(let i = 0; i < this.artists.length; i++){
            if(this.artists[i].studioId){
              this.studio.push(this.artists[i]);
            } else{
              this.independant.push(this.artists[i]);
            }
          }
        }
      },
      error => {
        console.log(error);
      }
    );
  }


}
