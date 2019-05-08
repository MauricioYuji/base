import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AngularFireStorage, AngularFireUploadTask } from 'angularfire2/storage';
import * as firebase from 'firebase/app';

import { FileUpload } from '../models/fileupload.model';
import { finalize, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';

@Injectable({
  providedIn: 'root'
})
export class UploadFileService {

  private basePath = '/thumbs';
  private uploadTask: AngularFireUploadTask;
  private itemDoc: AngularFirestoreCollection<any>;
  private itemFile: AngularFirestoreDocument<any>;

  constructor(private db: AngularFireDatabase, private storage: AngularFireStorage, private afs: AngularFirestore) { }

  pushFileToStorage(fileUpload: FileUpload, progress: { percentage: number }, emitfunction: any) {
    //console.log("fileUpload: ", fileUpload);
    const storageRef = this.storage.ref('');
    const storageRefChild = storageRef.child(`${this.basePath}/${fileUpload.file.name}`);
    this.uploadTask = storageRefChild.put(fileUpload.file);

    this.uploadTask.snapshotChanges().subscribe(snap => {


      var porcentage = Math.round((snap.bytesTransferred / snap.totalBytes) * 100);
      progress.percentage = Math.round(porcentage);
      if (porcentage == 100) {
        //progress.percentage = Math.round((snap.bytesTransferred / snap.totalBytes) * 100);
        //if (progress.percentage == 100) {
        //storageRefChild.getDownloadURL().pipe(map(p => {
        //    const downloadURL = p;
        //    console.log('File available at', downloadURL);
        //    fileUpload.url = downloadURL;
        //    fileUpload.name = fileUpload.file.name;
        //    this.saveFileData(fileUpload);
        //}));
        console.log("UPLOAD CONCLUIDO");
        var _self = this;
        //console.log("storageRefChild: ", storageRefChild);
        //storageRefChild.getDownloadURL().then(function (url) {
        //  const downloadURL = url;

        //  console.log("downloadURL: ", downloadURL);
        //  emitfunction.emit(true);
        //  console.log('File available at', downloadURL);
        //  fileUpload.url = downloadURL;
        //  //fileUpload.name = (256 * (+new Date)).toString(36).toUpperCase();
        //  _self.saveFileData(fileUpload);
        //}).catch(function (error) {
        //  // Handle any errors here
        //});
        setTimeout(function () {
          storageRefChild.getDownloadURL().subscribe(p => {
            const downloadURL = p;

            console.log("downloadURL: ", downloadURL);
            emitfunction.emit(true);
            console.log('File available at', downloadURL);
            fileUpload.url = downloadURL;
            //fileUpload.name = (256 * (+new Date)).toString(36).toUpperCase();
            _self.saveFileData(fileUpload);
          });
        }, 3000);
      }
    });
    //progress.percentage = uploadTask.percentageChanges();
    //this.uploadTask.snapshotChanges().pipe(
    //    finalize(() => {
    //    }));

    //uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
    //  (snapshot) => {
    //    // in progress
    //    const snap = snapshot as firebase.storage.UploadTaskSnapshot;
    //    progress.percentage = Math.round((snap.bytesTransferred / snap.totalBytes) * 100);
    //  },
    //  (error) => {
    //    // fail
    //    console.log(error);
    //  },
    //  () => {
    //    // success
    //    uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
    //      console.log('File available at', downloadURL);
    //      fileUpload.url = downloadURL;
    //      fileUpload.name = fileUpload.file.name;
    //      this.saveFileData(fileUpload);
    //    });
    //  }
    //);
  }

  public saveFileData(fileUpload: FileUpload) {
    console.log("fileUpload: ", fileUpload);
    this.db.list(`${this.basePath}/`).push(fileUpload);
    var _self = this;
    var obj: any = {};
    var blob: any = fileUpload.file;
    obj.url = fileUpload.url;
    obj.width = blob.width;
    obj.height = blob.height;
    obj.name = blob.name;
    this.itemDoc = _self.afs.collection<any>('Assets');
    this.itemDoc.add(Object.assign({}, obj));

  }

  public getFileUploads(numberItems): AngularFireList<FileUpload> {
    return this.db.list(this.basePath, ref =>
      ref.limitToLast(numberItems));
  }

  public getFileUploadsall(): AngularFireList<FileUpload> {
    return this.db.list(this.basePath, ref =>
      ref);
  }
  public getFileUploadsbykey(key: string): Observable<FileUpload> {
    return this.db.object(this.basePath + "/" + key).valueChanges() as Observable<FileUpload>;
  }

  //public getFileUploadsall(): Observable<FileUpload[]> {

  //  return this.db.list(this.basePath).valueChanges() as Observable<FileUpload[]>;
  //}

  public deleteFileUpload(fileUpload: FileUpload) {
    console.log("DELETE DATA: ", fileUpload);
    this.deleteFileDatabase(fileUpload.key)
      .then(() => {
        this.deleteFileStorage(fileUpload.name);
      })
      .catch(error => console.log(error));
  }

  private deleteFileDatabase(key: string) {
    console.log("key: ", key);
    this.itemFile = this.afs.collection('Assets').doc(key);
    console.log("this.itemFile: ", this.itemFile);
    this.itemFile.delete();
    return this.db.list(`${this.basePath}/`).remove(key);
  }

  private deleteFileStorage(name: string) {
    console.log("DELETE FILE: ", name);
    //const storageRef = firebase.storage().ref();
    const storageRef = this.storage.ref('');
    storageRef.child(`${this.basePath}/${name}`).delete();
  }
}
