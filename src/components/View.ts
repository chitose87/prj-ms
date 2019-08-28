import {Component, Prop, Vue} from "vue-property-decorator";
import Stage from "@/components/Stage.vue";

export class View extends Vue {
  created() {

  }

  beforeMount() {

  }

  mounted() {
  }

  beforeDestroy() {

  }

  jump(viewName: string, path: string) {
    // @ts-ignore
    Stage.jump(viewName, path);
  }
}
