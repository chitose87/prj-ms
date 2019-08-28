<template lang="pug">
  .project-view
    div(v-if="data")
      h2(v-html="data.name")

      //v-list
      //  v-list-tile(v-for="item in projectList" v-on:click="jump('ProjectView',item.path)")
      //    v-list-tile-action(v-html="item.name")

</template>

<script lang="ts">
  import {Component, Prop, Vue} from "vue-property-decorator";
  import * as firebase from "firebase";
  import {View} from "@/components/View";
  import {ProjectData} from "@/data/ProjectData";

  @Component({})
  export default class ProjectView extends View {
    @Prop() path!: string;
    data: ProjectData | null = null;
    // projectList: ProjectData[] = [];

    created() {

    }

    beforeMount() {
    }

    mounted() {
      firebase.firestore().doc(this.path)
        .get()
        .then((val: any) => {
          this.data = new ProjectData(val);
        })
        .catch((error) => {
          console.log("Error", error);
        });

      // //projects
      // firebase.firestore().collection(this.path + "/projects")
      //   .get()
      //   .then((val: any) => {
      //     val.forEach((doc: firebase.firestore.QueryDocumentSnapshot) => {
      //       this.projectList.push(new ProjectData(doc));
      //     });
      //   })
      //   .catch((e) => {
      //     console.log(e)
      //   })
    }

    beforeDestroy() {

    }
  }
</script>

<style lang="scss">

</style>
