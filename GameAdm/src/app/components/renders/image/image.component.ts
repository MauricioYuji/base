import { Component, OnInit, Input, EventEmitter, Output, SimpleChanges, OnChanges } from '@angular/core';
import { map } from 'rxjs/operators';

import { UploadFileService } from '../../../services/uploadService';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from "@angular/router";
import { AngularFireList } from 'angularfire2/database';
import { FileUpload } from 'src/app/models/fileupload.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss']
})
export class ImageComponent implements OnChanges {

  @Input() key: any;
  obj: FileUpload = new FileUpload(null);
  url: string;
  name: string;


  constructor(private uploadService: UploadFileService, private modalService: NgbModal, private route: ActivatedRoute) {

    //console.log("key: ", this.key);
  }

  //ngOnInit() {
  //  //this.uploadService.getFileUploadsbykey(this.key).subscribe(p => {
  //  //  this.obj = p;
  //  //});
  //}
  ngOnChanges(changes: SimpleChanges) {
    // only run when property "data" changed
    if (changes['key']) {
      this.key.get().then(snap => {
        var img = snap.data()

        this.url = img.url;
        this.name = img.name;
      })

      //this.uploadService.getFileUploadsbykey(this.key).subscribe(p => {
      //  this.obj = p;
      //});
    }
  }
}
