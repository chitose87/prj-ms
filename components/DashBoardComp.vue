<template lang="pug">
  .dash-board
    .container
      h3 DashBoard

      ul
        li(v-for="item in list")
          RecordComp(:data="item")

</template>

<script lang="ts">
  import {Component, Vue} from "~/node_modules/nuxt-property-decorator";
  import GapiMgr from "~/utils/GapiMgr";
  import RecordComp from "~/components/RecordComp.vue";
  import {IRecordData} from "~/utils/Record";

  @Component({
    components: {RecordComp}
  })
  export default class DashBoardComp extends Vue {
    list: IRecordData[] = [];

    mounted() {
      GapiMgr.getAllData(this.$route.params.sheetID, "Master").then((json: IRecordData[]) => {
        this.list = json;
      }, (e) => {
        console.log(e);
      });

      // gapi.client.sheets.spreadsheets.values.get({
      //   spreadsheetId: this.$route.params.sheetID,
      //   range: 'Master!A1:H17',
      //   // valueRenderOption: '',
      //   // dateTimeRenderOption: '',
      // }).then((response) => {
      //   console.log(response.result);
      // }, (reason) => {
      //   console.error('error: ' + reason.result.error.message);
      // });
    }
  }
</script>

<style lang="scss">
</style>
