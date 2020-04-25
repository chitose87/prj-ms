<template lang="pug">
  .top
    .container
      h2 初めてログインする方法

      ul.list-group.list-group-flush
        li.list-group-item.pb-6
          h3 ①SpreadsheetにアクセスできるGoogleアカウントを選択

        li.list-group-item.pb-6
          h3 ②Googleの認証を受けていないので、警告が出るが問題なし。
          .text-center.mt-4
            img(src="/img/tips/first-login-01.png").shadow.align-top
            span.ml-4.mr-4
              b-icon(icon="arrow-right")
            img(src="/img/tips/first-login-02.png").shadow.align-top

        li.list-group-item.pb-6
          h3 ③編集権限を許可する
          .text-center.mt-4
            img(src="/img/tips/first-login-03.png").shadow.align-top.mr-4
            span.ml-4.mr-4
              b-icon(icon="arrow-right")
            img(src="/img/tips/first-login-04.png").shadow.align-top

</template>

<script lang="ts">
  import {Component} from "~/node_modules/vue-property-decorator";
  import {Vue} from "~/node_modules/nuxt-property-decorator";

  @Component({
    components: {}
  })
  export default class FirstPageComp extends Vue {
    mounted() {
    }

    changeSheet() {

    }
  }
</script>

<style lang="scss">

</style>
