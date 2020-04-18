<template lang="pug">
  div
    GlobalHeaderComp
    .row
      .col
        DashBoardComp(v-if="isLogin() && $route.params.sheetID")
      .col
        nuxt
</template>

<style lang="scss" scoped>
  .row {
    display: flex;

    .col {

    }
  }
</style>

<script lang="ts">
  import {Component, Prop} from "~/node_modules/vue-property-decorator";
  import {Vue} from "~/node_modules/nuxt-property-decorator";
  import GlobalHeaderComp from "~/components/GlobalHeaderComp.vue";
  import DashBoardComp from "~/components/DashBoardComp.vue";
  import {loginStore} from "~/utils/store-accessor";

  @Component({
    components: {DashBoardComp, GlobalHeaderComp}
  })
  export default class DashbordLayout extends Vue {
    isLogin() {
      return loginStore.status
    }
  }
</script>
