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
import * as consoles from '../../helpers/consoles.json';
import * as listgames from '../../../data/games.json';
import { HttpClient, HttpHeaders } from '@angular/common/http';



@Component({
  selector: 'app-root',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  title = 'GameAdm';
  private itemDoc: AngularFirestoreCollection<any>;
  private itemImg: AngularFirestoreCollection<any>;
  constructor(private afs: AngularFirestore, private http: HttpClient) {
    //this.itemDoc = afs.collection<any>('Games');
    //this.itemImg = afs.collection<any>('Assets');
    //this.itemDoc.valueChanges().subscribe(p=> {
    //  console.log("p: ", p);
    //})

    //const httpOptions = {
    //  headers: new HttpHeaders({
    //    'Content-Type': 'application/json',
    //    'Authorization': 'my-auth-token',
    //    'user-key': 'fa8b8b32261fae59328b181b9d201123'
    //  })
    //};

    //this.http.get("https://api-v3.igdb.com/platforms/?fields=*", httpOptions).subscribe(p => {
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
          var loop = fullarray[i].genre.split(",");
          var genre = [];
          for (var j = 0; j < loop.length; j++) {
            if (!genre.includes(loop[j].trim())) {
              genre.push(loop[j].trim());
            }
          }
          obj['keygenre'] = genre;
        }
        obj['img'] = "";
        newarray.push(obj);
      } else {
        var index = newarray.indexOf(check[0]);
        if (fullarray[i].genre != undefined) {
          if (newarray[index].keygenre != undefined) {
            var loop = fullarray[i].genre.split(",");
            for (var j = 0; j < loop.length; j++) {
              if (!newarray[index].keygenre.includes(loop[j].trim())) {
                newarray[index].keygenre.push(loop[j].trim());
              }
            }
          } else {
            var loop = fullarray[i].genre.split(",");
            var genre = [];
            for (var j = 0; j < loop.length; j++) {
              if (!genre.includes(loop[j].trim())) {
                genre.push(loop[j].trim());
              }
            }
            newarray[index].keygenre = genre;
          }
        }
        if (!newarray[index].keyconsole.includes(fullarray[i].console[0])) {
          newarray[index].keyconsole.push(fullarray[i].console[0]);
        }
      }
    }

    //var genresbase = [];

    //for (let obj in consoles.default.Genres) {
    //  var o = {};
    //  o["key"] = obj;
    //  o["name"] = consoles.default.Genres[obj].name;
    //  genresbase.push(o);
    //}

    //var genres = [];
    //for (var i = 0; i < newarray.length; i++) {
    //  var loop = Object.assign([], newarray[i].keygenre);
    //  if (loop != undefined) {
    //    var newgenre = [];
    //    for (var j = 0; j < loop.length; j++) {



    //      //console.log("loop[j]: ", loop[j]);
    //      var check = genresbase.filter(p => loop[j].includes(p.name.toLowerCase()));
    //      if (check.length > 0) {
    //        console.log("name: ", newarray[i].name);
    //        console.log("check: ", check);
    //        console.log("genres[i]: ", loop[j]);
    //        for (var a = 0; a < check.length; a++) {
    //          var val = parseInt(check[a].key);
    //          if (!newgenre.includes(val)) {
    //            newgenre.push(val);
    //          }
    //        }
    //      }
    //      console.log("-------------");



    //      //if (!genres.includes(loop[j].trim().toLowerCase()) && loop[j].trim().toLowerCase() != "") {
    //      //  genres.push(loop[j].trim().toLowerCase());
    //      //}



    //    }
    //    newarray[i].keygenre = newgenre;


    //  this.itemDoc.add(newarray[i]);
    //  }
    //}
    //genres.sort();

    console.log("newarray: ", newarray);
    console.log(JSON.stringify(newarray));
    //console.log("genres: ", genres);
    //console.log(JSON.stringify(genres.sort()));

    //var genresbase = consoles.default.Genres;
    //genresbase = Object.assign([], genresbase);
    //console.log("genresbase: ", genresbase);
    //for (var i = 0; i < genres.length; i++) {
    //  var check = genresbase.filter(p => genres[i].includes(p.name.toLowerCase()));
    //  if (check.length > 0) {
    //    console.log("check: ", check);
    //    console.log("genres[i]: ", genres[i]);
    //  }

    //}


    //for (var i = 0; i < genres.length; i++) {
    //  var check = genresbase.filter(p => genres[i].includes(p.name.toLowerCase()));
    //  if (check.length > 0) {
    //    console.log("check: ", check);
    //    console.log("genres[i]: ", genres[i]);
    //  }
    //  console.log("-------------");
    //}

    console.log("END");

  }
}
