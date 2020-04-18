<template lang="pug">
  .task-page
    div(v-if="getData()")
      span(v-html="data.taskId")
      span(v-html="data.projectId")
      span(v-html="data.category")
      span(v-html="data.tags")
      input(type="text" v-model="data.title")
      textarea(v-model="data.description")
      span(v-html="data.status")
      span(v-html="data.adminUsers")
      span(v-html="data.currentUsers")
      span(v-html="data.targetDate")
      span(v-html="data.deadlineDate")
      span(v-html="data.importance")
      span(v-html="data.parentTaskId")

      button(@click="onSave()")
        span SAVE

</template>

<script lang="ts">
  import {Component, Prop} from "~/node_modules/vue-property-decorator";
  import {Vue} from "~/node_modules/nuxt-property-decorator";
  import {IRecordData} from "~/utils/Record";
  import {taskStore} from "~/utils/store-accessor";
  import GapiMgr from "~/utils/GapiMgr";

  @Component({
    layout: 'dashbord',
    components: {}
  })
  export default class TaskPage extends Vue {
    data?: IRecordData;

    mounted() {
    }

    getData() {
      let data = taskStore.list[Number.parseInt(this.$route.params.taskID)];
      if (this.data != data) {
        this.data = data;
      }
      return data;
    }

    getTask() {
      return taskStore.list;
    }

    onSave() {
      GapiMgr.save(this.$route.params.sheetID, "Master");
    }
  }
</script>

<style lang="scss">
  .task-page {
    background-color: $color-green;
  }
</style>
