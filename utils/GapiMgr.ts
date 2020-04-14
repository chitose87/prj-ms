export default class GapiMgr {
  static signIn() {
    gapi.auth2.getAuthInstance().signIn();
  }

  static signOut() {
    gapi.auth2.getAuthInstance().signOut();
  }

  static getAllData(sheetID: string, sheetName: string) {

    return new Promise((resolve, reject) => {
      gapi.client.sheets.spreadsheets.values.batchGet({
        spreadsheetId: sheetID,
        ranges: sheetName,
        // valueRenderOption: '',
        // dateTimeRenderOption: '',
      }).then((response) => {
        console.log(response.result);
        resolve(response);
      }, (reason) => {
        console.error('error: ' + reason.result.error.message);
      });
    });
  }
}
