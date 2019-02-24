import { Component, OnInit } from '@angular/core';
import { WordService, Letter, LETTERS } from './services/word.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'app';
  secretWord: Letter[];
  username: string = '';
  valSaisie: string;
  nbEssais: number;
  letters: Array<Array<Letter>>;
  srcImage: string = '';
  baseSrcImage: string = 'assets/images/Hangman-';
  gameOver: {value: boolean, isAllGuessed: boolean, word?: Letter[]};

  constructor(private wordService: WordService) {}

  ngOnInit() {
    this.initGame();
  }

  getPseudo(pseudo) {
    this.username = pseudo;
  }

  initGame() {
    this.letters = [];
    this.secretWord = [];
    this.nbEssais = 6;
    this.srcImage = this.baseSrcImage + (this.nbEssais + 1) + '.png';
    this.gameOver =  {value: false, isAllGuessed: false };
    this.getAlphabet();
    this.wordService.getWords().subscribe(
      data => {
        this.secretWord = this.wordService.getSecretWord(data);
      }
    )
  }

  getAlphabet() {
    for(let item of LETTERS) {
      this.letters.push(this.wordService.makeSecretWord(item));
    }
  }

  try(letter){
    let isGuessed = false;
    for(let s of this.secretWord) {
      if (s.value === letter.value) {
        s.isGuess = true;
        isGuessed = true;
      }
    }

    if(!letter.isGuess && !isGuessed) {
      this.srcImage = this.baseSrcImage + this.nbEssais + '.png';
      this.nbEssais--;
    }
    if (this.nbEssais === 0) {
      this.gameOver = { value: true, isAllGuessed: false, word: this.secretWord };
    }
    letter.isGuess = true;

    this.gameOver.value =  this.gameOver.value || this.isAllGuessed();
  }

  isAllGuessed() {
    for(let s of this.secretWord) {
      if (s.isGuess === false) {
        return false;
      }
    }
    this.gameOver.isAllGuessed = true;
    return true;
  }
}
