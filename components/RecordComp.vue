<template lang="pug">
  .record
    p(v-html="data.title")
    pre(v-html="data.description")

</template>

<script lang="ts">
  import {Component, Prop, Vue} from "~/node_modules/nuxt-property-decorator";
  import {IRecordData} from "~/utils/Record";

  @Component({
    components: {}
  })
  export default class RecordComp extends Vue {
    @Prop() data?: IRecordData;

    mounted() {
    }
  }
</script>

<style lang="scss">
</style>
