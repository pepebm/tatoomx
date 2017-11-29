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

	liked(id){
		this.peopleService.likeImage(id).subscribe(
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
	disliked(id){
		this.peopleService.dislikeImage(id).subscribe(
			data => {
				if(data.status >= 2){
					console.log("Error");
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
