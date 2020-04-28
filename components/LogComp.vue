<template lang="pug">
  .log-comp.bg-teal.rounded.p-2
    //label ログ
    .item.bg-white.rounded.p-2.m-2(v-for="item in data" :class="item.user==userStore.email?'me':''")
      .meta
        span.name(v-html="utils.getEmailName(item.user)").font-weight-bolder.text-secondary
        span.date(v-html ="getDateStr(item.timestamp)").text-secondary.font-italic.ml-2
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
  import {userStore} from "~/utils/store-accessor";

  @Component({
    components: {}
  })
  export default class LogComp extends Vue {
    utils = Utils;
    userStore = userStore;

    @Prop() data?: any;

    mounted() {
    }

    getDateStr(timestamp: number) {
      let date = new Date(timestamp);
      return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()} ${date.getHours()}:${date.getMinutes()}`;
    }

  }
</script>

<style lang="scss" scoped>
  .log-comp {
    .item {
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
