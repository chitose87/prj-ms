<template lang="pug">
  div
    GlobalHeaderComp
    .d-flex
      .sidebar.flex-grow-1.flex-shrink-1
        DashBoardComp(v-if="isLogin() && $route.params.sheetID")
      .border-left.flex-grow-1.flex-shrink-1
        nuxt

    //table.table.table-borderless
      tr
        th(scope="col").resize-h.border-right リスト
        th(scope="col") 詳細
      tr
        td(scope="row").overflow-auto.border-right
          DashBoardComp(v-if="isLogin() && $route.params.sheetID")
        td
          nuxt

</template>

<style lang="scss" scoped>
  .sidebar {
    height: calc(100vh - 3rem);
    overflow: auto;
    position: sticky;
    top: 3rem;
    resize: horizontal;
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
      return loginStore.status;
    }
  }
</script>
