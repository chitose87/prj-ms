import {Store} from 'vuex'
import {getModule} from 'vuex-module-decorators'
import Login from '~/store/login'

let loginStore: Login;

function initialiseStores(store: Store<any>): void {
  loginStore = getModule(Login, store)
}

export {initialiseStores, loginStore}
