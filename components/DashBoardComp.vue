<template lang="pug">
  .dash-board(v-on:scroll="onScroll()")
    nuxt-link.btn.btn-link.add-task(:to="`/${$route.params.sheetID}/new`")
      b-icon(icon="plus-circle-fill" @click="")
    .filter.form-inline.p-2

      label.form-check.mr-3
        input.form-check-input(type="checkbox" v-model="filter.active")
        span.form-check-label 絞り込み
      span.mr-3 |
      label.form-check.mr-3
        button.btn.btn-outline-secondary(@click="filter.val.currentUsers=[userStore.email],filter.active=true") 自分担当
      label.form-check.mr-3
        input.form-check-input(type="checkbox" :checked="isIncludeDeactiveTask" @change="isIncludeDeactiveTaskChange($event.target.checked)")
        span.form-check-label 完了,不要を含める

    table.table(v-if="taskStore.task")
      thead
        tr
          th.bg-primary.text-white.border-0(v-for="item in paramStore.headerOrder" scope="col"
            v-if="item.show"
            :class="item.name"
            :style="item.name==='title'?`width:${paramStore.layout.title}px`:''"
          )
            div(v-if="item.name==='id'")
              span.nowrap {{item.label}}

            div(v-else-if="item.name==='title'")
              span.nowrap(v-if="!filter.active") {{item.label}}
              div(v-if="filter.active")
                label キーワード
                input.form-control(type="text" v-model="filter.val.keyword")
                p.form-text.small.mb-0 ＊タイトルと説明文より
              NobComp(:layoutKey="'title'",:isVertical="false")

            div(v-else-if="item.name==='category'")
              span.nowrap {{item.label}}
              select.form-control(v-if="filter.active" v-model="filter.val.category" multiple @change="filterChange('category')")
                option(v-if="filter.val.category.length" value="_clear") [ Clear ]
                option(v-else disabled) - 未設定 -
                option(v-for="item in paramStore.category" :value="item") {{item}}
                option(value="") [ 空 ]

            div(v-else-if="item.name==='tags'")
              span.nowrap {{item.label}}
              select.form-control(v-if="filter.active" v-model="filter.val.tags" multiple @change="filterChange('tags')")
                option(v-if="filter.val.tags.length" value="_clear") [ Clear ]
                option(v-else disabled) - 未設定 -
                option(v-for="item in paramStore.tags" :value="item") {{item}}
                option(value="") [ 空 ]

            div(v-else-if="item.name==='status'")
              span.nowrap {{item.label}}
              select.form-control(v-if="filter.active" v-model="filter.val.status" multiple @change="filterChange('status')")
                option(v-if="filter.val.status.length" value="_clear") [ Clear ]
                option(v-else disabled) - 未設定 -
                option(v-for="item in paramStore.status" :value="item") {{item}}
                option(value="") [ 空 ]

            div(v-else-if="item.name==='importance'")
              span.nowrap {{item.label}}
              div(v-if="filter.active")
                input.form-control.form-control-sm(type="number" v-model="filter.val.importance.top")
                hr
                input.form-control.form-control-sm(type="number" v-model="filter.val.importance.bottom")

            div(v-else-if="item.name==='adminUsers'")
              span.nowrap {{item.label}}
              select.form-control(v-if="filter.active" v-model="filter.val.adminUsers" multiple @change="filterChange('adminUsers')")
                option(v-if="filter.val.adminUsers.length" value="_clear") [ Clear ]
                option(v-else disabled) - 未設定 -
                option(v-for="item in paramStore.email" :value="item" v-html="utils.getEmailName(item)")
                option(value="") [ 空 ]

            div(v-else-if="item.name==='currentUsers'")
              span.nowrap {{item.label}}
              select.form-control(v-if="filter.active" v-model="filter.val.currentUsers" multiple @change="filterChange('currentUsers')")
                option(v-if="filter.val.currentUsers.length" value="_clear") [ Clear ]
                option(v-else disabled) - 未設定 -
                option(v-for="item in paramStore.email" :value="item" v-html="utils.getEmailName(item)")
                option(value="") [ 空 ]

            div(v-else-if="item.name==='targetDate'")
              span.nowrap {{item.label}}
              div(v-if="filter.active")
                input.form-control.form-control-sm(type="date" v-model="filter.val.targetDate.top")
                hr
                input.form-control.form-control-sm(type="date" v-model="filter.val.targetDate.bottom")

            div(v-else-if="item.name==='deadlineDate'")
              span.nowrap {{item.label}}
              div(v-if="filter.active")
                input.form-control.form-control-sm(type="date" v-model="filter.val.deadlineDate.top")
                hr
                input.form-control.form-control-sm(type="date" v-model="filter.val.deadlineDate.bottom")

      tbody
        RecordComp(v-for="item in taskStore.task"
          :data="item"
          v-show="setFiltered(item)")


