<template lang="pug">
  header.gloabl-header
    .container
      p Project Name

      button(v-on:click="singOut") SingOut
      button(v-on:click="singIn") SingIn
      .user
        .body(v-if="hoge()")
          //
            img(:src="$store.getters.user.photoURL")
            p {{$store.getters.user.displayName}}
            p {{$store.getters.user.email}}
          button(v-on:click="singOut") SingOut

        .body(v-else)
          button(v-on:click="singIn") SingIn

</template>

<script lang="ts">
  import {Component, Vue} from "~/node_modules/nuxt-property-decorator";
  import {Singleton} from "~/assets/script/Singleton";
  import {loginStore} from "~/utils/store-accessor";

  @Component({
    components: {}
  })
  export default class GlobalHeaderComp extends Vue {
    hoge(){
      return loginStore.status
    }
    singIn() {
      gapi.auth2.getAuthInstance().signIn();
    }

    singOut() {
      gapi.auth2.getAuthInstance().signOut();
    }
  }
</script>

<style lang="scss">
  .gloabl-header {
    height: 3rem;
    background-color: $color-black;
    color: $color-white;
  }
</style>
