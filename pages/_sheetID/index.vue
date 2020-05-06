<template lang="pug">
  .sheet-page
    DashBoardComp(v-if="loginStore.status && $route.params.sheetID")
    InviteLoginComp(v-else)

</template>

<script lang="ts">
  import {Component, Prop} from "~/node_modules/vue-property-decorator";
  import {Vue} from "~/node_modules/nuxt-property-decorator";
  import {loginStore, paramStore} from "~/utils/store-accessor";
  import DashBoardComp from "~/components/DashBoardComp.vue";
  import InviteLoginComp from "~/components/InviteLoginComp.vue";

  @Component({
    // layout: 'dashbord2',
    components: {InviteLoginComp, DashBoardComp}
  })
  export default class SheetPage extends Vue {
    loginStore = loginStore;
    paramStore = paramStore;

    mounted() {
    }
  }
</script>

<style lang="scss" scoped>
</style>
