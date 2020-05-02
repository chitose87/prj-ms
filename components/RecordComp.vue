<template lang="pug">
  nuxt-link.record(:to="{name:'sheetID-taskID',params:{sheetID:$route.params.sheetID,taskID:data.id}}")
    td(v-for="item in paramStore.headerOrder" v-if="item.show",scope="col" :class="item.name")
      span(v-if="item.name==='id'" v-html="data.id" scope="row")
      span.font-weight-bolder(v-if="item.name==='title'")
        b-icon(v-if="data.gen>1" icon="arrow-return-right" :style="`margin-left:${data.gen-1}em`")
        | {{data.title}}
      div(v-if="item.name==='category'" v-html="data.category")
      div(v-if="item.name==='tags'" v-html="data.tags")
      div(v-if="item.name==='status'" v-html="data.status")
      div(v-if="item.name==='importance'" v-html="data.importance")

      div(v-if="item.name==='adminUsers'" v-html="getUser(data.adminUsers)")
      div(v-if="item.name==='currentUsers'" v-html="getUser(data.currentUsers)")

      div(v-if="item.name==='targetDate'" v-html="data.targetDate")
      div(v-if="item.name==='deadlineDate'" v-html="data.deadlineDate")

</template>

<script lang="ts">
  import {Component, Prop, Vue} from "~/node_modules/nuxt-property-decorator";
  import {IRecordData} from "~/utils/Record";
  import {paramStore} from "~/utils/store-accessor";
  import Utils from "~/utils/Utils";

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
        if (!user) continue;
        arr.push(Utils.getEmailName(user));
      }
      return arr.join(",");
    }
  }
</script>

<style lang="scss" scoped>
  .record {
    display: table-row;

    &.nuxt-link-active {
      background-color: $info;
      color: $white;

      .title {
        background-color: $info;
      }
    }

    .title {
      position: sticky;
      left: 0;
      background-color: $white;
      z-index: $zindex-sticky;

      &:after {
        content: "";
        display: block;
        position: absolute;
        top: 0;
        right: 0;
        background-color: #dee2e6;
        width: 1px;
        height: 100%;
      }
    }
  }
</style>
