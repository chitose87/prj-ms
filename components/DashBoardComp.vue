<template lang="pug">
  .dash-board
    .container-fluid
      .filter
        label.form-check
          input.form-check-input(type="checkbox" v-model="filter.active")
          span.form-check-label 絞り込み
        //label.form-check
          input.form-check-input(type="checkbox" v-model="filter.active")
          span.form-check-label 表示

      table.table.table-hover(v-if="getSheetID()")
        tr
          th(v-for="item in paramStore.headerOrder" v-if="item.show" scope="col" :class="item.name")
            div(v-if="item.name==='id'")
              span.nowrap {{item.label}}

            div(v-else-if="item.name==='title'")
              span.nowrap(v-if="!filter.active") {{item.label}}
              div(v-if="filter.active")
                label キーワード
                input.form-control(type="text" v-model="filter.val.keyword")
                p.form-text.small.mb-0 ＊タイトルと説明文より

            div(v-else-if="item.name==='category'")
              span.nowrap {{item.label}}
              select.form-control(v-if="filter.active" v-model="filter.val.category" multiple @change="filterChange(filter.val,'category')")
                option(value="_clear") [ x ]
                option(v-for="item in paramStore.category" :value="item") {{item}}
                option(value="") [ 空 ]
                //option(value="_all") [ All ]

            div(v-else-if="item.name==='tags'")
              span.nowrap {{item.label}}
              select.form-control(v-if="filter.active" v-model="filter.val.tags" multiple @change="filterChange(filter.val,'tags')")
                option(value="_clear") [ x ]
                option(v-for="item in paramStore.tags" :value="item") {{item}}
                option(value="") [ 空 ]

            div(v-else-if="item.name==='status'")
              span.nowrap {{item.label}}
              select.form-control(v-if="filter.active" v-model="filter.val.status" multiple @change="filterChange(filter.val,'status')")
                option(value="_clear") [ x ]
                option(v-for="item in paramStore.status" :value="item") {{item}}
                option(value="") [ 空 ]

            div(v-else-if="item.name==='importance'")
              span.nowrap {{item.label}}
              div(v-if="filter.active")
                input.form-control.form-control-sm(type="number" v-model="filter.val.importance.top")
                hr
                input.form-control.form-control-sm(type="number" v-model="filter.val.importance.bottom")

            div(v-else-if="item.name==='adminUsers'")
              span.nowrap {{item.label}}
              select.form-control(v-if="filter.active" v-model="filter.val.adminUsers" multiple @change="filterChange(filter.val,'adminUsers')")
                option(value="_clear") [ x ]
                option(v-for="item in paramStore.email" :value="item" v-html="item.match(/(.*)(?=@)/)[0]")
                option(value="") [ 空 ]

            div(v-else-if="item.name==='currentUsers'")
              span.nowrap {{item.label}}
              select.form-control(v-if="filter.active" v-model="filter.val.currentUsers" multiple @change="filterChange(filter.val,'currentUsers')")
                option(value="_clear") [ x ]
                option(v-for="item in paramStore.email" :value="item" v-html="item.match(/(.*)(?=@)/)[0]")
                option(value="") [ 空 ]

            div(v-else-if="item.name==='targetDate'")
              span.nowrap {{item.label}}
              div(v-if="filter.active")
                input.form-control.form-control-sm(type="date" v-model="filter.val.targetDate.top")
                hr
                input.form-control.form-control-sm(type="date" v-model="filter.val.targetDate.bottom")

            div(v-else-if="item.name==='deadlineDate'")
              span.nowrap {{item.label}}
              div(v-if="filter.active")
                input.form-control.form-control-sm(type="date" v-model="filter.val.deadlineDate.top")
                hr
                input.form-control.form-control-sm(type="date" v-model="filter.val.deadlineDate.bottom")

        RecordComp(v-for="item in taskStore.list" :data="item" v-show="setFiltered(item)")


</template>

<script lang="ts">
  import {Component, Vue} from "~/node_modules/nuxt-property-decorator";
  import GapiMgr from "~/utils/GapiMgr";
  import RecordComp from "~/components/RecordComp.vue";
  import {paramStore, taskStore} from "~/utils/store-accessor";
  import Utils from "~/utils/Utils";
  import {IRecordData} from "~/utils/Record";

  @Component({
    components: {RecordComp}
  })
  export default class DashBoardComp extends Vue {
    taskStore = taskStore;
    paramStore = paramStore;

    filter = {
      active: false,
      // visible: true,
      val: {
        keyword: "",
        status: <string[]>[],
        category: <string[]>[],
        tags: <string[]>[],
        adminUsers: <string[]>[],
        currentUsers: <string[]>[],
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

    filterChange(val: any, key: string) {
      if (val[key].indexOf("_clear") >= 0) {
        val[key].length = 0;
      }
    }

    setFiltered(item: IRecordData) {
      console.log("setFiltered");

      if (this.filter.active) {
        //return false, or pass
        for (let key of ["category", "tags", "status", "adminUsers", "currentUsers"]) {
          //@ts-ignore
          const selects: string[] = this.filter.val[key], value: string | string[] = item[key];
          if (selects.length) {
            if (Array.isArray(value)) {
              // list value
              if (value.length) {
                let v = [...selects, ...value];
                // console.log(v, new Set(v).size, v.length);
                if (new Set(v).size == v.length) return false;
              } else if (selects.indexOf("") == -1) {
                // _blank
                return false;
              }
            } else if (selects.indexOf(value) == -1) {
              // single value
              return false;
            }
          }
        }

        //keyword
        if (this.filter.val.keyword) {
          let str = this.filter.val.keyword.replace(/( |　|,)/g, "<and>");
          let regStr = "";
          for (let col of str.split("<and>")) {
            regStr += "(?=.*" + col + ")";
          }
          let reg = new RegExp(`(${regStr})`, "i");
          if (!`${item.title}${item.description}`.match(reg)) {
            return false;
          }
        }
      }
      return true;
    }
  }
</script>

<style lang="scss" scoped>
  .nowrap {
    white-space: nowrap;
  }
  .form-control{
    padding-left: 0;
    padding-right: 0;
  }

  table {
    table-layout: fixed;

    th {
    }
  }

  .id {
    width: 2.5em;
  }

  .title {
    resize: horizontal;
    overflow: auto;
    min-width: 10em;
  }

  .category {
    width: 6em;
  }

  .tags {
    width: 6em;
  }

  .status {
    width: 6em;
  }

  .importance {
    width: 5em;

    input {
      /*width: 80px;*/
    }
  }

  .adminUsers {
    width: 6em;
  }

  .currentUsers {
    width: 6em;
  }

  .targetDate {
    width: 8em;
  }

  .deadlineDate {
    width: 7em;
  }
</style>
