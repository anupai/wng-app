import { Component, OnInit } from '@angular/core';
import { Card } from '../card';
import { CardsService } from '../services/cards.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  cards: Card[] ;
  showImg: boolean = false;
  constructor(private cardsService:CardsService) { }

  ngOnInit() {
    this.cards = this.cardsService.cards;
    this.cardsService.getCardImage();
  }

  showImage() {
    this.showImg = true;
  }

  addCard() {
    this.cardsService.addCard();
  }

}
