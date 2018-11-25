import { Component, OnInit, Input } from '@angular/core';
import { UploadFileService } from '../../services/uploadService';
import { FileUpload } from '../../models/fileupload.model';
import { ImageCroppedEvent } from 'ngx-image-cropper/src/image-cropper.component';

@Component({
  selector: 'form-upload',
  templateUrl: './form-upload.component.html',
  styleUrls: ['./form-upload.component.scss']
})
export class FormUploadComponent implements OnInit {

  selectedFiles: FileList;
  currentFileUpload: FileUpload;
  imageChangedEvent: any = '';
  croppedImage: any = '';
  croppedImagefile: any = '';
  progress: { percentage: number } = { percentage: 0 };
  @Input() preview: boolean = false;

  constructor(private uploadService: UploadFileService) { }

  ngOnInit() {
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
    
    this.selectedFiles = undefined;

    this.currentFileUpload = new FileUpload(file);
    const blob = this.blobToFile(this.croppedImagefile, this.currentFileUpload.file.name);
    
    this.currentFileUpload.file = blob.file;
    this.uploadService.pushFileToStorage(this.currentFileUpload, this.progress);
  }
  imageLoaded() {
    // show cropper
  }
  loadImageFailed() {
    // show message
  }
  blobToFile(theBlob, fileName) {
    //A Blob() is almost a File() - it's just missing the two properties below which we will add
    theBlob.file.lastModifiedDate = new Date();
    theBlob.file.name = fileName;
    return theBlob;
  }
}