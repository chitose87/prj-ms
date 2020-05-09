<template lang="pug">
  .nob(
    @touchstart="dragstart"
    @mousedown="dragstart"
    :class="`nob--${isVertical?'vertical':'horizontal'}`"
  )
    b-icon(v-if="isVertical" icon="three-dots")
    b-icon(v-else icon="three-dots-vertical")

</template>

<script lang="ts">
  import {Component, Prop, Vue} from "~/node_modules/nuxt-property-decorator";
  import {paramStore} from "~/utils/store-accessor";

  @Component({
    components: {}
  })
  export default class NobComp extends Vue {
    @Prop() layoutKey?: string;
    @Prop() isVertical?: boolean;

    paramStore = paramStore;

    flag = false;
    current: number = 0;
    before: number = 0;
    after: number = 0;

    created() {
      // document.addEventListener("dragenter", (e) => this.dragenter(e));
      document.addEventListener("touchmove", (e) => this.dragenter(e), {passive: false});
      document.addEventListener("mousemove", (e) => this.dragenter(e));
      document.addEventListener("touchend", (e) => this.dragend(e));
      document.addEventListener("mouseup", (e) => this.dragend(e));
    }

    dragstart(e: any) {
      e.preventDefault();
      console.log("dragstart")
      //@ts-ignore
      this.current = this.paramStore.layout[this.layoutKey];
      if (this.isVertical) {
        this.before = this.after = e.screenY;
      } else {
        this.before = this.after = e.screenX;
      }

      if (this.flag) return;
      this.flag = true;
      this.loop();
    }

    dragend(e: any) {
      this.flag = false;
    }

    dragenter(e: any) {
      if (!this.flag) return;
      e.preventDefault();
      if (this.isVertical) {
        this.after = e.screenY;
      } else {
        this.after = e.screenX;
      }
    }

    loop() {
      let distance = this.after - this.before;
      if (distance) {
        this.current += distance;
        this.paramStore.updateE({key: this.layoutKey!, val: this.current});
        this.before = this.after;
      }
      if (this.flag) requestAnimationFrame(() => this.loop());
    }
  }
</script>

<style lang="scss" scoped>
  .nob {
    display: flex;
    justify-content: center;
    align-items: center;
    color: $gray-200;
    font-size: 32px;

    -moz-user-select: none;
    -khtml-user-select: none;
    -webkit-user-select: none;
    user-select: none;
    /* Required to make elements draggable in old WebKit */
    /*-khtml-user-drag: element;*/
    /*-webkit-user-drag: element;*/

    &--horizontal {
      height: 100%;
      width: 1rem;
      cursor: e-resize;
    }

    &--vertical {
      width: 100%;
      height: 1rem;
      cursor: n-resize;
    }

    &:hover {
      background-color: rgba($black, 0.05);
      color: $white;
    }
  }
</style>
