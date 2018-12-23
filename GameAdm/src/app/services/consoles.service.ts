import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from "angularfire2/database";
import { Observable } from 'rxjs';
import { Console } from '../models/consoles.model'

@Injectable({
  providedIn: 'root'
})
export class ConsolesService {
  
  constructor(private db: AngularFireDatabase) {
  }
  public getConsoles(): Observable<Console[]> {
    return this.db.list('/Consoles').valueChanges() as Observable<Console[]>;
  }
  public insertConsole(nome: string) {


    // db: AngularFireDatabase
    const itemRef = this.db.list('Consoles');

    // set() for destructive updates
    itemRef.push({ name: nome });
    console.log("ITEM INSERTED");
  }
  public updategame(key: string, value: string) {
    // set(): destructive update
    // delete everything currently in place, then save the new value
    //let itemsRefa = this.db.list('items'); // db: AngularFireDatabase
    //itemsRefa.set('key', { url: 'jsa.com' });

    // update(): non-destructive update
    // only updates the values specified
    let itemsRef = this.db.list('Consoles'); // db: AngularFireDatabase
    itemsRef.update(key, { name: value });
    console.log("ITEM UPDATED");
  }
  public deletegame(key: string) {
    // db: AngularFireDatabase
    const itemsRef = this.db.list('items');
    itemsRef.remove(key);

    // delete entire list
    //itemsRef.remove();
    console.log("ITEM DELETED");
  }
}
