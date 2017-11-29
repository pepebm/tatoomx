import {Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { StudiosService } from '../providers/studios-service';
import { SessionService } from '../providers/session-service';

@Component({
  selector: 'studio',
  templateUrl: './studio.component.html',
  styleUrls: ['./studio.component.css', '../app.component.css']
})
export class StudioComponent {
  studios: any = [];
  artists: any = []:
  constructor(private sessionService: SessionService, private studioService: StudiosService){
    console.log(this.sessionService.getSession());
    this.studioService.getAll().subscribe(
      data => {
        if(data.status >= 2){
          console.log("Error");
          console.log(data);
        } else {
          this.studios = data.data;
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  getArtists(id){
    this.studioService.getTattooists().subscribe(
      data => {
        if(data.status >= 2){
          console.log("Error");
        } else {
          this.artists = data.data;
        }
      },
      error => {
        console.log(error);
      }
    );
  }

}
