export default class Utils {

  static csv2Json(csv: any[][]): { dic: any, keyByIndex: { [keys: string]: number } } {
    let keyByIndex: { [keys: string]: number } = {};
    let dic: any = {};
    let keysRow = csv.shift();
    for (let i in keysRow) {
      //@ts-ignore
      keyByIndex[keysRow[i]] = i;
    }

    let index = 0;
    for (let row of csv) {
      index++;
      if (row[0] == "pass") continue;
      let item: any = {index: index};
      for (let i = row.length; i >= 0; --i) {
        item[keysRow![i]] = row[i];
      }
      dic[item.id] = item;
    }
    return {dic: dic, keyByIndex: keyByIndex}
  }

  static csv2List(csv: any[][]): { [keys: string]: any } {
    let dic: { [keys: string]: any } = {};
    let keysRow = csv.shift()!;
    for (let i in keysRow) {
      dic[keysRow[i]] = {};
    }

    let index = 0;
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
    return dic;
  }
}
