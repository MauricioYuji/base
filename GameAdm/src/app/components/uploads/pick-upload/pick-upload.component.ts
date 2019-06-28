import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { map } from 'rxjs/operators';

import { UploadFileService } from '../../../services/uploadService';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from "@angular/router";
import { AngularFireList } from 'angularfire2/database';
import { FileUpload, typeUpload } from 'src/app/models/fileupload.model';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { ImageCroppedEvent } from 'ngx-image-cropper/src/image-cropper.component';

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
  img: any = null;
  @Input() categoryinput: string;
  @Input() selectedkey: any = null;
  @Output() uploadsubmitted = new EventEmitter();


  selectedFiles: FileList;
  currentFileUpload: FileUpload;
  imageChangedEvent: any = '';
  croppedImage: any = '';
  croppedImagefile: any = '';
  aspect: number = 14 / 20;
  maintainAspectRatio: boolean = true;
  options: typeUpload = null;
  name: string = "";
  progress: { percentage: number } = { percentage: 0 };
  typelist = [{ category: "thumb", aspect: 14 / 20, maintainAspectRatio: true }, { category: "logo", aspect: 1, maintainAspectRatio: false }];
  preview: boolean = false;

  private itemImg: AngularFirestoreCollection<any>;

  constructor(private uploadService: UploadFileService, private modalService: NgbModal, private route: ActivatedRoute, private afs: AngularFirestore) {
  }

  ngOnInit() {
    console.log("selectedkey: ", this.selectedkey);
    if (this.selectedkey != null)
      this.img = this.selectedkey[0];
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
      //console.log("this.fileUploads", this.fileUploads);
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

  private progressreturn(obj) {
    console.log("obj: ", obj);
    //this.modalService.dismissAll();
  }

  changeaspect() {
    //console.log("this.options: ", this.options);
    this.aspect = this.options.aspect;
    this.maintainAspectRatio = this.options.maintainAspectRatio;
  }
  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;

    const file = event.target.files.item(0);

    if (file.type.match('image.*')) {
      this.selectedFiles = event.target.files;
    } else {
      alert('invalid format!');
    }
  }
  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
    this.croppedImagefile = event;
  }
  imageSave() {
    const file = this.selectedFiles.item(0);


    var blobfile = file.slice(0, file.size, 'image/png');
    var newFile = new File([blobfile], (256 * (+new Date)).toString(36).toUpperCase() + '.png', { type: 'image/png' });


    this.selectedFiles = undefined;
    //file.name = (256 * (+new Date)).toString(36).toUpperCase();
    //console.log("file: ", newFile);

    this.currentFileUpload = new FileUpload(newFile);
    //console.log("this.currentFileUpload: ", this.currentFileUpload);
    this.currentFileUpload.category = this.options.category;
    const blob = this.blobToFile(this.croppedImagefile, this.currentFileUpload.file.name);

    blob.file.height = blob.height;
    blob.file.width = blob.width;

    //console.log("blob: ", blob);

    this.img = { img: blob.base64 };
    this.allowselect = false;


    this.uploadsubmitted.emit(this.img);

    //this.currentFileUpload.file = blob.file;
    //this.currentFileUpload.name = this.name;
    //console.log("this.currentFileUpload: ", this.currentFileUpload);

    //this.uploadService.pushFileToStorage(this.currentFileUpload, this.progress, null);
    //this.uploadsubmitted.emit(this.counter);
  }
  imageLoaded() {
    // show cropper
  }
  loadImageFailed() {
    // show message
  }
  blobToFile(theBlob, fileName) {
    //console.log("fileName: ", fileName);
    //A Blob() is almost a File() - it's just missing the two properties below which we will add
    theBlob.file.lastModifiedDate = new Date();
    theBlob.file.name = fileName;
    return theBlob;
  }
}
