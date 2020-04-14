<template lang="pug">
  .hoge
    global-header-comp
    DashBoardComp(v-if="isLogin()")

</template>

<script lang="ts">
  import {Component, Prop} from "~/node_modules/vue-property-decorator";
  import {Vue} from "~/node_modules/nuxt-property-decorator";
  import GlobalHeaderComp from "~/components/GlobalHeaderComp.vue";
  import DashBoardComp from "~/components/DashBoardComp.vue";
  import {loginStore} from "~/utils/store-accessor";

  @Component({
    components: {DashBoardComp, GlobalHeaderComp}
  })
  export default class SheetPage extends Vue {
    isLogin() {
      return loginStore.status
    }

    mounted() {
      console.log("mounted", this.$route.params.sheetID);
    }

    changeSheet() {

    }
  }
</script>

<style lang="scss">

</style>
