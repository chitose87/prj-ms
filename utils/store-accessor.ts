import {Store} from 'vuex'
import {getModule} from 'vuex-module-decorators'
import Login from '~/store/login'
import Task from "~/store/task";
import User from "~/store/user";

let loginStore: Login;
let userStore: User;
let taskStore: Task;

function initialiseStores(store: Store<any>): void {
  loginStore = getModule(Login, store);
  userStore = getModule(User, store);
  taskStore = getModule(Task, store);
}

export {
  initialiseStores,
  loginStore,
  userStore,
  taskStore
}
