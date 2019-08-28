<template lang="pug">
  .stage
    component(:is="page",:path="path")
</template>

<script lang="ts">
  import {Component, Prop, Vue} from "vue-property-decorator";
  import {FBC} from "@/FBC";
  import SpacesListView from "@/components/SpacesListView.vue";
  import SpaceView from "@/components/SpaceView.vue";
  import ProjectView from "@/components/ProjectView.vue";

  @Component({
    components: {ProjectView, SpaceView, SpacesListView}
  })
  export default class Stage extends Vue {
    static instance: Stage;
    target: string = "";
    via: string = "";
    command: string = "";
    page: string = "";
    path: string = "";

    created() {
      Stage.instance = this;
    }

    beforeMount() {

    }

    mounted() {
      FBC.init(() => {
        this.page = "SpacesListView";
      });
    }

    beforeDestroy() {

    }

    save() {
      // firebase.database().ref("order-list").push({
      //   target:this.target,
      //   via:this.via,
      //   text:this.command
      // });
      // console.log(this.target, this.via, this.command)
    }

    static jump(viewName: string, path: string) {
      Stage.instance.path = path;
      Stage.instance.page = viewName;
    }
  }
</script>

<style lang="scss">

</style>
