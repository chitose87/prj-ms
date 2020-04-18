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
        RecordComp(v-for="item in taskStore.list" :data="item")

</template>

<script lang="ts">
  import {Component, Vue} from "~/node_modules/nuxt-property-decorator";
  import GapiMgr from "~/utils/GapiMgr";
  import RecordComp from "~/components/RecordComp.vue";
  import {IRecordData} from "~/utils/Record";
  import {taskStore} from "~/utils/store-accessor";

  @Component({
    components: {RecordComp}
  })
  export default class DashBoardComp extends Vue {
    sheetID: string = "";
    taskStore = taskStore;

    mounted() {
    }

    getSheetID() {
      console.log(this.sheetID, this.$route.params.sheetID)
      if (this.sheetID != this.$route.params.sheetID) {
        this.sheetID = this.$route.params.sheetID;

        GapiMgr.getAllData(this.sheetID, "Master").then((json: { number: IRecordData }) => {
          taskStore.add(json);
        }, (e) => {
          console.log(e);
        });
      }
      return this.$route.params.sheetID;
    }

    getTask(){
      return taskStore.list
    }
  }
</script>

<style lang="scss">
  table {
    th {
    }
  }
</style>
