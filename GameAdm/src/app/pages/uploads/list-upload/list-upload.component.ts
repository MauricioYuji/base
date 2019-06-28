import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { map } from 'rxjs/operators';

import { UploadFileService } from '../../../services/uploadService';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from "@angular/router";
import { AngularFireList } from 'angularfire2/database';
import { FileUpload } from 'src/app/models/fileupload.model';
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { imagesService } from '../../../services/imagesService';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'list-upload',
  templateUrl: './list-upload.component.html',
  styleUrls: ['./list-upload.component.scss']
})
export class ListUploadComponent implements OnInit {
  public images = [];
  public limit = 24;
  public pages = [];
  public currentpage = 0;
  public totalpages = 0;
  public search = "";
  public model: FormGroup;
  //fileUploads: Observable<FileUpload[]>;
  fileUploads: FileUpload[];
  category: any = "";
  @Input() categoryinput: string;
  @ViewChild('content') content: ElementRef;
  @ViewChild('confirm') confirm: ElementRef;

  private itemDoc: AngularFirestoreCollection<any>;

  constructor(private uploadService: UploadFileService, private service: imagesService, private modalService: NgbModal, private route: ActivatedRoute, private afs: AngularFirestore, private formBuilder: FormBuilder) { }

  ngOnInit() {
    console.log("UPLOAD SCREEN");
    //this.category = this.categoryinput != undefined ? this.categoryinput : this.route.snapshot.paramMap.get("category");

    //this.itemDoc = this.afs.collection<any>('Assets');
    //this.itemDoc.snapshotChanges().pipe(
    //  map(changes =>
    //    changes.map(c => ({ key: c.payload.doc.ref.id, ...c.payload.doc.data() }))
    //  )
    //).subscribe(p => {
    //  this.fileUploads = p;
    //  console.log("p: ", p);
    //})

    this.service.getAll(this.currentpage + 1, this.limit).subscribe(p => {
      this.images = p.List;

      this.totalpages = Math.ceil(p.Total / this.limit) - 1;
      this.generatePagination();
      console.log(" this.images: ", this.images);
    });

    this.model = this.formBuilder.group({
      _id: ['']
    });
  }

  generatePagination() {


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
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
    }, (reason) => {
    });
  }


  changefilter() {
    var obj = {};
    if (this.search != "")
      obj['s'] = this.search;
    console.log("obj: ", obj);
    this.service.getAll(this.currentpage + 1, this.limit, obj).subscribe(p => {
      this.images = p.List;
      var totalpages = Math.ceil(p.Total / this.limit);
      this.generatePagination();
      console.log(" this.images: ", this.images);
    });
  }
  checkAll(ev) {
    this.images.forEach(x => x.state = ev.target.checked)
  }

  isAllChecked() {
    if (this.images !== undefined)
      return this.images.every(_ => _.state);
  }
  deleteselected() {
    var images = this.images.filter(p => p.state);
    console.log("images: ", images);
    images.forEach(x => {
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
  private confirmdelete(key: string) {
    console.log("key: ", key);
    var obj = new Image(this.images.filter(p => p._id == key)[0]);
    console.log("obj: ", obj);
    this.model.setValue({  _id: key });
    this.open(this.confirm);
  }
  private changepage(page: number) {
    this.currentpage = page;
    this.changefilter();
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
  private progressreturn(obj) {
    console.log("obj: ", obj);
    this.modalService.dismissAll();
  }
}
