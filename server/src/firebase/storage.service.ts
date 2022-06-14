import * as firebase from 'firebase-admin';
import { FirebaseApp } from './firebase-app';
import { firebaseConfig } from "../../config";
import { v4 as uuid } from 'uuid';

export class StorageFileDto {
    originalName: string;
    buffer: Buffer;
}

export class StorageService {
    private bucket: string;
    private storage: firebase.storage.Storage;

    constructor(private firebaseApp: FirebaseApp) {
        this.bucket = firebaseConfig.storage_bucket;
        this.storage = this.firebaseApp.getStorage()
    }

    async saveSingleFile(file: StorageFileDto): Promise<string> {
        try {
          const id = uuid();
          const fileEx = file.originalName.split('.').at(-1)
          const path = `${id}.${fileEx}`
          const storageFile = this.storage.bucket(this.bucket).file(path);
          await storageFile.save(file.buffer);
          const res = this.getReturnPath(path);
          return res;

        } catch (error) {
          throw new Error(error?.message);
        }
      }

      private getReturnPath(path: string) {
        
        const storageFilePath = path.replace(/\//g, '%2F');
        return `https://firebasestorage.googleapis.com/v0/b/${firebaseConfig.project_id}.appspot.com/o/${storageFilePath}?alt=media`;
      }
}