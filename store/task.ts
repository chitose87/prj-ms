import {Module, VuexModule, Mutation} from 'vuex-module-decorators'
import {IRecordData} from "~/utils/Record";
import {crimson} from "~/node_modules/@types/color-name";

@Module({name: 'task', stateFactory: true, namespaced: true})

export default class Task extends VuexModule {
  dic: { [key: number]: IRecordData } = <{ [key: number]: IRecordData }>{};
  task: IRecordData[] = [];
  viewed: number[][] = [];

  @Mutation
  add(json: any) {
    this.dic = json;
    for (let i in this.dic) {
      let item: IRecordData = this.dic[i];
      if (!item.adminUsers) item.adminUsers = [];
      if (!item.currentUsers) item.currentUsers = [];
      if (!item.log) item.log = [];
      if (!item.viewed) item.viewed = {};
      //set parent
      if (item.parentTaskId) {
        let child = this.dic[item.parentTaskId].child || [];
        child.push(item);
        this.dic[item.parentTaskId].child = child;
      }
    }
    this.task = Task.createList(this.dic);
  }

  @Mutation
  updateTask(data: IRecordData) {
    this.dic[data.id] = data;
    //set parent
    if (data.parentTaskId) {
      let child = this.dic[data.parentTaskId].child || [];
      child.push(data);
      this.dic[data.parentTaskId].child = child;
    }

    this.task = Task.createList(this.dic);
  }

  @Mutation
  updateViewed(csv: any[][]) {
    this.viewed = csv;
  }

  @Mutation
  updateViewedCell(param: { userId: number, taskID: any, timestamp: number }) {
    // console.log(this.viewed[param.userId - 1][Number.parseInt(param.taskID) - 1])
    this.viewed[param.userId - 1][Number.parseInt(param.taskID) - 1] = param.timestamp;
  }

  /**
   *
   * @param dic
   */
  private static createList(dic: { [key: number]: IRecordData }) {
    let tasks: IRecordData[] = [];
    for (let i in dic) {
      let item = dic[i];
      if (!item.parentTaskId) {
        pushChild(item, 0);
      }
    }
    return tasks;

    function pushChild(item: IRecordData, gen: number) {
      gen++;
      item.gen = gen;
      tasks.push(item);
      for (let i in item.child) {
        pushChild(item.child[i], gen);
      }
    }
  }

}
