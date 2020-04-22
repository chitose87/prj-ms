<template lang="pug">
  .dash-board
    .container-fluid
      //.filter

      table.table.table-hover(v-if="getSheetID()")
        tr
          th(v-for="item in paramStore.headerOrder",scope="col",:class="item.name")
            div(v-if="item.show &&item.name==='id'")
              span {{item.label}}

            div(v-if="item.show &&item.name==='title'")
              span {{item.label}}

            div(v-if="item.show &&item.name==='category'")
              span {{item.label}}
              select.form-control(v-model="category",multiple)
                option(value="") all
                option(v-for="item in paramStore.category",:value="item") {{item}}

            div(v-if="item.show &&item.name==='tags'")
              span {{item.label}}

            div(v-if="item.show &&item.name==='status'")
              span {{item.label}}
              select.form-control(v-model="status",multiple)
                option(value="") all
                option(v-for="item in paramStore.status",:value="item") {{item}}

            div(v-if="item.show &&item.name==='importance'")
              span {{item.label}}
              input.form-control.form-control-sm(type="number",v-model="importance.top")
              hr
              input.form-control.form-control-sm(type="number",v-model="importance.bottom")

            div(v-if="item.show &&item.name==='adminUsers'")
              span {{item.label}}
              select.form-control(v-model="adminUsers",multiple)
                option(value="") all
                option(v-for="item in paramStore.email",:value="item",v-html="item.match(/(.*)(?=@)/)[0]")

            div(v-if="item.show &&item.name==='currentUsers'")
              span {{item.label}}
              select.form-control(v-model="currentUsers",multiple)
                option(value="") all
                option(v-for="item in paramStore.email",:value="item",v-html="item.match(/(.*)(?=@)/)[0]")

            div(v-if="item.show &&item.name==='targetDate'")
              span {{item.label}}
              input.form-control.form-control-sm(type="date",v-model="targetDate.top")
              hr
              input.form-control.form-control-sm(type="date",v-model="targetDate.bottom")

            div(v-if="item.show &&item.name==='deadlineDate'")
              span {{item.label}}
              input.form-control.form-control-sm(type="date",v-model="deadlineDate.top")
              hr
              input.form-control.form-control-sm(type="date",v-model="deadlineDate.bottom")

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

    sheetID: string = "";
    status: string[] = [];
    category: string[] = [];
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
