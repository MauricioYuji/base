import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AngularFireStorage, AngularFireUploadTask } from 'angularfire2/storage';
import * as firebase from 'firebase/app';

import { FileUpload } from '../models/fileupload.model';
import { finalize, map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class UploadFileService {

    private basePath = '/uploads';
    private uploadTask: AngularFireUploadTask;

    constructor(private db: AngularFireDatabase, private storage: AngularFireStorage) { }

    pushFileToStorage(fileUpload: FileUpload, progress: { percentage: number }) {
        const storageRef = this.storage.ref('');
        const storageRefChild = storageRef.child(`${this.basePath}/${fileUpload.file.name}`);
        this.uploadTask = storageRefChild.put(fileUpload.file);

        this.uploadTask.snapshotChanges().subscribe(snap => {
            progress.percentage = Math.round((snap.bytesTransferred / snap.totalBytes) * 100);
            if (progress.percentage == 100) {
                //storageRefChild.getDownloadURL().pipe(map(p => {
                //    const downloadURL = p;
                //    console.log('File available at', downloadURL);
                //    fileUpload.url = downloadURL;
                //    fileUpload.name = fileUpload.file.name;
                //    this.saveFileData(fileUpload);
                //}));
                storageRefChild.getDownloadURL().subscribe(p => {
                    const downloadURL = p;
                    console.log('File available at', downloadURL);
                    fileUpload.url = downloadURL;
                    fileUpload.name = fileUpload.file.name;
                    this.saveFileData(fileUpload);
                });

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
        this.db.list(`${this.basePath}/`).push(fileUpload);
    }

    getFileUploads(numberItems): AngularFireList<FileUpload> {
        return this.db.list(this.basePath, ref =>
            ref.limitToLast(numberItems));
    }

    deleteFileUpload(fileUpload: FileUpload) {
        this.deleteFileDatabase(fileUpload.key)
            .then(() => {
                this.deleteFileStorage(fileUpload.name);
            })
            .catch(error => console.log(error));
    }

    private deleteFileDatabase(key: string) {
        return this.db.list(`${this.basePath}/`).remove(key);
    }

    private deleteFileStorage(name: string) {
        const storageRef = firebase.storage().ref();
        storageRef.child(`${this.basePath}/${name}`).delete();
    }
}
