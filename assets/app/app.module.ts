import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { HttpModule } from "@angular/http";
import { AppComponent } from "./app.component";
import { routing } from './app.routing';
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from './register/register.component';
import { SessionService } from './providers/session-service';
import { HomeComponent } from './home/home.component';
import { DiscoverComponent } from './discover/discover.component';
import { ArtistComponent } from './artist/artist.component';
import { StudioComponent } from './studio/studio.component';
import { ProfileComponent } from './profile/profile.component';
import { ImagesService } from './providers/images-service';
import { TattooistsService } from './providers/tattooists-service';
import { PeopleService } from './providers/people-service';
import { StudiosService } from './providers/studios-service';

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        RegisterComponent,
        HomeComponent,
        DiscoverComponent,
        ArtistComponent,
        StudioComponent,
        ProfileComponent
    ],
    imports: [
      BrowserModule,
      FormsModule,
      ReactiveFormsModule,
      routing,
      AngularFontAwesomeModule,
      HttpModule
    ],
    providers: [
      SessionService,
      ImagesService,
      TattooistsService,
      PeopleService,
      StudiosService
    ]
    bootstrap: [AppComponent]
})
export class AppModule {

}
