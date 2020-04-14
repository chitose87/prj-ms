<template lang="pug">
  .dash-board
    .container
      h3 DashBoard

</template>

<script lang="ts">
  import {Component, Vue} from "~/node_modules/nuxt-property-decorator";
  import GapiMgr from "~/utils/GapiMgr";

  @Component({
    components: {}
  })
  export default class DashBoardComp extends Vue {
    mounted() {
      GapiMgr.getAllData(this.$route.params.sheetID, "Master").then((response) => {
        console.log(response.result);
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
