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


@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        RegisterComponent
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
