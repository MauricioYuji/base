import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from "angularfire2/database";
import { Observable } from 'rxjs';
import { Company } from '../models/companies.model'

@Injectable({
  providedIn: 'root'
})
export class CompaniesService {

  constructor(private db: AngularFireDatabase) {
  }
  public getCompanies(): Observable<Company[]> {
    return this.db.list('/Companies').valueChanges() as Observable<Company[]>;
  }
  public insertConsole(nome: string) {


    // db: AngularFireDatabase
    const itemRef = this.db.list('Companies');

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
    let itemsRef = this.db.list('Companies'); // db: AngularFireDatabase
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
