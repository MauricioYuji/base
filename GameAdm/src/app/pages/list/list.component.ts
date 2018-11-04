import { Component } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from "angularfire2/database";
import { Observable } from 'rxjs';
import { Game } from '../../models/game.model.ts'
import { gamesService } from '../../services/gamesService'


@Component({
  selector: 'list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent {
  title = 'GameAdm';
  public games: Observable<Game[]>;
  //public games: AngularFireList<Game[]>;
  constructor(db: AngularFireDatabase, private service: gamesService) {

    this.games = this.service.getgames();
    //this.service.insertgame();
    //this.service.updategame();
    //this.service.deletegame();
    //console.log("db", this.games);
    //this.games.subscribe(snapshots => {
    //  console.log(snapshots);
    //  this.list = snapshots as Game[];
    //});
  }
}
