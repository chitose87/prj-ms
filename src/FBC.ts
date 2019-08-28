import * as firebase from "firebase";
import QuerySnapshot = firebase.firestore.QuerySnapshot;

export class FBC {
  static instance: FBC;
  static pageListRef: any;
  static pageListData: any = {
    val: {}
  };
  static settingRef: firebase.database.Reference;
  static settingData: any = {val: {}};
  static siteId: string;
  private static _callback: any = null;

  static get pageData(): string {
    return FBC.siteId + "/pageData/";
  }

  static get pageList(): string {
    return FBC.siteId + "/pageList/";
  }

  static init(callback: any) {
    if (FBC.instance) return;
    FBC._callback = callback;
    FBC.instance = new FBC();
  }

  constructor() {
    firebase.initializeApp({
      apiKey: "AIzaSyCpPsxRTQKvLhPfRanqaautuh4Mt1fLrSg",
      authDomain: "prj-ms.firebaseapp.com",
      databaseURL: "https://prj-ms.firebaseio.com",
      projectId: "prj-ms",
      storageBucket: "prj-ms.appspot.com",
      messagingSenderId: "134187786569"
    });

    // let db = firebase.firestore();
    // console.log(db);
    // db.collection("users").onSnapshot((snapshot: QuerySnapshot) => {
    //   console.log(snapshot);
    // })
    // db.collection("users").add({
    //   first: "Ada",
    //   last: "Lovelace",
    //   born: 1815
    // })
    //   .then(function (docRef) {
    //     console.log("Document written with ID: ", docRef.id);
    //   })
    //   .catch(function (error) {
    //     console.error("Error adding document: ", error);
    //   });
    //
    // setTimeout(() => {
    //   db.collection("users").get().then((querySnapshot) => {
    //     querySnapshot.forEach((doc) => {
    //       console.log(`${doc.id} => ${doc.data()}`);
    //     });
    //   });
    // }, 3000);

    firebase.auth().signInAnonymously().catch(function (error: any) {
      // Handle Errors here.
      // var errorCode = error.code;
      // var errorMessage = error.message;
      // console.log(errorCode, errorMessage)
    });

    firebase.auth().onAuthStateChanged((user: any) => {
      FBC._callback();
      // console.log("onAuthStateChanged", user);

      // FBC.settingRef = firebase.database().ref("/settings/");
      // FBC.settingRef.once("value", (snap: any) => {
      //   FBC.settingData.val = snap.val();
      //   console.log("FBC.settingData.val", FBC.settingData.val);
      //   //
      //
      //   //get pageList
      //   FBC.pageListRef = firebase.database().ref(FBC.siteId + "/pageList/");
      //   FBC.pageListRef.on("value", (snap: any) => {
      //     FBC.pageListData.val = snap.val();
      //   });
      // });
    });
  }
}
