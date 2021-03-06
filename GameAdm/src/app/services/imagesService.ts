import { Injectable, Inject } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from "angularfire2/database";
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { ImageModel } from '../models/images.model';
import { Game, GameModel } from '../models/game.model'
import { BaseService } from './base.service';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class imagesService {
  private basePath = '/Images';
  private baseUrl = 'http://localhost:3000';
  private itemDoc: AngularFirestoreCollection<any>;
  private itemImg: AngularFirestoreCollection<any>;


  constructor(private db: AngularFireDatabase, private afs: AngularFirestore, private http: BaseService) {
    this.itemDoc = afs.collection<any>('Images');
    this.itemImg = afs.collection<any>('Assets');
  }
  public getAll(page: number = 1, perpage: number = 10, p: any = null): Observable<GameModel> {
    //var name = "Terra"
    //var obj = this.db.list(this.basePath, ref =>
    //  ref.orderByChild('name').startAt(name).endAt(name + '\uf8ff').limitToFirst(20)).snapshotChanges().pipe(
    //    map(changes =>
    //      changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
    //    )
    //  );
    //return obj as Observable<Game[]>;
    var params = "";
    params += "?page=" + page;
    params += "&perpage=" + perpage;
    if (p != null) {
      if (p.s != "" && p.s != undefined)
        params += "&s=" + p.s;
    }
    //console.log("params: ", params);


    return this.http.get(this.baseUrl + "/images/" + params) as Observable<GameModel>;

  }

  public insert(obj: any) {
    delete obj['_id'];
    console.log("INSERT: ", obj);

    //var item = Object.assign({}, obj);
    //delete item["key"];
    //if (obj.img.key != undefined)
    //  item.img = this.itemImg.doc(obj.img.key).ref;
    //this.itemDoc.add(item);


    //const itemRef = this.db.list(this.basePath);
    //itemRef.push(obj);


    return this.http.post(this.baseUrl + "/images/add/", obj) as Observable<any>;
  }
  public update(key: string, obj: ImageModel) {
    delete obj['_id'];
    //console.log("UPDATE: ", JSON.stringify(obj));
    //let itemsRef = this.db.list(this.basePath);
    //delete value["key"];
    //itemsRef.update(key, value);



    //var item = Object.assign({}, value);
    //delete item["key"];
    ////item.img = this.itemImg.doc(key).ref;
    //this.itemDoc.doc(key).update(item);
    return this.http.put(this.baseUrl + "/images/edit/" + key, obj) as Observable<any>;

  }
  public delete(key: string) {
    console.log("DELETE: ", key);
    //const itemsRef = this.db.list(this.basePath);
    //itemsRef.remove(key);


    //this.itemDoc.doc(key).delete();

    return this.http.delete(this.baseUrl + "/images/delete/" + key) as Observable<any>;
  }
}
