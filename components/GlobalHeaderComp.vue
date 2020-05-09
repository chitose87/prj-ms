<template lang="pug">
  header.gloabl-header.navbar.navbar-expand.d-flex.align-items-center
    .navbar-brand SsPM UI

    .form-inline.flex-nowrap
      input.form-control.form-control-sm(type="text" v-model="sheetID",placeholder="sheetID",autocomplete="on",name="sheetID")
      nuxt-link.btn.btn-primary.btn-sm(:to="{name:'sheetID',params:{sheetID:sheetID}}") Move

    .user.ml-auto
      .body(v-if="isLogin()")
        span.user__name {{userStore.email}}
        button.btn.btn-sm.btn-secondary.ml-2(v-on:click="singOut") SingOut

      .body(v-else)
        button.btn.btn-primary.btn-sm(v-on:click="singIn") SingIn

</template>

<script lang="ts">
  import {Component, Vue} from "~/node_modules/nuxt-property-decorator";
  import {loginStore, userStore} from "~/utils/store-accessor";
  import GapiMgr from "~/utils/GapiMgr";

  @Component({
    components: {}
  })
  export default class GlobalHeaderComp extends Vue {
    userStore = userStore;
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
    position: sticky;
    top: 0;
    z-index: $zindex-sticky+10;
    background-color: $dark;
    color: $white;
    height: 3rem;

    .user__name {
      @include mediaquery-sm {
        display: none;
      }
    }
  }
</style>
