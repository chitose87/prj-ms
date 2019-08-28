import * as firebase from "firebase";

export class ProjectData {
  name: string = "";
  path: string = "";

  constructor(doc: firebase.firestore.QueryDocumentSnapshot) {
    let data: firebase.firestore.DocumentData = doc.data();
    this.name = data.name;
    this.path=doc.ref.path;
  }
}
