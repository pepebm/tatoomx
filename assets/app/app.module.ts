import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { HttpModule } from "@angular/http";
import { AppComponent } from "./app.component";
import { routing } from './app.routing';
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from './register/register.component';
import { LoginService } from './providers/login-service';
import { HomeComponent } from './home/home.component';
import { DiscoverComponent } from './discover/discover.component';
import { ArtistComponent } from './artist/artist.component';
import { StudioComponent } from './studio/studio.component';
import { ProfileComponent } from './profile/profile.component';

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
      LoginService
    ]
    bootstrap: [AppComponent]
})
export class AppModule {

}
