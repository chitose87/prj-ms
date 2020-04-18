import {Module, VuexModule, Mutation} from 'vuex-module-decorators'
import {IRecordData} from "~/utils/Record";

@Module({name: 'task', stateFactory: true, namespaced: true})

export default class Task extends VuexModule {
  task: { [key: number]: IRecordData } = <{ [key: number]: IRecordData }>{};

  @Mutation
  add(json: { [key: number]: IRecordData }) {
    this.task = json;
  }

  get list() {
    return this.task;
  }

}
