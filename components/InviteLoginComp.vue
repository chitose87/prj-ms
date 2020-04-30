<template lang="pug">
  .invite-login.text-center
    h3 右上の[SignIn]からログインしてください
    h4 初めての方は下記を確認
    nuxt-link.btn.btn-primary(to="/first") 初めてログインする方法

</template>

<script lang="ts">
  import {Component, Prop, Vue} from "~/node_modules/nuxt-property-decorator";
  import Utils from "~/utils/Utils";
  import {userStore} from "~/utils/store-accessor";

  @Component({
    components: {}
  })
  export default class InviteLoginComp extends Vue {
    mounted() {
    }
  }
</script>

<style lang="scss" scoped>
  .invite-login {

  }
</style>
