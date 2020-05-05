<template lang="pug">
  div
    GlobalHeaderComp
    .layout
      .layout__dashboard(:style="`width:${paramStore.layout.dashboard}px`")
        NobComp(:layoutKey="'dashboard'",:isVertical="false")
        DashBoardComp(v-if="isLogin() && $route.params.sheetID")
        InviteLoginComp(v-else)
      .layout__detail
        nuxt

    //dynamicCommonStyle
    style(v-for="format in paramStore.dynamicCommonStyle")
      | [format-style="{{format.id}}"] {
      |   {{format.bg?"background-color:"+format.bg:""}} !important;
      |   {{format.text?"color:"+format.text:""}} !important;
      | }
</template>

<style lang="scss" scoped>
  .layout {
    //@include mediaquery-not-sm {
    width: 100%;
    height: calc(100vh - 3rem);
    display: flex;
    overflow: hidden;
    //}
    &__dashboard {
      flex-shrink: 0;
      position: relative;
      min-width: 20vw;
      max-width: 100vw;

      .nob {
        position: absolute;
        top: 0;
        right: -1rem;
        z-index: 1;
      }
    }

    &__detail {
      flex-grow: 1;
      flex-shrink: 1;
      overflow: hidden;
    }
  }
</style>

<script lang="ts">
  import {Component, Prop} from "~/node_modules/vue-property-decorator";
  import {Vue} from "~/node_modules/nuxt-property-decorator";
  import GlobalHeaderComp from "~/components/GlobalHeaderComp.vue";
  import DashBoardComp from "~/components/DashBoardComp.vue";
  import {loginStore, paramStore} from "~/utils/store-accessor";
  import NobComp from "~/components/utils/NobComp.vue";
  import InviteLoginComp from "~/components/InviteLoginComp.vue";

  @Component({
    components: {InviteLoginComp, NobComp, DashBoardComp, GlobalHeaderComp}
  })
  export default class DashbordLayout extends Vue {
    paramStore = paramStore;

    isLogin() {
      return loginStore.status;
    }
  }
</script>
