import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { WordService } from './word.service';

function getWord(letters) {
  let wordOnTab = [];

  for(let wd of letters) {
    wordOnTab.push(wd.value);
  }
  return wordOnTab.join('');
}

describe('WordService', () => {
  let service: WordService;
  let httpMock: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule],
      providers: [WordService]
    });

    service = TestBed.get(WordService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Should retrieve words from API via GET', () => {
    const dumpWords: string[] = [ "immobilier", "web", "marketing" ];

    service.getWords().subscribe(words => {
      expect(words.length).toBe(3);
      expect(words).toEqual(dumpWords);
    });
    
    const call = httpMock.expectOne(`${service.BASE_URL}`);
    expect(call.request.method).toBe('GET');
    expect(call.request.url).toBe('assets/data/words.json');
    call.flush(dumpWords);
  });

  it('Get secret word', () => {
    const dumpWords: string[] = [ "immobilier", "web", "marketing" ];

    service.getWords().subscribe(words => {
      const myWord = getWord(service.getSecretWord(words));
      expect(dumpWords).toContain(myWord);
    });
    
    const call = httpMock.expectOne(`${service.BASE_URL}`);
    expect(call.request.method).toBe('GET');
    expect(call.request.url).toBe('assets/data/words.json');
    call.flush(dumpWords);
  });
});
