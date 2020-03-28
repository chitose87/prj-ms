<template lang="pug">
  .container
    p hoge

</template>

<script lang="ts">
  import {Component} from "~/node_modules/vue-property-decorator";
  import {Vue} from "~/node_modules/nuxt-property-decorator";

  @Component({
    components: {}
  })
  export default class TopPageComp extends Vue {
  }
</script>

<style lang="scss">

</style>
