<template lang="pug">
  div
    GlobalHeaderComp
    nuxt
</template>

<style>
</style>

<script lang="ts">
  import {Component, Prop} from "~/node_modules/vue-property-decorator";
  import {Vue} from "~/node_modules/nuxt-property-decorator";
  import GlobalHeaderComp from "~/components/GlobalHeaderComp.vue";

  @Component({
    components: {GlobalHeaderComp}
  })
  export default class DefaultLayout extends Vue {
  }
</script>
