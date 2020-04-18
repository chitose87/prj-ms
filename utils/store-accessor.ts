import {Store} from 'vuex'
import {getModule} from 'vuex-module-decorators'
import Login from '~/store/login'
import Task from "~/store/task";

let loginStore: Login;
let taskStore: Task;

function initialiseStores(store: Store<any>): void {
  loginStore = getModule(Login, store);
  taskStore = getModule(Task, store);
}

export {
  initialiseStores,
  loginStore,
  taskStore
}
