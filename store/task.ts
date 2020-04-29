import {Module, VuexModule, Mutation} from 'vuex-module-decorators'
import {IRecordData} from "~/utils/Record";

@Module({name: 'task', stateFactory: true, namespaced: true})

export default class Task extends VuexModule {
  dic: { [key: number]: IRecordData } = <{ [key: number]: IRecordData }>{};
  task: IRecordData[] = [];

  @Mutation
  add(json: any) {
    this.dic = json;
    for (let i in json) {
      let item: IRecordData = json[i];
      if (!item.adminUsers) item.adminUsers = [];
      if (!item.currentUsers) item.currentUsers = [];
      if (!item.log) item.log = [];
      if (!item.viewed) item.viewed = {};
      //set parent
      if (item.parentTaskId) {
        let child = json[item.parentTaskId].child || [];
        child.push(item);
        json[item.parentTaskId].child = child;
      }
    }

    //craete list
    let tasks: IRecordData[] = [];
    for (let i in json) {
      let item = json[i];
      if (!item.parentTaskId) {
        hoge(item, 0);
      }
    }
    console.log(tasks.length)
    this.task = tasks;

    function hoge(item: IRecordData, gen: number) {
      gen++;
      item.gen = gen;
      tasks.push(item);
      for (let i in item.child) {
        hoge(item.child[i], gen);
      }
    }
  }

  // get list() {
  //   return this.task;
  // }

}
