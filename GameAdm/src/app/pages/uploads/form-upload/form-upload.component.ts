import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { UploadFileService } from '../../../services/uploadService';
import { FileUpload, typeUpload } from '../../../models/fileupload.model';
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
  aspect: number = 14 / 20;
  maintainAspectRatio: boolean = true;
  options: typeUpload = null;
  name: string = "";
  progress: { percentage: number } = { percentage: 0 };
  typelist = [{ category: "thumb", aspect: 14 / 20, maintainAspectRatio: true }, { category: "logo", aspect: 1, maintainAspectRatio: false }];
  category: any = null;
  @Input() preview: boolean = false;
  @Output() uploadsubmitted = new EventEmitter();

  constructor(private uploadService: UploadFileService) { }

  ngOnInit() {
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
    console.log("file: ", newFile);

    this.currentFileUpload = new FileUpload(newFile);
    console.log("this.currentFileUpload: ", this.currentFileUpload);
    this.currentFileUpload.category = this.options.category;
    const blob = this.blobToFile(this.croppedImagefile, this.currentFileUpload.file.name);

    blob.file.height = blob.height;
    blob.file.width = blob.width;

    console.log("blob: ", blob);
    this.currentFileUpload.file = blob.file;
    this.currentFileUpload.name = this.name;
    //console.log("this.currentFileUpload: ", this.currentFileUpload);

    this.uploadService.pushFileToStorage(this.currentFileUpload, this.progress, this.uploadsubmitted);
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
