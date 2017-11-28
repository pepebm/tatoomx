import { Routes, RouterModule } from "@angular/router";

import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { HomeComponent } from "./home/home.component";
import { DiscoverComponent } from './discover/discover.component';
import { ArtistComponent } from './artist/artist.component';
import { StudioComponent } from './studio/studio.component';
import { ProfileComponent } from './profile/profile.component';

const APP_ROUTES: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent },
  { path: 'discover', component: DiscoverComponent },
  { path: 'artist', component: ArtistComponent },
  { path: 'studio', component: StudioComponent },
  { path: 'profile', component: ProfileComponent }
];

export const routing = RouterModule.forRoot(APP_ROUTES);
