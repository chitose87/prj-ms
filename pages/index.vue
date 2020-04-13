<template lang="pug">
  .top
    global-header-comp
    .container
      p hoge


      //-
        onload="this.onload=function(){};handleClientLoad()"
        onreadystatechange="if (this.readyState === 'complete') this.onload()">

</template>

<script lang="ts">
  import {Component} from "~/node_modules/vue-property-decorator";
  import {Vue} from "~/node_modules/nuxt-property-decorator";
  import GlobalHeaderComp from "~/components/GlobalHeaderComp.vue";
  import {loginStore} from "~/utils/store-accessor";

  @Component({
    components: {GlobalHeaderComp}
  })
  export default class TopPageComp extends Vue {
    mounted() {
      gapi.load('client:auth2', () => {
        gapi.client.init({
          apiKey: process.env.apiKey,
          clientId: process.env.clientId,
          discoveryDocs: ["https://sheets.googleapis.com/$discovery/rest?version=v4"],
          scope: "https://www.googleapis.com/auth/spreadsheets"
        }).then(() => {
          loginStore.change(gapi.auth2.getAuthInstance().isSignedIn.get());
          gapi.auth2.getAuthInstance().isSignedIn.listen((e: boolean) => {
            loginStore.change(e);
          });
        }, function (error) {
          console.log(error);
        });
      });
    }
  }
</script>

<style lang="scss">

</style>
