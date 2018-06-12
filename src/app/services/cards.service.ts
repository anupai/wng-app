import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Card } from '../card';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CardsService {
  cards: Card[] = [{
    id: 1,
    url: '',
    status: 'inactive'
  }, {
    id: 2,
    url: '',
    status: 'inactive'
  }, {
    id: 3,
    url: '',
    status: 'inactive'
  }, {
    id: 4,
    url: '',
    status: 'inactive'
  }];
  cardChange = new Subject<Card[]>();

  private imageUrl = '/image/api/cats?';

  constructor(private http: HttpClient) { }

  getCards() {
    this.cardChange.next(this.cards);
    return this.cardChange.asObservable();
  }

  deactivateCard(id, status) {
    for (let i = 0; i < this.cards.length; i++) {
      if (this.cards[i].id == id)
        this.cards[i].status = status;
      else
        this.cards[i].status = 'inactive';
    }
  }

  getCardImage() {
    this.fetchImage(`${this.imageUrl}count=${this.cards.length}&urls=true&httpsUrls=false`).subscribe(
      (data: any) => {
        if (data.length > 0)
          for (let i = 0; i < this.cards.length; i++) {
            this.cards[i].url = data[i];
          }
      },
      (error)=>{
        this.errorHandling(error);
      }
    )
  }
  addCard(){
    this.fetchImage(`${this.imageUrl}count=1&urls=true&httpsUrls=false`).subscribe(
      (data:any) => {
        if(data.length > 0)
          this.cards.push({
            id: this.cards.length+1,
            url: data[0],
            status: 'inactive'
          })
      }
    );
  }

  private errorHandling(error) {
    console.log('error occured while fetching: ',error);
  }

  private fetchImage(url) {
    return this.http.get(url);
  }
}
