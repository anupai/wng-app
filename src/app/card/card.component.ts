import { Component, OnInit, Input } from '@angular/core';
import { CardsService } from '../services/cards.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  @Input() card;
  @Input() showimg;
  constructor(private cardService:CardsService) { }

  ngOnInit() {
  }

  toggleStatus(){
    this.card.status = this.card.status == 'active' ? 'inactive' : 'active';
    this.cardService.deactivateCard(this.card.id, this.card.status);
  }

}
