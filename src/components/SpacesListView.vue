<template lang="pug">
  .space-list-view
    v-list
      v-list-tile(v-for="item in spaceList" v-on:click="jump('SpaceView',item.path)")
        v-list-tile-action(v-html="item.name")

</template>

<script lang="ts">
  import {Component, Prop, Vue} from "vue-property-decorator";
  import * as firebase from "firebase";
  import {SpaceData} from "@/data/SpaceData";
  import {View} from "@/components/View";

  @Component({})
  export default class SpacesListView extends View {
    spaceList: SpaceData[] = [];

    created() {

    }

    beforeMount() {

    }

    mounted() {
      firebase.firestore().collection("spaces")
        .get()
        .then((querySnapshot: firebase.firestore.QuerySnapshot) => {
          querySnapshot.forEach((doc: firebase.firestore.QueryDocumentSnapshot) => {
            this.spaceList.push(new SpaceData(doc));
          });
        })
        .catch((error) => {
          console.log("Error getting documents: ", error);
        });
    }

    beforeDestroy() {

    }
  }
</script>

<style lang="scss">

</style>
