<template lang="pug">
  nuxt-link.record(:to="{name:'sheetID-taskID',params:{sheetID:$route.params.sheetID,taskID:data.id}}")
    td(v-for="item in paramStore.headerOrder",scope="col",:class="item.name")
      span(v-if="item.show &&item.name==='id'",v-html="data.id",scope="row")
      p(v-if="item.show &&item.name==='title'",v-html="data.title").font-weight-bolder
      div(v-if="item.show && item.name==='category'",v-html="data.category")
      div(v-if="item.show && item.name==='tags'",v-html="data.tags")
      div(v-if="item.show && item.name==='status'",v-html="data.status")
      div(v-if="item.show && item.name==='importance'",v-html="data.importance")

      div(v-if="item.show && item.name==='adminUsers'",v-html="getUser(data.adminUsers)")
      div(v-if="item.show && item.name==='currentUsers'",v-html="getUser(data.currentUsers)")

      div(v-if="item.show && item.name==='targetDate'",v-html="data.targetDate")
      div(v-if="item.show && item.name==='deadlineDate'",v-html="data.deadlineDate")

</template>

<script lang="ts">
  import {Component, Prop, Vue} from "~/node_modules/nuxt-property-decorator";
  import {IRecordData} from "~/utils/Record";
  import {paramStore} from "~/utils/store-accessor";

  @Component({
    components: {}
  })
  export default class RecordComp extends Vue {
    @Prop() data?: IRecordData;
    paramStore = paramStore;

    mounted() {
    }

    getUser(users: string[] | string) {
      if (!Array.isArray(users)) users = [users];

      let arr = [];
      for (let user of users) {
        let reg = user.match(/(.*)(?=@)/);
        if (reg) arr.push(reg[0]);
      }
      return arr.join(",");
    }
  }
</script>

<style lang="scss" scoped>
  .record {
    display: table-row;
  }
</style>
