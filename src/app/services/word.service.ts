import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface Letter {
  value: string,
  isGuess: boolean
}

const LETTERS_LINE_1: string[] = ['a', 'b', 'c', 'd', 'e', 'f','g']
const LETTERS_LINE_2: string[] = ['h', 'i', 'j', 'k', 'l', 'm', 'n']
const LETTERS_LINE_3: string[] = ['o', 'p', 'q', 'r','s', 't'];
const LETTERS_LINE_4: string[] = ['u', 'v', 'w', 'x', 'y', 'z'];
export const LETTERS = [LETTERS_LINE_1, LETTERS_LINE_2, LETTERS_LINE_3, LETTERS_LINE_4];

@Injectable()
export class WordService {

  public BASE_URL = 'assets/data/words.json';

  constructor(private http: HttpClient) { }

  getWords() {
    return this.http.get<string[]>(this.BASE_URL);
  }

  getSecretWord(list: string[]): Letter[] {
    const word = list[Math.floor(Math.random() * list.length)];
    return this.makeSecretWord(word.split(''));
  }

  makeSecretWord(list: string[]): Letter[] {
    const secretWord = [];
    for(let letter of list) {
      secretWord.push({value: letter, isGuess: false });
    }
    return secretWord;
  }
}
