import {Component, OnInit, Injectable } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { TattooistsService } from '../providers/tattooists-service';
import { SessionService } from '../providers/session-service';
import { PeopleService } from '../providers/people-service';
@Component({
  selector: 'artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.css', '../app.component.css']
})

export class ArtistComponent {
  currentUser: any;
  artists: any;
  independent: any = [];
  studio: any = [];
  image: any = [];
  constructor(private sessionService: SessionService, private artistsService: TattooistsService, private peopleService: PeopleService){
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));

    this.artistsService.getAll().subscribe(
      data => {
        //console.log(data);
        if(data.status >= 2){
        }
        else {
          this.artists = data.data;

          console.log(data.data);
          console.log(this.artists);
          for(let i = 0; i < this.artists.length; i++){
            if(this.artists[i].studioId){
              this.studio.push(this.artists[i]);
            } else{
              this.independent.push(this.artists[i]);
            }
          }
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  loadImages(id){
    this.artistsService.getImages(id).subscribe(
      data => {
        if(data.status >= 2){
          console.log("Error");
        } else {
          this.image = data.data
          console.log(this.image);
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  liked(artist){

    artist.liked = true;
		this.peopleService.likeTattooist(artist.id).subscribe(
			data => {
				if(data.status >= 2){
					console.log("Error");
				} else {
					console.log(data);
				}
			},
			error => {
				console.log(error);
			}
		);
	}
	disliked(artist){
    artist.liked = false;
		this.peopleService.dislikeTattooist(artist.id).subscribe(
			data => {
				if(data.status >= 2){
					console.log(data);
				} else {
					console.log(data);
				}
			},
			error => {
				console.log(error)
			}
		);
	}

}
