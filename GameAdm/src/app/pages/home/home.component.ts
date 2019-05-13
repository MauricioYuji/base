import { Component } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import * as nintendo3ds from '../../../data/3dsgames.json';
import * as ps3 from '../../../data/ps3games.json';
import * as ps4 from '../../../data/ps4games.json';
import * as vita from '../../../data/psvitagames.json';
import * as wiiu from '../../../data/wiiugames.json';
import * as xbox360 from '../../../data/xbox360games.json';
import * as xone from '../../../data/xonegames.json';
import * as nintendoswitch from '../../../data/switchgames.json';
import * as pc from '../../../data/pcgames.json';
import * as listgames from '../../../data/games.json';



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
    //var item = Object();
    //item.name = "teste 123";
    //item.consoles = [1, 2];

    //item.img = this.itemImg.doc('FK7sFFR2n1kNQCVBHdEHX').ref,
    //  this.itemDoc.add(item);

    var listnintendo3ds: any = nintendo3ds;
    var listps3: any = ps3;
    var listps4: any = ps4;
    var listvita: any = vita;
    var listwiiu: any = wiiu;
    var listxbox360: any = xbox360;
    var listxone: any = xone;
    var listnintendoswitch: any = nintendoswitch;
    var listpc: any = pc;
    //var gameslist: any = listgames;


    var fullarray = [];
    fullarray = fullarray.concat(listnintendo3ds.default);
    fullarray = fullarray.concat(listps3.default);
    fullarray = fullarray.concat(listps4.default);
    fullarray = fullarray.concat(listvita.default);
    fullarray = fullarray.concat(listvita.default);
    fullarray = fullarray.concat(listwiiu.default);
    fullarray = fullarray.concat(listxbox360.default);
    fullarray = fullarray.concat(listxone.default);
    fullarray = fullarray.concat(listnintendoswitch.default);
    fullarray = fullarray.concat(listpc.default);


    var newarray = [];
    //for (var i = 0; i < listnintendo3ds.length; i++) {
    //  var obj = {};
    //  obj['name'] = listnintendo3ds.default[i];
    //  obj['keyconsole'] = [6];
    //  obj['keygenre'] = [];
    //  obj['img'] = "";
    //  newarray.push(obj);
    //}

    //for (var i = 0; i < listps3.length; i++) {
    //  var check = newarray.filter(p => p.name == listps3.default[i]);

    //  if (check.length == 0) {
    //    var obj = {};
    //    obj['name'] = listps3.default[i];
    //    obj['keyconsole'] = [2];
    //    obj['keygenre'] = [];
    //    obj['img'] = "";
    //    newarray.push(obj);
    //  } else {
    //    var index = newarray.indexOf(check[0]);
    //    newarray[index].keyconsole.push(2);
    //  }
    //}
    //for (var i = 0; i < listps4.length; i++) {
    //  var check = newarray.filter(p => p.name == listps4.default[i]);

    //  if (check.length == 0) {
    //    var obj = {};
    //    obj['name'] = listps4.default[i];
    //    obj['keyconsole'] = [1];
    //    obj['keygenre'] = [];
    //    obj['img'] = "";
    //    newarray.push(obj);
    //  } else {
    //    var index = newarray.indexOf(check[0]);
    //    newarray[index].keyconsole.push(1);
    //  }
    //}
    //for (var i = 0; i < listvita.length; i++) {
    //  var check = newarray.filter(p => p.name == listvita.default[i]);

    //  if (check.length == 0) {
    //    var obj = {};
    //    obj['name'] = listvita.default[i];
    //    obj['keyconsole'] = [3];
    //    obj['keygenre'] = [];
    //    obj['img'] = "";
    //    newarray.push(obj);
    //  } else {
    //    var index = newarray.indexOf(check[0]);
    //    newarray[index].keyconsole.push(3);
    //  }
    //}
    //for (var i = 0; i < listwiiu.length; i++) {
    //  var check = newarray.filter(p => p.name == listwiiu.default[i]);

    //  if (check.length == 0) {
    //    var obj = {};
    //    obj['name'] = listwiiu.default[i];
    //    obj['keyconsole'] = [5];
    //    obj['keygenre'] = [];
    //    obj['img'] = "";
    //    newarray.push(obj);
    //  } else {
    //    var index = newarray.indexOf(check[0]);
    //    newarray[index].keyconsole.push(5);
    //  }
    //}
    //for (var i = 0; i < listxbox360.length; i++) {
    //  var check = newarray.filter(p => p.name == listxbox360.default[i]);

    //  if (check.length == 0) {
    //    var obj = {};
    //    obj['name'] = listxbox360.default[i];
    //    obj['keyconsole'] = [8];
    //    obj['keygenre'] = [];
    //    obj['img'] = "";
    //    newarray.push(obj);
    //  } else {
    //    var index = newarray.indexOf(check[0]);
    //    newarray[index].keyconsole.push(8);
    //  }
    //}
    //for (var i = 0; i < listxone.length; i++) {
    //  var check = newarray.filter(p => p.name == listxone.default[i]);

    //  if (check.length == 0) {
    //    var obj = {};
    //    obj['name'] = listxone.default[i];
    //    obj['keyconsole'] = [7];
    //    obj['keygenre'] = [];
    //    obj['img'] = "";
    //    newarray.push(obj);
    //  } else {
    //    var index = newarray.indexOf(check[0]);
    //    newarray[index].keyconsole.push(7);
    //  }
    //}
    //for (var i = 0; i < listnintendoswitch.length; i++) {
    //  var check = newarray.filter(p => p.name == listnintendoswitch.default[i]);

    //  if (check.length == 0) {
    //    var obj = {};
    //    obj['name'] = listnintendoswitch.default[i];
    //    obj['keyconsole'] = [4];
    //    obj['keygenre'] = [];
    //    obj['img'] = "";
    //    newarray.push(obj);
    //  } else {
    //    var index = newarray.indexOf(check[0]);
    //    newarray[index].keyconsole.push(4);
    //  }
    //}



    for (var i = 0; i < fullarray.length; i++) {
      var check = newarray.filter(p => p.name == fullarray[i].name);

      if (check.length == 0) {
        var obj = {};
        obj['name'] = fullarray[i].name;
        obj['keyconsole'] = fullarray[i].console;

        if (fullarray[i].genre != undefined) {
          obj['keygenre'] = fullarray[i].genre;
        }
        obj['img'] = "";
        newarray.push(obj);
      } else {
        var index = newarray.indexOf(check[0]);
        if (fullarray[i].genre != undefined) {
          if (newarray[index].keygenre != undefined) {
            newarray[index].keygenre += ", " + fullarray[i].genre;
          } else {
            newarray[index].keygenre = fullarray[i].genre;
          }
        }
        newarray[index].keyconsole.push(fullarray[i].console[0]);
      }
    }
    //console.log(JSON.stringify(newarray));
    console.log("newarray: ", newarray);
    //for (var i = 0; i < newarray.length; i++) {
    //  this.itemDoc.add(newarray[i]);
    //}
    console.log("END");

  }
}
