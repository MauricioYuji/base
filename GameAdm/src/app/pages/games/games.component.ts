import { Component, ElementRef, ViewChild, HostListener } from '@angular/core';
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
  public lastitem = '';
  public limit = 24;
  public pages = [];
  public currentpage = 0;
  public totalpages = 0;
  @ViewChild('content') content: ElementRef;
  @ViewChild('confirm') confirm: ElementRef;
  private itemDoc: AngularFirestoreCollection<any>;


  constructor(private modalService: NgbModal, private service: gamesService, private formBuilder: FormBuilder, private afs: AngularFirestore) { }

  //@HostListener("window:scroll", ["$event"])
  //onWindowScroll() {
  //  //In chrome and some browser scroll is given to body tag
  //  let pos = document.documentElement.scrollTop + document.documentElement.clientHeight;
  //  let max = document.documentElement.scrollHeight;
  //  // pos/max will give you the distance between scroll bottom and and bottom of screen in percentage.

  //  if (pos == max) {
  //    console.log("END PAGE");
  //    //Do your action here
  //  }
  //}

  ngOnInit() {
    this.service.getAll(this.currentpage+1, this.limit).subscribe(p => {
      this.games = p.List;
      this.totalpages = Math.ceil(p.Total / this.limit) - 1;
      this.generatePagination();
      console.log(" this.games: ", this.games);
    });

    this.model = this.formBuilder.group({
      _id: [''],
      name: ['', [Validators.required]],
      keyconsole: [[], [Validators.required]],
      keygenre: [[], [Validators.required]],
      img: ['']
    });
  }
  generatePagination() {

    //var pages = [];
    //var startI = (this.currentpage - 3) < 0 ? 0 : this.currentpage - 3;
    //var limitI = (this.currentpage + 3) > this.totalpages ? this.totalpages : this.currentpage + 3;
    //var diff = (startI == 0) ? 3 - this.currentpage : (limitI == this.totalpages ? (this.totalpages - this.currentpage) - 3 : 0);
    //if (startI > 0) {
    //  pages.push(0);
    //}
    //if (startI > 1) {
    //  pages.push('...');
    //}

    //for (var i = diff < 0 ? diff + startI : startI; i < this.currentpage; i++) {
    //  pages.push(i);
    //}
    //for (var i = this.currentpage; i <= (diff > 0 ? diff + limitI : limitI); i++) {
    //  pages.push(i);
    //}

    //if (limitI < this.totalpages - 1) {
    //  pages.push('...');
    //}
    //if (limitI < this.totalpages) {
    //  pages.push(this.totalpages);
    //}
    //this.pages = pages;


    var pages = [];
    if (this.totalpages < 9) {
      for (var i = 0; i < this.totalpages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(0);

      var startDiff = this.currentpage - 2;
      var limitDiff = this.currentpage + 2;
      var fator = startDiff < 0 ? startDiff : limitDiff - this.totalpages > 0 ? limitDiff - this.totalpages : 0;
      var startI = startDiff < 0 ? 0 : fator > 0 ? startDiff - fator : startDiff;
      var limitI = limitDiff > this.totalpages ? this.totalpages : fator < 0 ? limitDiff - fator : limitDiff;
      if (startI > 1) {
        pages.push("...");
      }

      for (var i = startI; i <= limitI; i++) {
        if (i != 0 && i != this.totalpages)
          pages.push(i);
      }

      if (limitI < this.totalpages - 1) {
        pages.push("...");
      }

      pages.push(this.totalpages);
    }
    this.pages = pages;
  }
  open(content) {
    this.modalService.open(content, { size: 'lg', ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.model.setValue({ name: "", img: "", _id: "", keyconsole: [], keygenre: [] });
    }, (reason) => {
      this.model.setValue({ name: "", img: "", _id: "", keyconsole: [], keygenre: [] });
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
    //console.log('SUCCESS!! :-)\n\n' + objstring);
    var obj = new Game(this.model.value);
    //obj.key = null;
    obj.name = this.model.value.name;
    obj.img = JSON.stringify(this.model.value.img);
    obj.keyconsole = this.model.value.keyconsole
    obj.keygenre = this.model.value.keygenre

    //console.log('obj._id' + obj._id);
    if (obj._id == null || obj._id == "") {
      this.service.insert(obj).subscribe(() => {
        this.changefilter();
      });
    } else {
      this.service.update(obj._id, obj).subscribe(() => {
        this.changefilter();
      });
    }

    this.modalService.dismissAll();
  }

  changefilter() {
    var obj = {};
    if (this.search != "")
      obj['s'] = this.search;
    console.log("obj: ", obj);
    this.service.getAll(this.currentpage+1, this.limit, obj).subscribe(p => {
      this.games = p.List;
      var totalpages = Math.ceil(p.Total / this.limit);
      this.generatePagination();
      console.log(" this.games: ", this.games);
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
    console.log("games: ", games);
    games.forEach(x => {
      this.deleteitem(x._id);
    });
  }
  deleteitem(key) {
    console.log("DELETE: ", key);
    this.service.delete(key).subscribe(() => {
      this.changefilter();
    });;
    this.modalService.dismissAll("Confirm");
  }
  private setedit(key: string) {
    console.log("key: ", key);
    var obj = new Game(this.games.filter(p => p._id == key)[0]);
    console.log("obj: ", obj);
    this.model.setValue({ name: obj.name, img: obj.img, _id: key, keyconsole: obj.keyconsole, keygenre: obj.keygenre });
    this.open(this.content);
  }
  private progressreturnimg(obj) {
    this.model.setValue({ name: this.model.value.name, img: obj, _id: this.model.value._id, keyconsole: this.model.value.keyconsole, keygenre: this.model.value.keygenre })

  }
  private progressreturnimgconsole(obj) {
    var array = this.model.value.keyconsole;
    array.push(obj)
    //console.log("array: ", array);
    //console.log("this.model: ", this.model);
    this.model.setValue({ name: this.model.value.name, img: this.model.value.img, _id: this.model.value._id, keyconsole: array, keygenre: this.model.value.keygenre })

  }
  private progressreturnimggenre(obj) {
    var array = this.model.value.keygenre;
    array.push(obj)
    //console.log("array: ", array);
    //console.log("this.model: ", this.model);
    this.model.setValue({ name: this.model.value.name, img: this.model.value.img, _id: this.model.value._id, keyconsole: this.model.value.keyconsole, keygenre: array })

  }
  private confirmdelete(key: string) {
    console.log("key: ", key);
    var obj = new Game(this.games.filter(p => p._id == key)[0]);
    console.log("obj: ", obj);
    this.model.setValue({ name: obj.name, img: obj.img, _id: key, keyconsole: obj.keyconsole, keygenre: obj.keygenre });
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
  private changepage(page: number) {
    this.currentpage = page;
    this.changefilter();
  }
}
