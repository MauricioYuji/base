import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Input } from '@angular/core';
import { Game } from '../../models/game.model.ts'


@Component({
  selector: 'card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {
  @Input() myData;
  constructor() {
    console.log(this.myData);
  }
}
