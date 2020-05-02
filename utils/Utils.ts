export default class Utils {

  static csv2Json(csv: any[][]): any {
    let dic: any = {};
    let keysRow = csv.shift();
    let index = 0;
    for (let row of csv) {
      index++;
      if (row[0] == "pass") continue;
      let item: any = {index: index};
      for (let i = row.length; i >= 0; --i) {
        let v = row[i];
        if (typeof v == "string" && v.indexOf("[") == 0) v = JSON.parse(v);
        item[keysRow![i]] = v;
      }
      dic[item.id] = item;
    }
    return dic;
  }

  static csv2List(csv: any[][]): { [keys: string]: any } {
    let dic: { [keys: string]: any[] } = {};
    let keysRow = csv.shift()!;
    for (let i in keysRow) {
      dic[keysRow[i]] = [];
    }

    let index = -1;
    for (let row of csv) {
      index++;
      if (row[0] == "pass") continue;
      for (let i = row.length; i >= 0; --i) {
        let v = row[i];
        if (v) {
          dic[keysRow[i]][index] = v;
        }
      }
    }
    // console.log(dic);
    return dic;
  }

  static getEmailName(email: string) {
    let r = email.match(/(.*)(?=@)/);
    return r && r![0] || email;
  }
}
