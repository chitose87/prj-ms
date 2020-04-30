import {Module, VuexModule, Mutation} from 'vuex-module-decorators'

@Module({name: 'param', stateFactory: true, namespaced: true})

export default class Param extends VuexModule {
  status: string[] = [];
  email: string[] = [];
  category: string[] = [];
  tags: string[] = [];
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
    this.tags = param.tags;
  }

  layout: any = (() => {
    let obj = JSON.parse(localStorage.getItem("layout") || "{}");
    return {
      title: (obj && obj.title) || 160,
      dashboard: (obj && obj.dashboard) || 500,
      taskDescription: (obj && obj.taskDescription) || 500,
      taskUser: (obj && obj.taskUser) || 100,
    }
  })();

  @Mutation
  updateE(param: { key: string, val: number }) {
    this.layout[param.key] = param.val;
    localStorage.setItem("layout", JSON.stringify(this.layout));
  }
}
