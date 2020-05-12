<template lang="pug">
  header.gloabl-header.navbar.navbar-expand.d-flex.align-items-center
    .navbar-brand.isPc SsPM UI

    .form-inline.flex-nowrap
      input.form-control.form-control-sm(type="text" v-model="sheetID",placeholder="sheetID",autocomplete="on",name="sheetID")
      nuxt-link.btn.btn-primary.btn-sm(:to="{name:'sheetID',params:{sheetID:sheetID}}") Move

    a.btn.btn-link.isPc(:href="`https://docs.google.com/spreadsheets/d/${getSheetId()}`" :target="sheetID")
      b-icon.ml-2(icon="table")
      span {{sheetName}}

    button.btn.btn-link(@click="reload()")
      b-icon(v-if="!loading" icon="cloud-download" :class="{'a-rolling':loading}")
      b-icon.a-rolling(v-else icon="arrow-repeat")

    .user.ml-auto
      .body(v-if="isLogin()")
        span.user__name {{userStore.email}}
        button.btn.btn-sm.btn-secondary.mr-2(v-on:click="singOut") SingOut

      .body(v-else)
        button.btn.btn-primary.btn-sm(v-on:click="singIn") SingIn

</template>

<script lang="ts">
  import {Component, Vue} from "~/node_modules/nuxt-property-decorator";
  import {loginStore, userStore, taskStore, paramStore} from "~/utils/store-accessor";
  import GapiMgr from "~/utils/GapiMgr";
  import Utils from "~/utils/Utils";

  @Component({
    components: {}
  })
  export default class GlobalHeaderComp extends Vue {
    userStore = userStore;
    taskStore = taskStore;
    paramStore = paramStore;
    sheetID = "";
    sheetName = "";
    timestamp = 0;
    loading: boolean = true;

    mounted() {
      console.log("GlobalHeaderComp", "mounted")
      this.sheetID = this.$route.params.sheetID;
    }

    getSheetId() {
      if (this.$route.params.sheetID && paramStore.sheetID != this.$route.params.sheetID) {
        paramStore.updateSheetID(this.$route.params.sheetID);
        this.reload();
      }
      return this.$route.params.sheetID;
    }

    reload() {
      this.loading = true;
      GapiMgr.batchGet(this.$route.params.sheetID, {
        range: "Master", callBack: (csv: any[][]) => {
          let v = Utils.csv2Json(csv);
          taskStore.add(v);
          console.log("Master", v);

          this.loading = false;
        }
      }, {
        range: "_parameter", callBack: (csv: any[][]) => {
          let v = Utils.csv2List(csv);
          paramStore.update(v);
          console.log("_parameter", v);
        }
      });

      // Spreadsheetのカラースタイルを取得して反映する
      GapiMgr.getMeta(this.$route.params.sheetID, (result: any) => {
        this.sheetName = result.properties.title;
        let dynamicCommonStyle: any[] = [
          // {id: "連携", bg: "rgba(255,255,0,1)", text: "rgba(0,0,0,1)"}
        ];
        for (let formats of result.sheets![0].conditionalFormats) {
          // console.log(formats);

          let item: any = {};
          item.id = formats.booleanRule.condition.values[0].userEnteredValue;
          let r = item.id.match(/="(.*?)"/);
          if (r) item.id = r[1];

          if (formats.booleanRule.format.backgroundColor) {
            let rgb = formats.booleanRule.format.backgroundColor;
            item.bg = `rgba(${Math.floor(rgb.red * 255)},${Math.floor(rgb.green * 255)},${Math.floor(rgb.blue * 255)},1)`;
          }
          if (formats.booleanRule.format.textFormat) {
            let rgb = formats.booleanRule.format.textFormat.foregroundColor;
            item.text = `rgba(${Math.floor(rgb.red * 255)},${Math.floor(rgb.green * 255)},${Math.floor(rgb.blue * 255)},1)`;
          }

          dynamicCommonStyle.push(item);
        }
        paramStore.updateDynamicCommonStyle(dynamicCommonStyle);
      })
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
