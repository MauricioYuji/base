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
import { gamesService } from '../../services/gamesService';
import { Game, GameModel } from '../../models/game.model';
import { BaseService } from '../../services/base.service';



@Component({
  selector: 'app-root',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  title = 'GameAdm';
  private itemDoc: AngularFirestoreCollection<any>;
  private itemImg: AngularFirestoreCollection<any>;
  constructor(private afs: AngularFirestore, private service: gamesService, private http: BaseService, private httpClient: HttpClient) {
  }
  getImage(imageUrl: string): Observable<Blob> {
    return this.httpClient.get("https://cors-anywhere.herokuapp.com/" + imageUrl, { responseType: 'blob' });
  }
  downloadFile(data: Blob) {
    const blob = new Blob([data], { type: 'application/octet-stream' });
    const url = window.URL.createObjectURL(blob);
    window.open(url);
  }
  update() {

    this.service.getfull().subscribe(p => {

      console.log(" this.games: ", p);
      for (var i = 0; i < 1; i++) {
        var _self = this;

        setTimeout(function () {
          var list = p.List[i];
          console.log("URL: ", "https://api.qwant.com/api/search/images?count=50&q=" + encodeURIComponent(list.name) + "&t=images&locale=en_US&uiv=4&safesearch=1");
          var obj = _self.httpClient.get("https://cors-anywhere.herokuapp.com/https://api.qwant.com/api/search/images?count=50&q=" + encodeURIComponent(list.name) + "&t=images&locale=en_US&uiv=4&safesearch=1") as Observable<GameModel>;
          obj.subscribe(a => {
            var item: any = a;
            var url = item.data.result.items.filter(f => parseInt(f.height) > parseInt(f.width))[0].media;
            _self.getImage(url).subscribe(blob => {
              _self.downloadFile(blob);
            });
            console.log("item: ", url);
          })
        }, 1000 * i);
      }

    });

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
