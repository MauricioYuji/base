import { Component } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from "angularfire2/database";
import { Observable } from 'rxjs';
class Game {
  constructor(public nome) { }
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'GameAdm';
  public games: Observable<{}[]>;
  //public games: AngularFireList<Game[]>;
  constructor(db: AngularFireDatabase) {
    this.games = db.list('/Games').valueChanges();
    console.log("db", this.games);
  }
}
