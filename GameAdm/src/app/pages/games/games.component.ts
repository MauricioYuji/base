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

  constructor(private modalService: NgbModal, private service: gamesService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.service.getAll().subscribe(p => {
      this.games = p;
    });
    this.model = this.formBuilder.group({
      key: [],
      name: ['', [Validators.required]],
      keyconsole: ['', [Validators.required]],
      img: ['', [Validators.required]]
    });
  }
  open(content) {
    this.modalService.open(content, { size: 'lg', ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.model.setValue({ name: "", img: "", key: "", keyconsole:"" });
    }, (reason) => {
      this.model.setValue({ name: "", img: "", key: "", keyconsole: "" });
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
    var obj = new Game();
    obj.key = this.model.value.key;
    obj.name = this.model.value.name;
    obj.img = this.model.value.img;
    obj.keyconsole = this.model.value.keyconsole

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
  deleteitem(key) {
    //console.log("DELETE: ", key);
    this.service.delete(key);
    this.modalService.dismissAll("Confirm");
  }
  private setedit(key: string) {
    var obj = this.games.filter(p => p.key == key)[0];
    this.model.setValue({ name: obj.name, img: obj.img, key: key, keyconsole: obj.keyconsole });
    this.open(this.content);
  }
  private progressreturn(obj) {
    //console.log("this.model: ", this.model);
    this.model.setValue({ name: this.model.value.name, img: obj, key: this.model.value.key, keyconsole: this.model.value.keyconsole })

  }
  private confirmdelete(key: string) {
    var obj = this.games.filter(p => p.key == key)[0];
    this.model.setValue({ name: obj.name, img: obj.img, key: key, keyconsole: obj.keyconsole });
    this.open(this.confirm);
  }
}
