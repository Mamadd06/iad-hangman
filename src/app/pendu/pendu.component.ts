import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-pendu',
  templateUrl: './pendu.component.html',
  styleUrls: ['./pendu.component.css']
})
export class PenduComponent implements OnInit {

  // assets/images/Hangman-0.png
  @Input()
  src: string;
  
  constructor() { }

  ngOnInit() {
    console.log('src===========================>', this.src);
  }

}
