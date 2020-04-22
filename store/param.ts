import {Module, VuexModule, Mutation} from 'vuex-module-decorators'

@Module({name: 'param', stateFactory: true, namespaced: true})

export default class Param extends VuexModule {
  status: string[] = [];
  email: string[] = [];
  category: string[] = [];
  headerOrder: { name: string, label: string, show: boolean }[] = [
    {name: "id", label: "ID", show: true},
    {name: "title", label: "Title", show: true},
    {name: "category", label: "Category", show: true},
    {name: "tags", label: "Tags", show: true},
    {name: "status", label: "Status", show: true},
    {name: "importance", label: "重要度", show: true},
    {name: "adminUsers", label: "管理者", show: true},
    {name: "currentUsers", label: "担当者", show: true},
    {name: "targetDate", label: "期限日", show: true},
    {name: "deadlineDate", label: "最終期限日", show: true},
  ];

  @Mutation
  update(param: any) {
    this.status = param.status;
    this.email = param.email;
    this.category = param.category;
  }
}
