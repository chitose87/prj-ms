import {IRecordData} from "~/utils/Record";

export default class GapiMgr {
  static signIn() {
    gapi.auth2.getAuthInstance().signIn();
  }

  static signOut() {
    gapi.auth2.getAuthInstance().signOut();
  }

  static getAllData(sheetID: string, sheetName: string) {
    console.log("getAllData", sheetID)

    return new Promise<{ number: IRecordData }>((resolve, reject) => {
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

  private static csv2Json(values: any) {
    let dic: any = {};
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
      dic[item.taskId] = item;
    }
    return dic;
  }

  static save(sheetID: string, sheetName: string) {
    gapi.client.sheets.spreadsheets.values.batchUpdate({
      spreadsheetId: sheetID
    }, {
      "includeValuesInResponse": false,
      "valueInputOption": "USER_ENTERED",
      "data": [
        {
          "range": "D12",
          "values": [
            [
              "hoge"
            ]
          ],
          "majorDimension": "ROWS"
        }
      ],
      "responseValueRenderOption": "FORMULA",
      "responseDateTimeRenderOption": "FORMATTED_STRING"
    }).then((response) => {
      console.log(response)
    })
  }
}
