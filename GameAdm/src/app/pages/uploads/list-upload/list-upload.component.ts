import { Component, OnInit, Input } from '@angular/core';
import { map } from 'rxjs/operators';

import { UploadFileService } from '../../../services/uploadService';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from "@angular/router";
import { AngularFireList } from 'angularfire2/database';
import { FileUpload } from 'src/app/models/fileupload.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'list-upload',
  templateUrl: './list-upload.component.html',
  styleUrls: ['./list-upload.component.scss']
})
export class ListUploadComponent implements OnInit {

  //fileUploads: Observable<FileUpload[]>;
  fileUploads: FileUpload[];
  category: any = "";
  @Input() categoryinput: string;


  constructor(private uploadService: UploadFileService, private modalService: NgbModal, private route: ActivatedRoute) { }

  ngOnInit() {
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
        console.log("regex: ", regex);
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
  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
    }, (reason) => {
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
  private progressreturn(obj) {
    console.log("obj: ", obj);
    this.modalService.dismissAll();
  }
}
