import {Component, OnInit } from "@angular/core";
import { SessionService } from '../providers/session-service';
import { ImagesService } from '../providers/images-service';
import { PeopleService } from '../providers/people-service';

@Component({
  selector: 'discover',
  templateUrl: './discover.component.html',
  styleUrls: ['./discover.component.css', '../app.component.css']
})
export class DiscoverComponent {
	currentUser: any;
  images: any = [];
	constructor(private sessionService: SessionService, private imagesService: ImagesService, private peopleService: PeopleService){
		this.getImages();
		this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
		console.log(this.currentUser);
		//console.log(this.sessionService.getSession());
	}

	getImages(){
		this.imagesService.getAll().subscribe(
			data => {
				this.images = data.data;
			},
			err => {
				console.log(err);
			}
		);
	}

	liked(image){
		this.peopleService.likeImage(image.id).subscribe(
			data => {
				if(data.status >= 2){
					console.log("Error");
				} else {
					image.liked = true;
					console.log(data);
				}
			},
			error => {
				console.log(error);
			}
		);
	}
	disliked(image){
		this.peopleService.dislikeImage(image.id).subscribe(
			data => {
				if(data.status >= 2){
					console.log("Error");
				} else {
					image.liked = false;
					console.log(data);
				}
			},
			error => {
				console.log(error)
			}
		);
	}
}
