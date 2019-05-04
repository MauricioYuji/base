import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from "angularfire2/database";
import { Observable } from 'rxjs';
import { Genre } from '../models/genres.model'
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GenresService {

  private basePath = '/Genres';
  constructor(private db: AngularFireDatabase) {
  }


  public getAll(): Observable<any> {

    return this.db.list(this.basePath, ref =>
      ref).snapshotChanges().pipe(
        map(changes =>
          changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
        )
      );
  }

  public getbykey(key: string): Observable<Genre> {
    return this.db.object(this.basePath + "/" + key).valueChanges() as Observable<Genre>;
  }

  public insert(obj: Genre) {
    const itemRef = this.db.list(this.basePath);
    itemRef.push(obj);
  }
  public update(key: string, value: Genre) {
    let itemsRef = this.db.list(this.basePath); 
    delete value["key"];
    itemsRef.update(key, value);
  }
  public delete(key: string) {
    const itemsRef = this.db.list(this.basePath);
    itemsRef.remove(key);
  }


  
}
