import {loginStore} from "~/utils/store-accessor";

gapi.load('client:auth2', () => {
  gapi.client.init({
    apiKey: process.env.apiKey,
    clientId: process.env.clientId,
    discoveryDocs: ["https://sheets.googleapis.com/$discovery/rest?version=v4"],
    scope: "https://www.googleapis.com/auth/spreadsheets"
  }).then(() => {
    gapi.auth2.getAuthInstance().isSignedIn.listen(changeLogin);
    changeLogin(gapi.auth2.getAuthInstance().isSignedIn.get());
  }, (error) => {
    console.log(error);
  });
});

function changeLogin(flag: boolean) {
  loginStore.change(flag);
  console.log("changeLogin",flag)
}
