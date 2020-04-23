<template lang="pug">
  .dash-board
    .container-fluid
      .filter
        p 絞り込み
        label.form-check
          input.form-check-input(type="checkbox")
          span.form-check-label ON
        label.form-check
          input.form-check-input(type="checkbox")
          span.form-check-label 表示

      .form-group
        label キーワード
        input.form-control(type="text")

      table.table.table-hover(v-if="getSheetID()")
        tr
          th(v-for="item in paramStore.headerOrder" v-if="item.show" scope="col" :class="item.name")
            div(v-if="item.name==='id'")
              span {{item.label}}

            div(v-if="item.name==='title'")
              span {{item.label}}

            div(v-if="item.name==='category'")
              span {{item.label}}
              select.form-control(v-model="filter.val.category" multiple)
                option(value="") all
                option(v-for="item in paramStore.category" :value="item") {{item}}

            div(v-if="item.name==='tags'")
              span {{item.label}}
              select.form-control(v-model="filter.val.tags" multiple)
                option(value="") all
                option(v-for="item in paramStore.tags" :value="item") {{item}}

            div(v-if="item.name==='status'")
              span {{item.label}}
              select.form-control(v-model="filter.val.status" multiple)
                option(value="") all
                option(v-for="item in paramStore.status" :value="item") {{item}}

            div(v-if="item.name==='importance'")
              span {{item.label}}
              input.form-control.form-control-sm(type="number" v-model="filter.val.importance.top")
              hr
              input.form-control.form-control-sm(type="number" v-model="filter.val.importance.bottom")

            div(v-if="item.name==='adminUsers'")
              span {{item.label}}
              select.form-control(v-model="filter.val.adminUsers" multiple)
                option(value="") all
                option(v-for="item in paramStore.email" :value="item" v-html="item.match(/(.*)(?=@)/)[0]")

            div(v-if="item.name==='currentUsers'")
              span {{item.label}}
              select.form-control(v-model="filter.val.currentUsers" multiple)
                option(value="") all
                option(v-for="item in paramStore.email" :value="item" v-html="item.match(/(.*)(?=@)/)[0]")

            div(v-if="item.name==='targetDate'")
              span {{item.label}}
              input.form-control.form-control-sm(type="date" v-model="filter.val.targetDate.top")
              hr
              input.form-control.form-control-sm(type="date" v-model="filter.val.targetDate.bottom")

            div(v-if="item.name==='deadlineDate'")
              span {{item.label}}
              input.form-control.form-control-sm(type="date" v-model="filter.val.deadlineDate.top")
              hr
              input.form-control.form-control-sm(type="date" v-model="filter.val.deadlineDate.bottom")

        RecordComp(v-for="item in taskStore.list" :data="item")


</template>

<script lang="ts">
  import {Component, Vue} from "~/node_modules/nuxt-property-decorator";
  import GapiMgr from "~/utils/GapiMgr";
  import RecordComp from "~/components/RecordComp.vue";
  import {paramStore, taskStore} from "~/utils/store-accessor";
  import Utils from "~/utils/Utils";

  @Component({
    components: {RecordComp}
  })
  export default class DashBoardComp extends Vue {
    taskStore = taskStore;
    paramStore = paramStore;

    filter = {
      val: {
        status: [],
        category: [],
        tags: [],
        adminUsers: [],
        currentUsers: [],
        importance: {top: 0, bottom: 0},
        targetDate: {top: 0, bottom: 0},
        deadlineDate: {top: 0, bottom: 0},
      }
    };

    sheetID: string = "";
    status: string[] = [];
    category: string[] = [];
    tags: string[] = [];
    adminUsers: string[] = [];
    currentUsers: string[] = [];
    importance = {top: 0, bottom: 0};
    targetDate = {top: 0, bottom: 0};
    deadlineDate = {top: 0, bottom: 0};

    mounted() {
    }

    getSheetID() {
      // console.log(this.sheetID, this.$route.params.sheetID)
      if (this.sheetID != this.$route.params.sheetID) {
        this.sheetID = this.$route.params.sheetID;

        GapiMgr.batchGet(this.sheetID, {
          range: "Master", callBack: (csv: any[][]) => {
            let v = Utils.csv2Json(csv);
            taskStore.add(v.dic);
            // console.log("Master", v);
          }
        }, {
          range: "_parameter", callBack: (csv: any[][]) => {
            let v = Utils.csv2List(csv);
            paramStore.update(v);
            // console.log("_parameter", v);
          }
        });
      }
      return this.$route.params.sheetID;
    }

    onFilter() {

    }
  }
</script>

<style lang="scss" scoped>
  table {
    th {
    }
  }

  .title {
    resize: horizontal;
    overflow: auto;
  }

  .importance {
    width: 50px;

    input {
      /*width: 80px;*/
    }
  }
</style>
