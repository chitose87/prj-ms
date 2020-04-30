<template lang="pug">
  .top
    .container
      h1 Spreadsheet Project Manager User Interface

      section.mt-10
        InviteLoginComp(v-if="!loginStore.status")

        hr.mt-5

        h3.mt-5.text-center Google SpreadsheetのIDを入力
        .form-inline.justify-content-center
          input.form-control.form-control-sm(type="text" v-model="sheetID",placeholder="sheetID",autocomplete="on",name="sheetID")
          nuxt-link.btn.btn-primary.btn-sm(:to="{name:'sheetID',params:{sheetID:sheetID}}") Move

</template>

<script lang="ts">
  import {Component} from "~/node_modules/vue-property-decorator";
  import {Vue} from "~/node_modules/nuxt-property-decorator";
  import InviteLoginComp from "~/components/InviteLoginComp.vue";
  import {loginStore} from "~/utils/store-accessor";

  @Component({
    components: {InviteLoginComp}
  })
  export default class TopPageComp extends Vue {
    loginStore = loginStore;
    sheetID = "";

    mounted() {
    }

    changeSheet() {

    }
  }
</script>

<style lang="scss">

</style>
