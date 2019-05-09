import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { map } from 'rxjs/operators';

import { UploadFileService } from '../../../services/uploadService';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from "@angular/router";
import { AngularFireList } from 'angularfire2/database';
import { FileUpload } from 'src/app/models/fileupload.model';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'pick-upload',
  templateUrl: './pick-upload.component.html',
  styleUrls: ['./pick-upload.component.scss']
})
export class PickUploadComponent implements OnInit {

  //fileUploads: Observable<FileUpload[]>;
  fileUploads: FileUpload[];
  category: any = "";
  allowselect: boolean = false;
  @Input() categoryinput: string;
  @Input() selectedkey: any;
  @Output() uploadsubmitted = new EventEmitter();

  private itemImg: AngularFirestoreCollection<any>;

  constructor(private uploadService: UploadFileService, private modalService: NgbModal, private route: ActivatedRoute, private afs: AngularFirestore) {
  }

  ngOnInit() {
    //console.log("selectedkey: ", this.selectedkey);
    //console.log("this.categoryinput : ", this.categoryinput);
    this.category = this.categoryinput != undefined ? this.categoryinput : this.route.snapshot.paramMap.get("category");
    //console.log("this.category: ", this.category);
    // Use snapshotChanges().pipe(map()) to store the key
    this.uploadService.getFileUploadsall().snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    ).subscribe(fileUploads => {
      if (this.category != null) {
        var regex = new RegExp(this.category.toLowerCase(), 'g');
        //console.log("regex: ", regex);
        this.fileUploads = fileUploads.filter(
          function (item) {
            var match = false;
            match = item.category.toLowerCase().match(regex) != null;
            if (match) {
              return true;
            }

          }
        );
      } else {
        this.fileUploads = fileUploads;
      }
      console.log("this.fileUploads", this.fileUploads);
    });








    this.itemImg = this.afs.collection<any>('Assets');
    this.itemImg.snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ key: c.payload.doc.ref.id, ...c.payload.doc.data() }))
      )
    ).subscribe(p => {
      this.fileUploads = p;
      //this.games = p;
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






    //this.fileUploads = this.uploadService.getFileUploadsall();
    //if (this.category != null) {
    //  var regex = new RegExp(this.category.toLowerCase(), 'g');
    //  this.fileUploads = this.uploadService.getFileUploadsall().pipe(
    //    map(a => a.filter(
    //      function (item) {
    //        var match = false;
    //        match = item.category.toLowerCase().match(regex) != null;
    //        if (match) {
    //          return true;
    //        }

    //      }
    //    ))
    //  );
    //}

  }
  showselect() {
    this.allowselect = true;
  }
  emitid(id) {
    console.log("id: ", id);
    this.selectedkey = id;
    this.allowselect = false;
    this.uploadsubmitted.emit(id);
  }
}
