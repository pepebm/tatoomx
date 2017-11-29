import {Component, OnInit, Injectable } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { TattooistsService } from '../providers/tattooists-service';

@Component({
  selector: 'artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.css', '../app.component.css']
})
export class ArtistComponent {

  artists: any[];
  constructor(private artistsService: TattooistsService){
    this.artistsService.getAll().subscribe(
      data => {
        console.log(data);
      },
      error => {
        console.log(error);
      }
    );
  }
}
