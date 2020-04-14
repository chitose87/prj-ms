<template lang="pug">
  header.gloabl-header
    .container
      p Project Name

      div
        input(type="text",v-model="sheetID",placeholder="sheetID",autocomplete="on",name="sheetID")
        nuxt-link(:to="{name:'sheetID',params:{sheetID:sheetID}}") Move

      .user
        .body(v-if="isLogin()")
          button(v-on:click="singOut") SingOut

        .body(v-else)
          button(v-on:click="singIn") SingIn

</template>

<script lang="ts">
  import {Component, Vue} from "~/node_modules/nuxt-property-decorator";
  import {loginStore} from "~/utils/store-accessor";
  import GapiMgr from "~/utils/GapiMgr";

  @Component({
    components: {}
  })
  export default class GlobalHeaderComp extends Vue {
    sheetID = "";

    mounted() {
      this.sheetID = this.$route.params.sheetID;
    }

    isLogin() {
      return loginStore.status
    }

    singIn() {
      GapiMgr.signIn();
    }

    singOut() {
      GapiMgr.signOut();
    }
  }
</script>

<style lang="scss">
  .gloabl-header {
    height: 3rem;
    background-color: $color-black;
    color: $color-white;

    .container {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 100%;
    }
  }
</style>
