import {Module, VuexModule, Mutation} from 'vuex-module-decorators'

@Module({name: 'param', stateFactory: true, namespaced: true})

export default class Param extends VuexModule {
  status: string[] = [];
  email: string[] = [];
  category: string[] = [];

  @Mutation
  update(param: any) {
    this.status = param.status;
    this.email = param.email;
    this.category = param.category;
  }
}
