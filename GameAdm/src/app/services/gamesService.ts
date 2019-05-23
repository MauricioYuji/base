import { Injectable, Inject } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from "angularfire2/database";
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { Game, GameModel } from '../models/game.model'
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class gamesService {
  private basePath = '/Games';
  private baseUrl = 'http://localhost:3000';
  private itemDoc: AngularFirestoreCollection<any>;
  private itemImg: AngularFirestoreCollection<any>;
  constructor(private db: AngularFireDatabase, private afs: AngularFirestore, private http: HttpClient) {
    this.itemDoc = afs.collection<any>('Games');
    this.itemImg = afs.collection<any>('Assets');
  }
  public getAll(page: number = 1): Observable<GameModel> {
    //var name = "Terra"
    //var obj = this.db.list(this.basePath, ref =>
    //  ref.orderByChild('name').startAt(name).endAt(name + '\uf8ff').limitToFirst(20)).snapshotChanges().pipe(
    //    map(changes =>
    //      changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
    //    )
    //  );
    //return obj as Observable<Game[]>;

    return this.http.get(this.baseUrl + "/games/?page=" + page) as Observable<GameModel>;

  }

  public insert(obj: any) {


    var item = Object.assign({}, obj);
    delete item["key"];
    if (obj.img.key != undefined)
      item.img = this.itemImg.doc(obj.img.key).ref;
    this.itemDoc.add(item);


    const itemRef = this.db.list(this.basePath);
    itemRef.push(obj);
  }
  public update(key: string, value: Game) {
    let itemsRef = this.db.list(this.basePath);
    delete value["key"];
    itemsRef.update(key, value);



    var item = Object.assign({}, value);
    delete item["key"];
    //item.img = this.itemImg.doc(key).ref;
    this.itemDoc.doc(key).update(item);

  }
  public delete(key: string) {
    const itemsRef = this.db.list(this.basePath);
    itemsRef.remove(key);


    this.itemDoc.doc(key).delete();
  }
}
