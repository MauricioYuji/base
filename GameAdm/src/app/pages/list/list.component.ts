import { Component } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from "angularfire2/database";
import { Observable } from 'rxjs';
import { Game } from '../../models/game.model'
import { gamesService } from '../../services/gamesService'
import { UploadFileService } from '../../services/uploadService'
import { FileUpload } from '../../models/fileupload.model'
import { map } from 'rxjs/operators';


@Component({
  selector: 'list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent {
  title = 'GameAdm';
  search = '';
  public games: Observable<Game[]>;
  //public games: AngularFireList<Game[]>;
  constructor(db: AngularFireDatabase, private service: gamesService, private uploadService: UploadFileService) {

    this.games = this.service.getgames();


    //console.log("games: ", this.games);

    //this.uploadService.getFileUploadsall().snapshotChanges().pipe(
    //  map(changes =>
    //    changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
    //  )
    //).subscribe(fileUploads => {
    //  console.log("fileUploads: ", fileUploads);
    //});

    //this.games.subscribe(p => {
    //  console.log(p);
    //  for (var i = 0; i < p.length; i++) {
    //    var obj = new FileUpload(null);

    //    obj.name = (256 * (+new Date)).toString(36).toUpperCase();
    //    obj.url = p[i].img;
    //    obj.file = {};
    //    var getimgname = p[i].img.replace('https://firebasestorage.googleapis.com/v0/b/teste-925f4.appspot.com/o/thumbs%2', '');
    //    var splitted = getimgname.split('?');
    //    getimgname = splitted[0];
    //    obj.file.name = getimgname;

    //    this.uploadService.saveFileData(obj);
    //    console.log("obj: ", obj);
    //  }
    //})
    //this.service.insertgame();
    //this.service.updategame();
    //this.service.deletegame();
    //console.log("db", this.games);
    //this.games.subscribe(snapshots => {
    //  console.log(snapshots);
    //  this.list = snapshots as Game[];
    //});
  }
  changefilter() {
    console.log("this.search: ", this.search);
    var regex = new RegExp(this.search.toLowerCase(), 'g');
    this.games = this.service.getgames().pipe(
      map(a => a.filter(
        function (item) {
          var match = false;
          match = item.nome.toLowerCase().match(regex) != null;
          console.log(item);
          for (var i = 0; i < item.categorias.length; i++) {
            match = (item.categorias[i].toLowerCase().match(regex) != null || match)
          }
          if (match) {
            return true;
          }

        }
      ))
    );
  }
}
