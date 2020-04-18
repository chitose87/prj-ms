<template lang="pug">
  .sheet-page

</template>

<script lang="ts">
  import {Component, Prop} from "~/node_modules/vue-property-decorator";
  import {Vue} from "~/node_modules/nuxt-property-decorator";
  import {loginStore} from "~/utils/store-accessor";

  @Component({
    layout: 'dashbord',
    components: {}
  })
  export default class SheetPage extends Vue {
    mounted() {
      console.log("mounted", this.$route.params.sheetID);
    }

    changeSheet() {

    }
  }
</script>

<style lang="scss">

</style>
