<template lang="pug">
  .task-page.pt-4.pb-4.h-100
    .container-fluid.h-100(v-if="getData()")
      .title.form-group
        input.form-control.font-weight-bolder(type="text" v-model="data.title")
      .description.form-group.flex-grow-1
        textarea.form-control(v-model="data.description")

      span(v-html="data.taskId")
      span(v-html="data.projectId")
      span(v-html="data.category")
      span(v-html="data.tags")
      span(v-html="data.status")
      span(v-html="data.adminUsers")
      span(v-html="data.currentUsers")
      span(v-html="data.targetDate")
      span(v-html="data.deadlineDate")
      span(v-html="data.importance")
      span(v-html="data.parentTaskId")

      .row.ui.pt-4.pb-4.bg-white.border-top
        .col
          button.btn.btn-primary.btn-block(@click="onSave()")
            span Save
        .col
          button.btn.btn-secondary.btn-block(@click="")
            span Cancel

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
    before: IRecordData = this.data!;

    mounted() {
    }

    getData() {
      let data = taskStore.list[Number.parseInt(this.$route.params.taskID)];
      if (this.before != data) {
        this.data = Object.assign({}, data);
        console.log(this.data, data);
        this.before = data;
      }
      return this.data;
    }

    getTask() {
      return taskStore.list;
    }

    onSave() {
      let flag = true;
      for (let i in this.before) {
        //@ts-ignore
        if (this.before[i] != this.data[i]) {
          flag = false;
          //@ts-ignore
          console.log(i, this.before[i], this.data[i]);
        }
      }
      if (!flag) {
        GapiMgr.getAllData(this.$route.params.sheetID, "Master").then((json: { number: IRecordData }) => {
          let index = -1;
          for (let i in json) {
            //@ts-ignore
            let item = <IRecordData>json[i];
            if (item.taskId == this.data!.taskId) {

              index = item.index;
              break;
            }
          }
          if (index == -1) return new Error("hogeeee");

          let row = [];
          for (let key in this.data) {
            if (key == "index") continue;
            //@ts-ignore
            row[GapiMgr.keyByIndexOfMaster[key]] = this.data[key];
          }

          GapiMgr.updateRow(this.$route.params.sheetID, "Master!A" + (index + 1), row).then(() => {
            this.data!.index = index;
            //@ts-ignore
            json[this.data!.taskId] = this.data!;
            taskStore.add(json);
            console.log(json);
          });
          console.log("hogehoge", index, row);
        }, (e) => {

        });
      }
      // GapiMgr.save(this.$route.params.sheetID, "Master");
    }
  }
</script>

<style lang="scss">
  .task-page {
    .container-fluid {
      display: flex;
      flex-direction: column;
    }

    .title {

    }

    .description {
      textarea {
        height: 100%
      }
    }

    .ui {
      position: sticky;
      bottom: 0;
    }
  }
</style>
