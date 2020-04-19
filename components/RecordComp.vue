<template lang="pug">
  nuxt-link.record(:to="{name:'sheetID-taskID',params:{sheetID:$route.params.sheetID,taskID:data.id}}")
    //span(v-html="data.projectId")
    th(scope="row",v-html="data.id")
    td.font-weight-bolder(v-html="data.title")
    td(v-html="data.category")
    td(v-html="data.tags")
    //pre(v-html="data.description")
    td(v-html="data.status")
    //div
      span(v-html="data.adminUsers")
      span(v-html="data.currentUsers")
      span(v-html="data.targetDate")
      span(v-html="data.deadlineDate")
      span(v-html="data.importance")
    //span(v-html="data.parentTaskId")

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

<style lang="scss" scoped>
  .record{
    display: table-row;
  }
</style>