</template>

<script lang="ts">
  import {Component, Vue} from "~/node_modules/nuxt-property-decorator";
  import GapiMgr from "~/utils/GapiMgr";
  import RecordComp from "~/components/RecordComp.vue";
  import {paramStore, taskStore, userStore} from "~/utils/store-accessor";
  import Utils from "~/utils/Utils";
  import {IRecordData} from "~/utils/Record";
  import NobComp from "~/components/utils/NobComp.vue";
  import param from "~/store/param";

  @Component({
    components: {NobComp, RecordComp}
  })
  export default class DashBoardComp extends Vue {
    isIncludeDeactiveTask: boolean = false;

    static scrollTop: number = 0;

    utils = Utils;
    taskStore = taskStore;
    paramStore = paramStore;
    userStore = userStore;

    filter = {
      active: false,
      // visible: true,
      val: <any>{
        keyword: "",
        status: <string[]>[],
        category: <string[]>[],
        tags: <string[]>[],
        adminUsers: <string[]>[],
        currentUsers: <string[]>[],
        importance: {top: 0, bottom: 0},
        targetDate: {top: 0, bottom: 0},
        deadlineDate: {top: 0, bottom: 0},
      }
    };

    mounted() {
      console.log("mounted", "DashBoardComp")
      //scroll
      let loop = () => {
        let v: HTMLElement | null = this.$el.querySelector(".nuxt-link-active");
        if (v) {
          let y = v.offsetTop - (this.$el.clientHeight / 2) + (v.clientHeight / 2);
          if (Math.abs(y - DashBoardComp.scrollTop) < this.$el.clientHeight / 3) {
            y = DashBoardComp.scrollTop;
          }
          gsap.TweenLite.fromTo(this.$el, 0.6,
            {
              scrollTop: DashBoardComp.scrollTop
            }, {
              scrollTop: y,
              ease: gsap.Circ.easeOut,
              autoKill: true
            });
        } else if (this.$el) {
          requestAnimationFrame(() => loop())
        }
      };
      loop();

      let unwatch = this.$store.watch((state: any, getters: any) => {
        if (paramStore.status && paramStore.status.length) {
          this.isIncludeDeactiveTaskChange(this.isIncludeDeactiveTask);
          if (unwatch) unwatch();
        }
      }, (value: any, oldValue: any) => {
        // console.log("bbb", value, oldValue);
      });
    }

    onScroll() {
      DashBoardComp.scrollTop = this.$el.scrollTop;
    }

    isIncludeDeactiveTaskChange(value: boolean) {
      this.isIncludeDeactiveTask = value;
      if (value && this.filter.val.status.length > 0) {//add && フィルターされている
        if (this.filter.val.status.indexOf("完了") == -1) {//ない
          this.filter.val.status.push("完了");
        }
        if (this.filter.val.status.indexOf("不要") == -1) {//ない
          this.filter.val.status.push("不要");
        }
      } else if (!value) {//remove
        if (this.filter.val.status.length == 0) {//フィルターされていない
          this.filter.val.status = [...paramStore.status, ""];
        }
        let i;
        i = this.filter.val.status.indexOf("完了");
        if (i >= 0) {//ある
          this.filter.val.status.splice(i, 1);
        }
        i = this.filter.val.status.indexOf("不要");
        if (i >= 0) {//ある
          this.filter.val.status.splice(i, 1);
        }
      }
    }

    filterChange(key: string) {
      if (this.filter.val[key].indexOf("_clear") >= 0) {
        this.filter.val[key].length = 0;
      }
      switch (key) {
        case "status":
          let indeterminate = false;
          if (this.filter.val.status.length == 0) {//フィルターされていない
            this.isIncludeDeactiveTask = true;
          } else {//フィルターされている
            let k = this.filter.val.status.indexOf("完了") >= 0;
            let f = this.filter.val.status.indexOf("不要") >= 0;
            if (k == f) {//同じ
              this.isIncludeDeactiveTask = k;
            } else {
              indeterminate = true;
            }
          }
          //@ts-ignore
          this.$refs.includeDeactiveTaskCB.indeterminate = indeterminate;
          break;
      }
    }

    setFiltered(item: IRecordData) {
      console.log("setFiltered", this.filter.val.currentUsers)
      // if (this.filter.active) {
      //return false, or pass
      for (let key of ["status", "currentUsers", "category", "tags", "adminUsers"]) {
        //@ts-ignore
        const selects: string[] = this.filter.val[key], value: string | string[] = item[key];
        if (selects.length) {
          if (Array.isArray(value)) {
            // list value
            if (value.length) {
              let v = [...selects, ...value];
              // console.log(v, new Set(v).size, v.length);
              if (new Set(v).size == v.length) return false;
            } else if (selects.indexOf("") == -1) {
              // _blank
              return false;
            }
          } else if (selects.indexOf(value) == -1) {
            // single value
            return false;
          }
        }
      }

      //keyword
      if (this.filter.val.keyword) {
        let str = this.filter.val.keyword.replace(/( |　|,)/g, "<and>");
        let regStr = "";
        for (let col of str.split("<and>")) {
          regStr += "(?=.*" + col + ")";
        }
        let reg = new RegExp(`(${regStr})`, "i");
        if (!`${item.title}${item.description}`.match(reg)) {
          return false;
        }
      }
      // }
      return true;
    }
  }
