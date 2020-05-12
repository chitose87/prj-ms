<template lang="pug">
  .sheet-page
    .layout(v-if="loginStore.status && $route.params.sheetID")
      .layout__dashboard(:style="`width:${changeSeparaterWidth()}px`")
        NobComp(:layoutKey="'dashboard'",:isVertical="false")
        DashBoardComp
      .layout__task
        TaskDetailComp(:taskId="this.$route.hash.substr(1)")
    InviteLoginComp(v-else)
</template>

<script lang="ts">
  import {Component, Prop} from "~/node_modules/vue-property-decorator";
  import {Vue} from "~/node_modules/nuxt-property-decorator";
  import NobComp from "~/components/utils/NobComp.vue";
  import DashBoardComp from "~/components/DashBoardComp.vue";
  import InviteLoginComp from "~/components/InviteLoginComp.vue";
  import TaskDetailComp from "~/components/TaskDetailComp.vue";
  import {loginStore, paramStore} from "~/utils/store-accessor";

  @Component({
    // layout: 'dashbord',
    components: {TaskDetailComp, InviteLoginComp, DashBoardComp, NobComp}
  })
  export default class SheetPage extends Vue {
    loginStore = loginStore;
    paramStore = paramStore;
    dashboardX = paramStore.layout.dashboard;
    isAnimation = false;

    created() {
      this.isAnimation = true;

      let target = paramStore.layout.dashboard;
      this.dashboardX = window.innerWidth;
      if (target / window.innerWidth > 0.9) {
        target = window.innerWidth / 2
      }
      gsap.TweenLite.to(this, 0.5, {
        dashboardX: target,
        onUpdate: () => {
          paramStore.updateE({key: "dashboard", val: this.dashboardX});
        },
        onComplete: () => {
          this.isAnimation = false;
        }
      });
    }

    changeSeparaterWidth() {
      this.dashboardX = paramStore.layout.dashboard;

      if (!this.isAnimation) {
        if (this.dashboardX / window.innerWidth > 0.9) {
          this.isAnimation = true;
          gsap.TweenLite.to(this, 0.5, {
            dashboardX: window.innerWidth,
            onUpdate: () => {
              paramStore.updateE({key: "dashboard", val: this.dashboardX});
            },
            onComplete: () => {
              this.$router.push("/" + this.$route.params.sheetID);
              requestAnimationFrame(() => {
                this.isAnimation = false;
              })
            }
          });
        }
      }
      return this.dashboardX;
    }
  }
</script>

<style lang="scss" scoped>
  .sheet-page {
    width: 100%;
    height: 100%;
    overflow: auto;
    position: relative;
  }

  .layout {
    width: 100%;
    height: calc(100vh - 3rem);
    @include mediaquery-not-sm {
      display: flex;
      overflow: hidden;
    }

    &__dashboard {
      flex-shrink: 0;
      position: relative;
      min-width: 20vw;
      max-width: 100vw;

      .dash-board {
        width: 100%;
        height: 100%;
        overflow: scroll;
      }

      .nob {
        position: absolute;
        top: 0;
        right: -1rem;
        z-index: 1;
      }

      @include mediaquery-sm {
        display: none;
      }
    }

    &__task {
      flex-grow: 1;
      flex-shrink: 1;
      overflow: auto;
    }
  }
</style>
