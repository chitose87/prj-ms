import {Module, VuexModule, Mutation} from 'vuex-module-decorators'

@Module({name: 'user', stateFactory: true, namespaced: true})

export default class User extends VuexModule {
  name: string = "";
  email: string = "";

  @Mutation
  update(user: { name: string, email: string }) {
    this.name = user.name;
    this.email = user.email;
  }
}
