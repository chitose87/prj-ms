import {Store} from 'vuex'
import {getModule} from 'vuex-module-decorators'
import Login from '~/store/login'
import Task from "~/store/task";
import User from "~/store/user";
import Param from "~/store/param";

let loginStore: Login;
let userStore: User;
let taskStore: Task;
let paramStore: Param;

function initialiseStores(store: Store<any>): void {
  loginStore = getModule(Login, store);
  userStore = getModule(User, store);
  taskStore = getModule(Task, store);
  paramStore = getModule(Param, store);
}

export {
  initialiseStores,
  loginStore,
  userStore,
  taskStore,
  paramStore
}
