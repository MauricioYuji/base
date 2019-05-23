import { Component } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
//import * as nintendo3ds from '../../../data/3dsgames.json';
//import * as ps3 from '../../../data/ps3games.json';
//import * as ps4 from '../../../data/ps4games.json';
//import * as vita from '../../../data/psvitagames.json';
//import * as wiiu from '../../../data/wiiugames.json';
//import * as xbox360 from '../../../data/xbox360games.json';
//import * as xone from '../../../data/xonegames.json';
//import * as nintendoswitch from '../../../data/switchgames.json';
//import * as pc from '../../../data/pcgames.json';
//import * as consoles from '../../helpers/consoles.json';
//import * as listgames from '../../../data/games.json';
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
  }
  update() {

    //var listnintendo3ds: any = nintendo3ds;
    //var listps3: any = ps3;
    //var listps4: any = ps4;
    //var listvita: any = vita;
    //var listwiiu: any = wiiu;
    //var listxbox360: any = xbox360;
    //var listxone: any = xone;
    //var listnintendoswitch: any = nintendoswitch;
    //var listpc: any = pc;


    //var fullarray = [];
    //fullarray = fullarray.concat(listnintendo3ds.default);
    //fullarray = fullarray.concat(listps3.default);
    //fullarray = fullarray.concat(listps4.default);
    //fullarray = fullarray.concat(listvita.default);
    //fullarray = fullarray.concat(listvita.default);
    //fullarray = fullarray.concat(listwiiu.default);
    //fullarray = fullarray.concat(listxbox360.default);
    //fullarray = fullarray.concat(listxone.default);
    //fullarray = fullarray.concat(listnintendoswitch.default);
    //fullarray = fullarray.concat(listpc.default);

    //var genresbase = consoles.default.Genres;

    //var newarray = [];
    //var genreslist = [];

    //for (var i = 0; i < fullarray.length; i++) {
    //  var check = newarray.filter(p => p.name == fullarray[i].name);

    //  if (check.length == 0) {
    //    var obj = {};
    //    obj['name'] = fullarray[i].name;
    //    obj['keyconsole'] = fullarray[i].console;

    //    if (fullarray[i].genre != undefined) {
    //      var loop = fullarray[i].genre.split(",");
    //      var genre = [];
    //      for (var j = 0; j < loop.length; j++) {


    //        if (!genre.includes(loop[j].trim())) {
    //          genre.push(loop[j].trim());
    //        }
    //      }
    //      obj['keygenre'] = genre;
    //    }
    //    obj['img'] = "";
    //    newarray.push(obj);
    //  } else {
    //    var index = newarray.indexOf(check[0]);
    //    if (fullarray[i].genre != undefined) {
    //      if (newarray[index].keygenre != undefined) {
    //        var loop = fullarray[i].genre.split(",");
    //        for (var j = 0; j < loop.length; j++) {
    //          if (!newarray[index].keygenre.includes(loop[j].trim())) {
    //            newarray[index].keygenre.push(loop[j].trim());
    //          }
    //        }
    //      } else {
    //        var loop = fullarray[i].genre.split(",");
    //        var genre = [];
    //        for (var j = 0; j < loop.length; j++) {
    //          if (!genre.includes(loop[j].trim())) {
    //            genre.push(loop[j].trim());
    //          }
    //        }
    //        newarray[index].keygenre = genre;
    //      }
    //    }
    //    if (!newarray[index].keyconsole.includes(fullarray[i].console[0])) {
    //      newarray[index].keyconsole.push(fullarray[i].console[0]);
    //    }
    //  }
    //}

    //console.log("newarray: ", newarray);
    //console.log(JSON.stringify(newarray));
    //console.log("END");

  }
}
