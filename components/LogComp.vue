<template lang="pug">
  .log-comp.bg-teal.rounded.p-2
    //label ログ
    div(v-for="item in getList()"
      :class="{me:item.user===userStore.email,viewed:item.viewed}")
      .user(v-if="item.viewed")
        b-icon(icon="check-circle")
        | {{utils.getEmailName(item.user)}}
      .item.bg-white.rounded.p-2.m-2(v-else)
        .meta
          span.name(v-html="utils.getEmailName(item.user)").font-weight-bolder.text-secondary
          span.date(v-html ="utils.getDateStr(item.timestamp)").text-secondary.font-italic.ml-2
        .body
          .changed.p-1.rounded(v-if="item.changed")
            div(v-for="(ele,key) in item.changed")
              span.mr-2(v-html="key")
              | :
              span.ml-2(v-html="ele")
          .comment(v-if="item.comment")
            p.m-0(v-html="item.comment")

</template>

<script lang="ts">
  import {Component, Prop, Vue} from "~/node_modules/nuxt-property-decorator";
  import Utils from "~/utils/Utils";
  import {taskStore, userStore} from "~/utils/store-accessor";

  @Component({
    components: {}
  })
  export default class LogComp extends Vue {
    utils = Utils;
    userStore = userStore;

    @Prop() data?: any[];

    mounted() {
    }

    getList() {
      let list = [...this.data!];

      let taskViewed = taskStore.viewed[Number.parseInt(this.$route.params.taskID) - 1];
      for (let i in taskViewed) {
        list.push({
          timestamp: taskViewed[i],
          user: Utils.getEmailById(Number.parseInt(i) + 1),
          viewed: true
        });
      }

      list.sort((a: any, b: any) => {
        if (a.timestamp < b.timestamp) return -1;
        if (a.timestamp > b.timestamp) return 1;
        return 0;
      });
      return list;
    }
  }
</script>

<style lang="scss" scoped>
  .log-comp {
    text-align: right;

    .viewed {
      display: inline-block;
      margin-right: 0.25rem;
      margin-top: -0.25rem;
      top: -0.25rem;
      position: relative;

      .user {
        color: $white;
        & + .user {
          .b-icon {
            display: none;
          }
        }
      }
    }

    //div
    .item {
      text-align: left;

      .meta {

      }

      .body {
        overflow-wrap: break-word;

        .changed {
          background-color: $gray-100;
          color: $gray-500;
          font-size: smaller;
        }
      }
    }
  }
</style>
