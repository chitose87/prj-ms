import {IRecordData} from "~/utils/Record";

export default class GapiMgr {
  static signIn() {
    gapi.auth2.getAuthInstance().signIn();
  }

  static signOut() {
    gapi.auth2.getAuthInstance().signOut();
  }

  static getAllData(sheetID: string, sheetName: string) {

    return new Promise<IRecordData[]>((resolve, reject) => {
      gapi.client.sheets.spreadsheets.values.batchGet({
        spreadsheetId: sheetID,
        ranges: sheetName,
        valueRenderOption: 'UNFORMATTED_VALUE',
        dateTimeRenderOption: 'SERIAL_NUMBER',
      }).then((response) => {
        console.log(response.result);
        try {
          let values = response.result.valueRanges![0].values;
          let json = this.csv2Json(values);
          resolve(json);
        } catch (e) {
          reject(e);
        }
      }, reject);
    });
  }

  private static csv2Json(values: any): any[] {
    let list: any[] = [];
    let kes = [];

    let keysRow = values.shift();
    for (let cell of keysRow) {
      kes.push(cell);
    }

    for (let row of values) {
      if (row[0] == "pass") continue;
      let item: any = {};
      for (let i = row.length; i >= 0; --i) {
        item[kes[i]] = row[i];
      }
      list.push(item);
    }
    return list;
  }
}
