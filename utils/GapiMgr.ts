import {IRecordData} from "~/utils/Record";

export default class GapiMgr {
  static keyByIndexOfMaster: { [keys: string]: number } = {};

  static signIn() {
    gapi.auth2.getAuthInstance().signIn();
  }

  static signOut() {
    gapi.auth2.getAuthInstance().signOut();
  }

  static getMeta(sheetID: string, callBack: (a: any) => void) {
    gapi.client.sheets.spreadsheets.get({
      spreadsheetId: sheetID,
      ranges: "Master",
      includeGridData: false
    }).then((response) => {
      callBack(response.result);
    }, (e: Error) => {
      console.log(e);
    });
  }

  static batchGet(sheetID: string, ...rangeReqs: { range: string, callBack: (csv: any[][]) => void }[]) {
    let ranges = [];
    for (let req of rangeReqs) {
      ranges.push(req.range);
    }
    gapi.client.sheets.spreadsheets.values.batchGet({
      spreadsheetId: sheetID,
      ranges: ranges,
      valueRenderOption: 'UNFORMATTED_VALUE',
      // dateTimeRenderOption: 'SERIAL_NUMBER',
      dateTimeRenderOption: 'FORMATTED_STRING',
    }).then((response) => {
      for (let i in response.result.valueRanges!) {
        rangeReqs[i].callBack(response.result.valueRanges[i].values!);
      }
    }, (e: Error) => {
      console.log(e);
    });
  }

  static updateRow(sheetID: string, ranges: string, row: any[]) {
    return new Promise((resolve, reject) => {
      gapi.client.sheets.spreadsheets.values.batchUpdate({
        spreadsheetId: sheetID
      }, {
        valueInputOption: "USER_ENTERED",
        data: [
          {
            range: ranges,
            values: [row],
            majorDimension: "ROWS"
          }
        ],
        // includeValuesInResponse: false,
        // responseValueRenderOption: "FORMULA",
        // responseDateTimeRenderOption: "FORMATTED_STRING"
      }).then((response) => {
        resolve();
        // console.log(response)
      }, reject);
    });
  }

  static insertRow(sheetID: string, ranges: string, row: any[], callBack: any) {
    console.log("insertRow", row);
    gapi.client.sheets.spreadsheets.values.append({
      spreadsheetId: sheetID,
      range: ranges,
      valueInputOption: "USER_ENTERED",
      insertDataOption: "INSERT_ROWS",
      //@ts-ignore
      resource: {
        values: [
          row
        ]
      }
    }, {}).then((response: any) => {
      console.log(response)
      callBack();
      // for (let i in response.result.valueRanges!) {
      //   rangeReqs[i].callBack(response.result.valueRanges[i].values!);
      // }
    }, (e: Error) => {
      console.log(e);
    });
  }

}
