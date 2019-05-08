import { Component } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  title = 'GameAdm';
  private itemDoc: AngularFirestoreCollection<any>;
  private itemImg: AngularFirestoreCollection<any>;
  constructor(private afs: AngularFirestore) {
    this.itemDoc = afs.collection<any>('Games');
    this.itemImg = afs.collection<any>('Assets');
    //this.itemDoc.valueChanges().subscribe(p=> {
    //  console.log("p: ", p);
    //})
  }
  update() {
    var item = Object();
    item.name = "teste 123";
    item.consoles = [1, 2];
    
    item.img = this.itemImg.doc('FK7sFFR2n1kNQCVBHdEHX').ref,
    this.itemDoc.add(item);
  }
}