</script>

<style lang="scss" scoped>
  .dash-board {
    width: 100%;
    height: 100%;
    overflow: scroll;

    .add-task {
      position: fixed;
      left: 1rem;
      bottom: 1rem;
      padding: 0.5rem;
      font-size: 36px;
      z-index: $zindex-fixed;
      text-shadow: $box-shadow-lg;
    }
  }

  .nowrap {
    white-space: nowrap;
  }

  .form-control {
    padding-left: 0;
    padding-right: 0;
  }

  table {
    table-layout: fixed;

    thead {
      tr th {
        position: sticky;
        top: 0;
        z-index: $zindex-sticky+1;
        vertical-align: top;
      }
    }

    tbody {
    }

    th {
    }
  }

  .id {
    width: 2.5em;
  }

  .title {
    /*resize: horizontal;*/
    /*overflow: auto;*/
    @include mediaquery-not-sm {
      position: sticky;
      left: 0;
      z-index: $zindex-sticky+2;

      min-width: 10em;
      width: 10em;
      .nob {
        position: absolute;
        top: 0;
        right: -0.5rem;
      }
    }
    @include mediaquery-sm {
      width: 65vw !important;
      .nob {
        display: none;
      }
    }
  }

  .category {
    width: 6em;
  }

  .tags {
    width: 6em;
  }

  .status {
    width: 6em;
  }

  .importance {
    width: 5em;

    input {
      /*width: 80px;*/
    }
  }

  .adminUsers {
    width: 6em;
  }

  .currentUsers {
    width: 6em;
  }

  .targetDate {
    width: 8em;
  }

  .deadlineDate {
    width: 7em;
  }
</style>
