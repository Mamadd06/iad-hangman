import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Letter } from '../services/word.service';

@Component({
  selector: 'app-game-over',
  templateUrl: './game-over.component.html',
  styleUrls: ['./game-over.component.css']
})
export class GameOverComponent implements OnInit {

  @Output()
  public retry = new EventEmitter<string>();

  @Input()
  public gameOverResult: { value: boolean, isAllGuessed: boolean, word?: Letter[]};
  private showModal: boolean;
  private isAnimate: boolean;
  private bgImg: string;
  private word: string;

  constructor() { }

  ngOnInit() {
    this.showModal = true;
    setTimeout(() => this.isAnimate = true, 100);
    console.log('gameOver=====dans GO=======>', this.gameOverResult);
    this.bgImg = this.gameOverResult.isAllGuessed ? 'winnner.gif' : 'loser-1.gif';
    this.word = this.getWord();
  }

  public hideModelByClickedContainer(event: MouseEvent): void {
    if ((<HTMLElement>event.target).classList.contains('modal')) {
      this.hide();
    }
  }

  public hide(): void {
    this.isAnimate = false;
    setTimeout(() => 
    { 
      this.showModal = false;
      this.retry.emit();
    }, 300);
  }
  
  getWord() {
    let wordOnTab = [];
    if (!this.gameOverResult.word) {
      return '';
    }

    for(let wd of this.gameOverResult.word) {
      wordOnTab.push(wd.value);
    }
    return wordOnTab.join('');
  }
}
