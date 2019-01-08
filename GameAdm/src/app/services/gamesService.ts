import { Injectable, Inject } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from "angularfire2/database";
import { Observable } from 'rxjs';
import { Game } from '../models/game.model'
import { map } from 'rxjs/operators';

@Injectable()
export class gamesService {
  private basePath = '/Games';
  constructor(private db: AngularFireDatabase) {
  }
  public getAll(): Observable<Game[]> {

    var obj = this.db.list(this.basePath, ref =>
      ref).snapshotChanges().pipe(
        map(changes =>
          changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
        )
    );
    return obj as Observable<Game[]>;
  }

  public insert(obj: Game) {
    const itemRef = this.db.list(this.basePath);
    itemRef.push(obj);
  }
  public update(key: string, value: Game) {
    let itemsRef = this.db.list(this.basePath); 
    delete value["key"];
    itemsRef.update(key, value);
  }
  public delete(key: string) {
    const itemsRef = this.db.list(this.basePath);
    itemsRef.remove(key);
  }
}
