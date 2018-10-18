import { Injectable, Inject } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from "angularfire2/database";
import { Observable } from 'rxjs';
import { Game } from '../models/game.model.ts'

@Injectable()
export class gamesService {
  constructor(private db: AngularFireDatabase) {
  }
  public getgames(): Observable<Game[]> {
    return this.db.list('/Games').valueChanges() as Observable<Game[]>;
  }
  public insertgame() {


    // db: AngularFireDatabase
    const itemRef = this.db.list('items');

    // set() for destructive updates
    itemRef.push({ name: 'javasampleapproach' });
    console.log("ITEM INSERTED");
  }
  public updategame() {
    // set(): destructive update
    // delete everything currently in place, then save the new value
    //let itemsRefa = this.db.list('items'); // db: AngularFireDatabase
    //itemsRefa.set('key', { url: 'jsa.com' });

    // update(): non-destructive update
    // only updates the values specified
    let itemsRef = this.db.list('items'); // db: AngularFireDatabase
    itemsRef.update('key', { url: 'javasampleapp.com' });
    console.log("ITEM UPDATED");
  }
  public deletegame() {
    // db: AngularFireDatabase
    const itemsRef = this.db.list('items');
    itemsRef.remove('key');

    // delete entire list
    //itemsRef.remove();
    console.log("ITEM DELETED");
  }
}
