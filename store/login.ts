import {Module, VuexModule, Mutation} from 'vuex-module-decorators'

@Module({name: 'login', stateFactory: true, namespaced: true})

export default class Login extends VuexModule {
  login: boolean = false;

  @Mutation
  change(flag: boolean) {
    this.login = flag;
  }

  get   status() {
    return this.login;
  }
}
