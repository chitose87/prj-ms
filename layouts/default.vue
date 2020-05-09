<template lang="pug">
  div
    GlobalHeaderComp
    nuxt

    style(v-for="format in paramStore.dynamicCommonStyle")
      | [format-style="{{format.id}}"] {
      |   {{format.bg?"background-color:"+format.bg:""}} !important;
      |   {{format.text?"color:"+format.text:""}} !important;
      | }
</template>

<style>
</style>

<script lang="ts">
  import {Component, Prop} from "~/node_modules/vue-property-decorator";
  import {Vue} from "~/node_modules/nuxt-property-decorator";
  import GlobalHeaderComp from "~/components/GlobalHeaderComp.vue";
  import {paramStore} from "~/utils/store-accessor";

  @Component({
    components: {GlobalHeaderComp}
  })
  export default class DefaultLayout extends Vue {
    paramStore = paramStore;
  }
</script>
