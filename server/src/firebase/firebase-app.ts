import * as firebase from "firebase-admin";
import { firebaseConfig } from "../../config";

export class FirebaseApp {
  private firebaseApp: firebase.app.App;

  constructor() {
    this.firebaseApp = firebase.initializeApp({
      credential: firebase.credential.cert({
        clientEmail: firebaseConfig.client_email,
        privateKey: firebaseConfig.private_key,
        projectId: firebaseConfig.project_id,
      }),
    });
  }

  getStorage = (): firebase.storage.Storage => {
    return this.firebaseApp.storage();
  };
}
