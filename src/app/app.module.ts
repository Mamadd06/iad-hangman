import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { WordService } from './services/word.service';
import { PenduComponent } from './pendu/pendu.component';
import { GameOverComponent } from './game-over/game-over.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PenduComponent,
    GameOverComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  bootstrap: [AppComponent],
  providers: [WordService]
})
export class AppModule { }
