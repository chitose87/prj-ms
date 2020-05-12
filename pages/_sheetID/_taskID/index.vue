<template lang="pug">
  .task-page
    TaskDetailComp(:taskId="$route.params.taskID")
</template>

<script lang="ts">
  import {Component, Prop} from "~/node_modules/vue-property-decorator";
  import {Vue} from "~/node_modules/nuxt-property-decorator";
  import TaskDetailComp from "~/components/TaskDetailComp.vue";
  import {loginStore, paramStore} from "~/utils/store-accessor";

  @Component({
    // layout: 'dashbord',
    components: {TaskDetailComp}
  })
  export default class TaskPage extends Vue {
    loginStore = loginStore;
    paramStore = paramStore;
    dashboardX = paramStore.layout.dashboard;
    isAnimation = false;
  }
</script>

<style lang="scss" scoped>
  .task-page {
    width: 100%;
  }
</style>
