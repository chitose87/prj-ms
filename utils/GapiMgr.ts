import {IRecordData} from "~/utils/Record";

export default class GapiMgr {
  static keyByIndexOfMaster: { [keys: string]: number } = {};

  static signIn() {
    gapi.auth2.getAuthInstance().signIn();
  }

  static signOut() {
    gapi.auth2.getAuthInstance().signOut();
  }

  static getAllData(sheetID: string, ranges: string) {
    console.log("getAllData", sheetID);

    return new Promise<{ number: IRecordData }>((resolve, reject) => {
      gapi.client.sheets.spreadsheets.values.batchGet({
        spreadsheetId: sheetID,
        ranges: ranges,
        valueRenderOption: 'UNFORMATTED_VALUE',
        dateTimeRenderOption: 'SERIAL_NUMBER',
      }).then((response) => {
        console.log(response.result);
        try {
          let values = response.result.valueRanges![0].values;
          let json = this.csv2Json(values, this.keyByIndexOfMaster);
          resolve(json);
        } catch (e) {
          reject(e);
        }
      }, reject);
    });
  }

  private static csv2Json(values: any, keyByIndex: { [keys: string]: number }) {
    let dic: any = {};
    let keysRow = values.shift();
    for (let i in keysRow) {
      //@ts-ignore
      keyByIndex[keysRow[i]] = i;
    }

    let index = 0;
    for (let row of values) {
      index++;
      if (row[0] == "pass") continue;
      let item: any = {index: index};
      for (let i = row.length; i >= 0; --i) {
        item[keysRow[i]] = row[i];
      }
      dic[item.taskId] = item;
    }
    return dic;
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
}
