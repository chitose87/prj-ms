<template lang="pug">
  .record
    span(v-html="data.taskId")
    span(v-html="data.projectId")
    span(v-html="data.category")
    span(v-html="data.tags")
    p(v-html="data.title")
    pre(v-html="data.description")
    span(v-html="data.status")
    span(v-html="data.adminUsers")
    span(v-html="data.currentUsers")
    span(v-html="data.targetDate")
    span(v-html="data.deadlineDate")
    span(v-html="data.importance")
    span(v-html="data.parentTaskId")
    nuxt-link(:to="{name:'sheetID-taskID',params:{sheetID:$route.params.sheetID,taskID:data.taskId}}") detail

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
