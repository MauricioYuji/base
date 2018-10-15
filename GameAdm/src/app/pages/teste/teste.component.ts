import { Component } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from "angularfire2/database";
import { Observable } from 'rxjs';
import { Game } from '../../models/game.model.ts'
import { CardComponent } from '../../components/card/card.component'


@Component({
  selector: 'teste',
  templateUrl: './teste.component.html',
  styleUrls: ['./teste.component.scss']
})
export class TesteComponent {
  title = 'GameAdm';
  public games: Observable<Game[]>;
  public list: Game[];
  //public games: AngularFireList<Game[]>;
  constructor(db: AngularFireDatabase) {
    this.games = db.list('/Games').valueChanges() as Observable<Game[]>;
    //console.log("db", this.games);
    //this.games.subscribe(snapshots => {
    //  console.log(snapshots);
    //  this.list = snapshots as Game[];
    //});
  }
}
