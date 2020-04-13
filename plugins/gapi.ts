// import {Singleton} from "~/assets/script/Singleton";
//
// gapi.load('client:auth2', () => {
//   gapi.client.init({
//     apiKey: process.env.apiKey,
//     clientId: process.env.clientId,
//     discoveryDocs: ["https://sheets.googleapis.com/$discovery/rest?version=v4"],
//     scope: "https://www.googleapis.com/auth/spreadsheets"
//   }).then(() => {
//     Singleton.isSignedIn = gapi.auth2.getAuthInstance().isSignedIn.get();
//     gapi.auth2.getAuthInstance().isSignedIn.listen((e: boolean) => {
//       console.log(e)
//       Singleton.isSignedIn = e;
//     });
//   }, function (error) {
//     console.log(error);
//   });
// });
