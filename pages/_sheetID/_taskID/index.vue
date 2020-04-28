<template lang="pug">
  .task-page.pt-4.h-100
    .container-fluid(v-if="getData()")
      .form-group.title
        input.form-control.font-weight-bolder(type="text" v-model="data.title")
      .form-group.flex-grow-1.description
        textarea.form-control(v-model="data.description",:style="`height:${paramStore.layout.taskDescription}px`")
        NobComp(:layoutKey="'taskDescription'",:isVertical="true")

      .form-row
        .col.form-group.adminUsers
          label 管理者
          select.form-control(v-model="data.adminUsers" multiple)
            option(v-for="item in paramStore.email" :value="item" v-html="utils.getEmailName(item)")

        .col.form-group.currentUsers
          label 担当者
          select.form-control(v-model="data.currentUsers" multiple)
            option(v-for="item in paramStore.email" :value="item" v-html="utils.getEmailName(item)")

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

      .log
        LogComp(:data="data.log")

      .ui.bg-white.border-top.pt-4.pb-4
        .form-group.flex-grow-1.description
          textarea.form-control(v-model="comment",:disabled="isSaving")
        .row
          .col
            button.btn.btn-primary.btn-block(@click="onSave()",:disabled="isSaving")
              span Save
          //.col
            button.btn.btn-secondary.btn-block(@click="",:disabled="isSaving")
              span Cancel

</template>

<script lang="ts">
  import {Component, Prop} from "~/node_modules/vue-property-decorator";
  import {Vue} from "~/node_modules/nuxt-property-decorator";
  import {IRecordData} from "~/utils/Record";
  import {paramStore, taskStore, userStore} from "~/utils/store-accessor";
  import GapiMgr from "~/utils/GapiMgr";
  import Utils from "~/utils/Utils";
  import NobComp from "~/components/utils/NobComp.vue";
  import LogComp from "~/components/LogComp.vue";

  @Component({
    layout: 'dashbord',
    components: {LogComp, NobComp}
  })
  export default class TaskPage extends Vue {
    utils = Utils;
    paramStore = paramStore;
    userStore = userStore;
    data?: IRecordData;
    before: IRecordData = this.data!;
    isSaving = false;

    comment: string = "";

    mounted() {
    }

    getData() {
      let data = taskStore.list[Number.parseInt(this.$route.params.taskID)];
      if (this.before != data) {
        this.data = Object.assign({}, data);
        // console.log(this.data, data);
        this.before = data;

        GapiMgr.getComment(this.$route.params.sheetID, data, (e) => {
          console.log(e);
        });
      }
      return this.data;
    }

    onSave() {
      let flag = true;
      let newLog: any = {
        user: userStore.email,
        timestamp: +new Date(),
      };
      for (let i in this.before) {
        //@ts-ignore
        if (this.before[i] != this.data[i]) {
          if (flag) newLog.changed = {};
          flag = false;
          if (i == "adminUsers" || i == "currentUsers") {
            let a: string[] = [], b: string[] = [];
            this.before[i].forEach((v) => b.push(Utils.getEmailName(v)));
            this.data![i].forEach((v) => a.push(Utils.getEmailName(v)));
            newLog.changed[i] = `${b.join(",")} -> ${a.join(",")}`;
          } else {
            //@ts-ignore
            newLog.changed[i] = `${this.before[i]} -> ${this.data[i]}`;
          }
        }
      }
      if (!flag || this.comment) {
        this.isSaving = true;
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
            if (index == -1) return new Error("IDが見つからない");

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

            if (this.comment) {
              newLog.comment = this.comment;
            }
            let log = v.dic[this.data!.id].log;
            log.unshift(newLog);
            row[v.keyByIndex["log"]] = JSON.stringify(log).replace(/},{/g, "},\r\n{");

            //save
            GapiMgr.updateRow(this.$route.params.sheetID, "Master!A" + (index + 1), row).then(() => {
              this.isSaving = false;
              this.comment = "";
            });
            this.data!.index = index;
            v.dic[this.data!.id] = this.data!;
            v.dic[this.data!.id].log = log;
            taskStore.add(v.dic);
          }
        });
      } else {
        alert("変更箇所が見つかりません");
      }
    }
  }
</script>

<style lang="scss">
  .task-page {
    width: 100%;
    height: 100%;
    overflow: auto;
    position: relative;

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

      .nob {
        position: relative;
        margin-top: -1rem;
      }
    }

    .ui {
      position: sticky;
      bottom: 0;
    }
  }
</style>
