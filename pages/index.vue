<template lang="pug">
  .top
    .container
      h1 Spreadsheet Project Manager User Interface

      section
        h3 Google SpreadsheetのIDを入力
        .form-inline
          input.form-control.form-control-sm(type="text" v-model="sheetID",placeholder="sheetID",autocomplete="on",name="sheetID")
          nuxt-link.btn.btn-primary.btn-sm(:to="{name:'sheetID',params:{sheetID:sheetID}}") Move

</template>

<script lang="ts">
  import {Component} from "~/node_modules/vue-property-decorator";
  import {Vue} from "~/node_modules/nuxt-property-decorator";

  @Component({
    components: {}
  })
  export default class TopPageComp extends Vue {
    sheetID = "";

    mounted() {
    }

    changeSheet() {

    }
  }
</script>

<style lang="scss">

</style>
