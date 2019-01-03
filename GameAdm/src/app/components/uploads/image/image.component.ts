import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
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
export class ImageComponent implements OnInit {

  @Input() key: string;
  obj: FileUpload = new FileUpload(null);


  constructor(private uploadService: UploadFileService, private modalService: NgbModal, private route: ActivatedRoute) { }

  ngOnInit() {

    this.uploadService.getFileUploadsbykey(this.key).subscribe(p => {
      this.obj = p;
    });
  }
}
