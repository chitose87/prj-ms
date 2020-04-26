import {loginStore, userStore} from "~/utils/store-accessor";

gapi.load('client:auth2', () => {
  gapi.client.init({
    apiKey: process.env.apiKey,
    clientId: process.env.clientId,
    discoveryDocs: [
      "https://sheets.googleapis.com/$discovery/rest?version=v4",
      // "https://www.googleapis.com/discovery/v1/apis/drive/v3/rest"
    ],
    scope: [
      "https://www.googleapis.com/auth/spreadsheets",
      // "https://www.googleapis.com/auth/drive"
    ].join(" ")
  }).then(() => {
    gapi.auth2.getAuthInstance().isSignedIn.listen(changeLogin);
    changeLogin(gapi.auth2.getAuthInstance().isSignedIn.get());
  }, (error) => {
    console.log(error);
  });
});

function changeLogin(flag: boolean) {
  loginStore.change(flag);
  console.log("changeLogin", flag);
  if (flag) {
    let user = gapi.auth2.getAuthInstance().currentUser.get();
    let profile = user.getBasicProfile();
    userStore.update({name: profile.getName(), email: profile.getEmail()});
  }
}
