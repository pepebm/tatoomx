import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from "./app.component";
import {FormsModule} from "@angular/forms";
import { routing } from './app.routing';

import { MessageComponent } from "./message/message.component";
import { LoginComponent } from "./login/login.component";


@NgModule({
    declarations: [
        AppComponent,
        MessageComponent,
        LoginComponent
    ],
    imports: [BrowserModule, FormsModule, routing],
    bootstrap: [AppComponent]
})
export class AppModule {

}
