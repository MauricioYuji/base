import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Input } from '@angular/core';
import { Game } from '../../models/game.model.ts'


@Component({
  selector: 'card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input() myData: string;
  constructor() {
  }
  ngOnInit(): void {
    //console.log(this.myData);
  }
}
