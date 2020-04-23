<template lang="pug">
  .task-page.pt-4.pb-4.h-100
    .container-fluid.h-100(v-if="getData()")
      .form-group.title
        input.form-control.font-weight-bolder(type="text" v-model="data.title")
      .form-group.flex-grow-1.description
        textarea.form-control(v-model="data.description")

      .form-row
        .col.form-group.adminUsers
          label 管理者
          select.form-control(v-model="data.adminUsers" multiple)
            option(v-for="item in paramStore.email" :value="item" v-html="item.match(/(.*)(?=@)/)[0]")

        .col.form-group.currentUsers
          label 担当者
          select.form-control(v-model="data.currentUsers" multiple)
            option(v-for="item in paramStore.email" :value="item" v-html="item.match(/(.*)(?=@)/)[0]")

      .form-row
        .col.form-group.status
          label ステータス
          select.form-control(v-model="data.status")
            option(v-for="item in paramStore.status" :value="item") {{item}}

        .col.form-group.category
          label カテゴリ
          select.form-control(v-model="data.category")
            option(v-for="item in paramStore.category" :value="item") {{item}}

        .col.form-group.importance
          label 重要度
          input.form-control(type="number" v-model="data.importance")

      .form-row
        .col.form-group
          label 期限日
          input.form-control(type="date" v-model="data.targetDate")
        .col.form-group
          label 最終期限日
          input.form-control(type="date" v-model="data.deadlineDate")
      span(v-html="data.id")
      span(v-html="data.projectId")
      span(v-html="data.tags")
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
  import {paramStore, taskStore} from "~/utils/store-accessor";
  import GapiMgr from "~/utils/GapiMgr";
  import Utils from "~/utils/Utils";

  @Component({
    layout: 'dashbord',
    components: {}
  })
  export default class TaskPage extends Vue {
    paramStore = paramStore;
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
        GapiMgr.batchGet(this.$route.params.sheetID, {
          range: "Master", callBack: (csv: any[][]) => {
            let v = Utils.csv2Json(csv);
            let index = -1;
            for (let i in v.dic) {
              //@ts-ignore
              let item = <IRecordData>v.dic[i];
              if (item.id == this.data!.id) {

                index = item.index;
                break;
              }
            }
            if (index == -1) return new Error("hogeeee");

            let row = [];
            for (let key in this.data) {
              if (key == "index") continue;
              //@ts-ignore
              let val = this.data[key];
              if (typeof val === "object") {
                row[v.keyByIndex[key]] = JSON.stringify(val);
              } else {
                row[v.keyByIndex[key]] = val;
              }
            }

            //save
            GapiMgr.updateRow(this.$route.params.sheetID, "Master!A" + (index + 1), row).then(() => {
            });
            this.data!.index = index;
            v.dic[this.data!.id] = this.data!;
            taskStore.add(v.dic);
            // console.log(v.dic);
          }
        });
      }
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
