import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { map } from 'rxjs/operators';

import { UploadFileService } from '../../../services/uploadService';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from "@angular/router";
import { AngularFireList } from 'angularfire2/database';
import { FileUpload } from 'src/app/models/fileupload.model';
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
  @Input() selectedkey: string;
  @Output() uploadsubmitted = new EventEmitter();


  constructor(private uploadService: UploadFileService, private modalService: NgbModal, private route: ActivatedRoute) { }

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
      //console.log("this.fileUploads", this.fileUploads);
    });
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
    //console.log("selectedkey: ", this.selectedkey);
    this.selectedkey = id;
    this.allowselect = false;
    this.uploadsubmitted.emit(id);
  }
}
