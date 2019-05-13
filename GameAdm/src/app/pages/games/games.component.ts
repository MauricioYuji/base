import { Component, ElementRef, ViewChild } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from "angularfire2/database";
import { Observable } from 'rxjs';
import { Game } from '../../models/game.model'
import { gamesService } from '../../services/gamesService'
import { UploadFileService } from '../../services/uploadService'
import { FileUpload } from '../../models/fileupload.model'
import { map } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';


@Component({
  selector: 'games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss']
})
export class GamesComponent {
  title = 'GameAdm';
  public games: Game[];
  public model: FormGroup;
  public search = '';
  @ViewChild('content') content: ElementRef;
  @ViewChild('confirm') confirm: ElementRef;
  private itemDoc: AngularFirestoreCollection<any>;

  constructor(private modalService: NgbModal, private service: gamesService, private formBuilder: FormBuilder, private afs: AngularFirestore) { }

  ngOnInit() {
    //this.service.getAll().subscribe(p => {
    //  this.games = p;
    //  //console.log(" this.games: ", this.games);
    //});



    this.itemDoc = this.afs.collection<any>('Games', ref => ref.orderBy('name').startAfter("12-Sai. Torokeru Puzzle Futari no Harmony").limit(24));

    console.log("itemDoc: ", this.itemDoc);
    this.itemDoc.snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ key: c.payload.doc.ref.id, ...c.payload.doc.data() }))
      )
    ).subscribe(p => {
      this.games = p;
      console.log("p: ", p);


      //var games = [];
      //for (var item in p) {
      //  const game = p[item];
      //  game.img.get().then(snap => {
      //    game.image = snap.data()
      //    console.log("game: ", game);
      //    this.games.push(game)
      //  })
      //}
    })


    this.model = this.formBuilder.group({
      key: [],
      name: ['', [Validators.required]],
      keyconsole: [[], [Validators.required]],
      keygenre: [[], [Validators.required]],
      img: ['']
    });
  }
  open(content) {
    this.modalService.open(content, { size: 'lg', ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.model.setValue({ name: "", img: "", key: "", keyconsole: [], keygenre: [] });
    }, (reason) => {
      this.model.setValue({ name: "", img: "", key: "", keyconsole: [], keygenre: [] });
    });
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  onSubmit() {
    if (this.model.invalid) {
      //console.log("MODEL INVALIDA: ", this.model);
      return;
    }

    var objstring = JSON.stringify(this.model.value);
    console.log('SUCCESS!! :-)\n\n' + objstring);
    var obj = new Game(this.model.value);
    //obj.key = null;
    obj.name = this.model.value.name;
    obj.img = this.model.value.img;
    obj.keyconsole = this.model.value.keyconsole
    obj.keygenre = this.model.value.keygenre

    console.log('obj.key' + obj.key);
    if (obj.key == null || obj.key == "") {
      this.service.insert(obj);
    } else {
      this.service.update(obj.key, obj);
    }

    this.modalService.dismissAll();
  }

  changefilter() {
    //console.log("this.search: ", this.search);
    var regex = new RegExp(this.search.toLowerCase(), 'g');
    this.service.getAll().pipe(
      map(a => a.filter(
        function (item) {
          var match = false;
          match = item.name.toLowerCase().match(regex) != null;
          if (match) {
            return true;
          }

        }
      ))
    ).subscribe(p => {
      this.games = p;
    });
  }

  checkAll(ev) {
    this.games.forEach(x => x.state = ev.target.checked)
  }

  isAllChecked() {
    if (this.games !== undefined)
      return this.games.every(_ => _.state);
  }
  deleteselected() {
    var games = this.games.filter(p => p.state);

    games.forEach(x => {
      this.deleteitem(x.key);
    });
  }
  deleteitem(key) {
    //console.log("DELETE: ", key);
    this.service.delete(key);
    this.modalService.dismissAll("Confirm");
  }
  private setedit(key: string) {
    var obj = new Game(this.games.filter(p => p.key == key)[0]);
    this.model.setValue({ name: obj.name, img: obj.img, key: key, keyconsole: obj.keyconsole, keygenre: obj.keygenre });
    this.open(this.content);
  }
  private progressreturnimg(obj) {
    this.model.setValue({ name: this.model.value.name, img: obj, key: this.model.value.key, keyconsole: this.model.value.keyconsole, keygenre: this.model.value.keygenre })

  }
  private progressreturnimgconsole(obj) {
    var array = this.model.value.keyconsole;
    array.push(obj)
    //console.log("array: ", array);
    //console.log("this.model: ", this.model);
    this.model.setValue({ name: this.model.value.name, img: this.model.value.img, key: this.model.value.key, keyconsole: array, keygenre: this.model.value.keygenre })

  }
  private progressreturnimggenre(obj) {
    var array = this.model.value.keygenre;
    array.push(obj)
    //console.log("array: ", array);
    //console.log("this.model: ", this.model);
    this.model.setValue({ name: this.model.value.name, img: this.model.value.img, key: this.model.value.key, keyconsole: this.model.value.keyconsole, keygenre: array })

  }
  private confirmdelete(key: string) {
    var obj = new Game(this.games.filter(p => p.key == key)[0]);
    this.model.setValue({ name: obj.name, img: obj.img, key: key, keyconsole: obj.keyconsole, keygenre: obj.keygenre });
    this.open(this.confirm);
  }
  private excludeconsole(key: string) {
    //console.log("exclude ID: ", key);
    this.model.value.keyconsole.splice(this.model.value.keyconsole.indexOf('key'), 1);
    //console.log("array: ", this.model.value.keyconsole);
  }
  private excludegenre(key: string) {
    //console.log("exclude ID: ", key);
    this.model.value.keygenre.splice(this.model.value.keygenre.indexOf('key'), 1);
    //console.log("array: ", this.model.value.keyconsole);
  }
}
