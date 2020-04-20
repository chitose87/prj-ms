<template lang="pug">
  .dash-board
    .container-fluid
      h3 DashBoard
      h4(v-html="getSheetID()")

      table.table.table-hover
        tr
          th(scope="col") ID
          th(scope="col").resize-h.overflow-auto title
          th(scope="col") category
          th(scope="col") tags
          th(scope="col") status
          th(scope="col") importance
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
    sheetID: string = "";
    taskStore = taskStore;

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

<style lang="scss">
  table {
    th {
    }
  }
</style>
