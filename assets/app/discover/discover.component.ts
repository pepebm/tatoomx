import {Component, OnInit } from "@angular/core";
import { SessionService } from '../providers/session-service';
import { ImagesService } from '../providers/images-service';

@Component({
  selector: 'discover',
  templateUrl: './discover.component.html',
  styleUrls: ['./discover.component.css', '../app.component.css']
})
export class DiscoverComponent {
	constructor(private sessionService: SessionService, private imagesService: ImagesService){
		this.getImages();
	}

	getImages(){
		this.imagesService.getAll().subscribe(
			data => {
				console.log(data);
			},
			err => {
				console.log(err);
			}
		);
	}
}
