import { Component, OnInit, Input } from '@angular/core';
import { UploadFileService } from '../../services/uploadService';
import { FileUpload } from '../../models/fileupload.model';

@Component({
  selector: 'details-upload',
  templateUrl: './details-upload.component.html',
  styleUrls: ['./details-upload.component.scss']
})
export class DetailsUploadComponent implements OnInit {

  @Input() fileUpload: FileUpload;

  constructor(private uploadService: UploadFileService) { }

  ngOnInit() {
  }

  deleteFileUpload(fileUpload) {
    this.uploadService.deleteFileUpload(fileUpload);
  }
}
