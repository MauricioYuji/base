import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from "angularfire2/database";
import { Observable } from 'rxjs';
import { Company } from '../models/companies.model'
import { map } from 'rxjs/operators';
import { extend } from 'webdriver-js-extender';

@Injectable({
  providedIn: 'root'
})
export class CompaniesService {

  private basePath = '/Companies';
  constructor(private db: AngularFireDatabase) {
  }
  //public getCompanies(): Observable<Company[]> {
  //  return this.db.list('/Companies').valueChanges() as Observable<Company[]>;
  //}


  //public getCompanies(): AngularFireList<Company> {
  //  return this.db.list('/Companies', ref =>
  //    ref);
  //}

  public getAll(): Observable<any> {

    return this.db.list(this.basePath, ref =>
      ref).snapshotChanges().pipe(
        map(changes =>
          changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
        )
      );
  }

  public insert(obj: Company) {


    // db: AngularFireDatabase
    const itemRef = this.db.list(this.basePath);

    // set() for destructive updates
    itemRef.push(obj);
    //console.log("ITEM INSERTED");
  }
  public update(key: string, value: Company) {
    // set(): destructive update
    // delete everything currently in place, then save the new value
    //let itemsRefa = this.db.list('items'); // db: AngularFireDatabase
    //itemsRefa.set('key', { url: 'jsa.com' });

    // update(): non-destructive update
    // only updates the values specified
    let itemsRef = this.db.list(this.basePath); // db: AngularFireDatabase
    //itemsRef.update(key, { name: value });
    delete value["key"];
    //console.log("value: ", value);
    itemsRef.update(key, value);
    //console.log("ITEM UPDATED");
  }
  public delete(key: string) {
    // db: AngularFireDatabase

    console.log("key: ", key);
    if (key != "") {
      const itemsRef = this.db.list(this.basePath);
      itemsRef.remove(key);
    }

    // delete entire list
    //itemsRef.remove();
    //console.log("ITEM DELETED");
  }
}
