<template lang="pug">
  div
    GlobalHeaderComp
    .d-flex
      .dashbord.flex-shrink-0(:style="`width:${paramStore.layout.dashboard}px`")
        NobComp(:layoutKey="'dashboard'",:isVertical="false")

        .box
          DashBoardComp(v-if="isLogin() && $route.params.sheetID")
      .task.border-left.flex-grow-1.flex-shrink-1
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
  .dashbord {
    height: calc(100vh - 3rem);
    position: sticky;
    top: 3rem;
    min-width: 20vw;
    max-width: 100vw;

    .nob {
      position: absolute;
      top: 0;
      right: -1rem;
      z-index: 1;
    }

    .box {
      overflow: auto;
      width: 100%;
      height: 100%;
    }
  }

  .task {

  }
</style>

<script lang="ts">
  import {Component, Prop} from "~/node_modules/vue-property-decorator";
  import {Vue} from "~/node_modules/nuxt-property-decorator";
  import GlobalHeaderComp from "~/components/GlobalHeaderComp.vue";
  import DashBoardComp from "~/components/DashBoardComp.vue";
  import {loginStore, paramStore} from "~/utils/store-accessor";
  import NobComp from "~/components/utils/NobComp.vue";

  @Component({
    components: {NobComp, DashBoardComp, GlobalHeaderComp}
  })
  export default class DashbordLayout extends Vue {
    paramStore = paramStore;

    isLogin() {
      return loginStore.status;
    }
  }
</script>
