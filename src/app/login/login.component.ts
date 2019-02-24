import { Component, OnInit,EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @Output()
  public loggedIn = new EventEmitter<string>();
  private showModal: boolean;
  private isAnimate: boolean;
  private pseudo: string = '';

  constructor() { }

  ngOnInit() {
    this.showModal = true;
    setTimeout(() => this.isAnimate = true, 100);
  }

  savePseudo() {
    console.log(this.pseudo);
    this.showModal = false;
    this.loggedIn.emit(this.pseudo);
  }

}
