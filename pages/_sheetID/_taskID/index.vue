<template lang="pug">
  .task-page.pt-4.h-100
    .container-fluid(v-if="getData()")
      .form-row
        p.col-auto
          | ID:
          span(v-html="dataClone.id")
        .col.form-group.parentTaskId.form-inline
          label 親タスク
          select.form-control(v-model="dataClone.parentTaskId")
            option(v-for="item in taskStore.task"
              :value="item.id"
              :disabled="item.id===dataClone.id||item.parentTaskId===dataClone.id")
              span(v-for="i of (item.gen - 1)") &nbsp;&nbsp;
              span(v-if="item.gen>1") └&nbsp;
              | {{item.id+":"+item.title}}

      .form-group.title.text-right
        input.form-control.font-weight-bolder(type="text" v-model="dataClone.title")
        nuxt-link.btn.btn-link.mb-n3(v-if="!isNew" :to="`./new?parentTaskId=${dataClone.id}`")
          b-icon.mr-1(icon="arrow-return-right")
          span.mr-1 子タスクを作成
          b-icon(icon="plus-circle-fill")
      .form-group.flex-grow-1.description
        textarea.form-control(v-model="dataClone.description"
          :style="`height:${paramStore.layout.taskDescription}px`")
        NobComp(:layoutKey="'taskDescription'" :isVertical="true")

      .form-row
        .col.form-group.adminUsers.mb-0
          label 管理者
          select.form-control(v-model="dataClone.adminUsers" multiple
          :style="`height:${paramStore.layout.taskUser}px`")
            option(v-for="item in paramStore.email" :value="item" v-html="utils.getEmailName(item)")

        .col.form-group.currentUsers.mb-0
          label 担当者
          select.form-control(v-model="dataClone.currentUsers" multiple
          :style="`height:${paramStore.layout.taskUser}px`")
            option(v-for="item in paramStore.email" :value="item" v-html="utils.getEmailName(item)")
        NobComp(:layoutKey="'taskUser'" :isVertical="true")

      .form-row
        .col.form-group.status
          label ステータス
          select.form-control(v-model="dataClone.status")
            option(v-for="item in paramStore.status" :value="item") {{item}}

        .col.form-group.category
          label カテゴリ
          select.form-control(v-model="dataClone.category")
            option(v-for="item in paramStore.category" :value="item") {{item}}

        .col.form-group.tags
          label タグ
          select.form-control(v-model="dataClone.tags" disabled=true)
            option(v-for="item in paramStore.tags" :value="item") {{item}}

        .col.form-group.importance
          label 重要度
          input.form-control(type="number" v-model="dataClone.importance" disabled=true)

      .form-row
        .col.form-group
          label 期限日
          input.form-control(type="date" v-model="dataClone.targetDate")
        .col.form-group
          label 最終期限日
          input.form-control(type="date" v-model="dataClone.deadlineDate")

      //brother
      //.brother

      //
      //.children

      .log
        LogComp(:data="dataClone.log")

      .ui.bg-white.border-top.pt-4.pb-4
        .form-group.flex-grow-1.description
          textarea.form-control(v-model="comment" :disabled="isSaving")
        .row
          .col
            button.btn.btn-primary.btn-block(@click="onSave()" :disabled="isSaving")
              b-icon.mr-2(icon="file-check")
              span(v-if="isNew") 保存
              span(v-else) 更新
          .col
            button.btn.btn-secondary.btn-block(@click="onSaveAndAdd()" :disabled="isSaving")
              b-icon.mr-1(icon="file-check")
              span.mr-1 &
              b-icon.mr-2(icon="file-plus")
              span 新規
          .col
            button.btn.btn-secondary.btn-block(@click="onSaveAndDuplicate()" :disabled="isSaving")
              b-icon.mr-1(icon="file-check")
              span.mr-1 &
              b-icon.mr-2(icon="files")
              span 複製
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
    static flag: boolean = false;

    utils = Utils;
    paramStore = paramStore;
    userStore = userStore;
    taskStore = taskStore;
    dataClone?: IRecordData;
    dataRef?: IRecordData;
    isNew = false;
    isSaving = false;

    comment: string = "";

    created() {
      // console.log("created")
    }

    mounted() {
      // console.log("mounted");
    }

    getData() {
      let data: any = taskStore.dic[Number.parseInt(this.$route.params.taskID)];
      this.isNew = !data;
      if (this.isNew) {
        // 新規作成init
        //@ts-ignore
        let viaData: IRecordData = taskStore.dic[this.$route.query.duplicate];
        if (viaData) {
          data = Object.assign({}, viaData);
          data.id = paramStore.nextId;
          data.title = data.title + " copy";
          data.log = [];
          data.viewed = [];
        } else {
          data = {
            id: paramStore.nextId,
            parentTaskId: this.$route.query.parentTaskId || "",
            title: "新規タスク タイトル",
            adminUsers: [],
            currentUsers: [],
            log: [],
          }
        }
      } else {
        // 更新init
        let row = [
          +new Date(),
          userStore.email,
          this.$route.params.taskID,
        ];

        //viewed 取得
        console.log("TaskPage.flag", TaskPage.flag)
        if (!TaskPage.flag) {
          TaskPage.flag = true;
          GapiMgr.batchGet(this.$route.params.sheetID, {
            range: "_viewed", callBack: (csv: any[][]) => {
              taskStore.updateViewed(csv);
            }
          });
        }

        //viewed処理
        setTimeout(() => {
          if (row[2] != this.$route.params.taskID) return;
          let timestamp = +new Date();
          GapiMgr.updateRow(this.$route.params.sheetID,
            `_viewed!${this.utils.getUserAId(userStore.email)}${this.$route.params.taskID}`,
            [timestamp]);
          // console.log(this.$route.params.taskID, timestamp)
          taskStore.updateViewedCell({
            userId:this.utils.getUserId(userStore.email),
            taskID:this.$route.params.taskID,
            timestamp:timestamp})
        }, 1000 * 3);
      }

      // console.log("getData", this.dataRef != data)
      if (this.dataRef != data) {
        this.dataClone = Object.assign({}, data);
        this.dataRef = data;
      }

      return this.dataClone;
    }

    onSaveAndAdd() {
      this.onSave(() => {
        this.$router.push(`./new`);
      });
    }

    onSaveAndDuplicate() {
      this.onSave(() => {
        this.$router.push(`./new?duplicate=${this.dataClone!.id}`);
      });
    }

    onSave(complete?: () => void) {
      let newLog: any = {
        user: userStore.email,
        timestamp: +new Date(),
      };
      if (this.isNew) {
        this.onSave__new(this.dataClone!, newLog, () => {
          if (complete) complete();
          else {
            this.$router.push(`./${this.dataClone!.id}`);
          }
        });
      } else {
        //check diff
        let flag = true;
        for (let i in this.dataRef) {
          //@ts-ignore
          if (this.dataRef[i] != this.dataClone[i]) {
            if (flag) newLog.changed = {};
            flag = false;
            if (i == "adminUsers" || i == "currentUsers") {
              let before = this.dataRef[i] || [];
              let after = this.dataClone![i] || [];

              let a: string[] = [], b: string[] = [];
              before.forEach((email: string) => {
                if (after.indexOf(email) == -1) { //なくなったもの
                  b.push(Utils.getEmailName(email));
                }
              });
              after.forEach((email: string) => {
                if (before.indexOf(email) == -1) { //増えたもの
                  a.push(Utils.getEmailName(email));
                }
              });

              newLog.changed[i] = `${b.join(",")} -> ${a.join(",")}`;
            } else {
              //@ts-ignore
              newLog.changed[i] = `${this.dataRef[i]} -> ${this.dataClone[i]}`;
            }
          }
        }

        if (!flag || this.comment) {
          this.onSave__update(this.dataClone!, newLog, complete);
        } else {
          if (complete) complete();
          else alert("変更箇所が見つかりません");
        }
      }
    }

    /**
     * タスク追加
     * @param data
     * @param newLog
     * @param callBack
     */
    private onSave__new(data: IRecordData, newLog: any, callBack: () => void) {
      // console.log("onSave__new")
      this.isSaving = true;
      GapiMgr.batchGet(this.$route.params.sheetID, {
        range: "_parameter", callBack: (csv: any[][]) => {
          let v = Utils.csv2List(csv);
          paramStore.update(v);

          data.id = paramStore.nextId;
          let row: any = this.createRow(data);
          if (this.comment) {
            newLog.comment = this.comment;
          }
          data.log.push(newLog);
          row[paramStore.keyByIndex["log"]] = JSON.stringify(data.log).replace(/},{/g, "},\r\n{");

          GapiMgr.insertRow(this.$route.params.sheetID, "Master!A1", row, (e: any) => {
            // console.log(e);
            this.isSaving = false;
            this.comment = "";
            callBack();
          });

          taskStore.updateTask(data);
        }
      });
    }

    /**
     * タスク更新
     * @param data
     * @param newLog
     * @param callBack
     */
    private onSave__update(data: IRecordData, newLog: any, callBack?: () => void) {
      // console.log("onSave__update")
      this.isSaving = true;
      GapiMgr.batchGet(this.$route.params.sheetID, {
        range: "Master", callBack: (csv: any[][]) => {
          let v = Utils.csv2Json(csv);
          let index = -1;
          for (let i in v) {
            //@ts-ignore
            let item = <IRecordData>v[i];
            if (item.id == data.id) {

              index = item.index;
              break;
            }
          }
          if (index == -1) return new Error("IDが見つからない");

          let row: any = this.createRow(data);
          if (this.comment) newLog.comment = this.comment;
          let log = v[data.id].log || [];
          log.push(newLog);
          row[paramStore.keyByIndex["log"]] = JSON.stringify(log).replace(/},{/g, "},\r\n{");

          //save
          GapiMgr.updateRow(this.$route.params.sheetID, "Master!A" + (index + 1), row).then(() => {
            this.isSaving = false;
            this.comment = "";
            if (callBack) callBack();
          });
          data.index = index;
          v[data.id] = data;
          v[data.id].log = log;
          taskStore.add(v);
        }
      });
    }

    /**
     *
     * @param data
     */
    private createRow(data: IRecordData) {
      let row = [];
      for (let key in data) {
        if (key == "index") continue;
        if (key == "gen") continue;
        if (key == "child") {
          delete data.child;
          continue;
        }
        if (!paramStore.keyByIndex[key]) continue;
        //@ts-ignore
        let val = data[key];
        if (typeof val === "object") {
          row[paramStore.keyByIndex[key]] = JSON.stringify(val);
        } else {
          row[paramStore.keyByIndex[key]] = val;
        }
      }
      return row;
    }

    createClone() {

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
