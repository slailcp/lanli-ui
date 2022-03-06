<template>
  <!-- <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </div>
  -->
  <router-link to="/about">About</router-link>
  <router-view />
  <br />
  <br />
  <br />
  <br />
  <button @click="toggle = !toggle">toggle</button>
  <button @click="confirm">confirm</button>
  <button @click="lalert">lalert</button>
  <button @click="atoast">atoast</button>
  <button @click="atoastClose">atoastClose</button> <br />
  <br />
  <br />
<!-- 
  <div class="icon-box">
    <span class="icon-span"><lan-icon-arrow-down class="icon" /><br/></span>
    <span class="icon-span"><lan-icon-arrow-down-bold class="icon" /><br/></span>
    <span class="icon-span"><lan-icon-arrow-left class="icon" /><br/></span>
    <span class="icon-span"><lan-icon-arrow-left-bold class="icon" /><br/></span>
    <span class="icon-span"><lan-icon-arrow-right class="icon" /><br/></span>
    <span class="icon-span"><lan-icon-arrow-right-bold class="icon" /><br/></span>
    <span class="icon-span"><lan-icon-arrow-up class="icon" /><br/></span>
    <span class="icon-span"><lan-icon-arrow-up-bold class="icon" /><br/></span>
    <span class="icon-span"><lan-icon-back class="icon" /><br/></span>
    <span class="icon-span"><lan-icon-bottom class="icon" /><br/></span>
    <span class="icon-span"><lan-icon-circle class="icon" /><br/></span>
    <span class="icon-span"><lan-icon-circle-check class="icon" /><br/></span>
    <span class="icon-span"><lan-icon-circle-check-filled class="icon" /><br/></span>
    <span class="icon-span"><lan-icon-circle-close class="icon" /><br/></span>
    <span class="icon-span"><lan-icon-circle-close-filled class="icon" /><br/></span>
    <span class="icon-span"><lan-icon-circle-plus class="icon" /><br/></span>
    <span class="icon-span"><lan-icon-circle-plus-filled class="icon" /><br/></span>
    <span class="icon-span"><lan-icon-close class="icon" /><br/></span>
    <span class="icon-span"><lan-icon-close-bold class="icon" /><br/></span>

    <span class="icon-span"><lan-icon-minus class="icon" /><br/></span>
    <span class="icon-span"><lan-icon-plus class="icon" /><br/></span>
    <span class="icon-span"><lan-icon-remove class="icon" /><br/></span>
    <span class="icon-span"><lan-icon-remove-filled class="icon" /><br/></span>
    <span class="icon-span"><lan-icon-select class="icon" /><br/></span>

    <span class="icon-span"><lan-icon-top class="icon" /><br/></span>
    <span class="icon-span"><lan-icon-trig-bottom class="icon" /><br/></span>
    <span class="icon-span"><lan-icon-trig-left class="icon" /><br/></span>
    <span class="icon-span"><lan-icon-trig-right class="icon" /><br/></span>
    <span class="icon-span"><lan-icon-trig-top class="icon" /><br/></span>

    <span class="icon-span"><lan-icon-warning class="icon" /><br/></span>
    <span class="icon-span"><lan-icon-warning-filled /><br/></span>
  </div> -->


    <div class="icon-box">
    <span class="icon-span"><lan-icon-arrow-down class="icon" /><br/>arrow-down</span>
    <span class="icon-span"><lan-icon-arrow-down-bold class="icon" /><br/>arrow-down-bold</span>
    <span class="icon-span"><lan-icon-arrow-left class="icon" /><br/>arrow-left</span>
    <span class="icon-span"><lan-icon-arrow-left-bold class="icon" /><br/>arrow-left-bold</span>
    <span class="icon-span"><lan-icon-arrow-right class="icon" /><br/>arrow-right</span>
    <span class="icon-span"><lan-icon-arrow-right-bold class="icon" /><br/>arrow-right-bold</span>
    <span class="icon-span"><lan-icon-arrow-up class="icon" /><br/>arrow-up</span>
    <span class="icon-span"><lan-icon-arrow-up-bold class="icon" /><br/>arrow-up-bold</span>
    <span class="icon-span"><lan-icon-back class="icon" /><br/>back</span>
    <span class="icon-span"><lan-icon-bottom class="icon" /><br/>bottom</span>
    <span class="icon-span"><lan-icon-circle class="icon" /><br/>circle</span>
    <span class="icon-span"><lan-icon-circle-check class="icon" /><br/>circle-check</span>
    <span class="icon-span"><lan-icon-circle-check-filled class="icon" /><br/>circle-check-filled</span>
    <span class="icon-span"><lan-icon-circle-close class="icon" /><br/>circle-close</span>
    <span class="icon-span"><lan-icon-circle-close-filled class="icon" /><br/>circle-close-filled</span>
    <span class="icon-span"><lan-icon-circle-plus class="icon" /><br/>circle-plus</span>
    <span class="icon-span"><lan-icon-circle-plus-filled class="icon" /><br/>circle-plus-filled</span>
    <span class="icon-span"><lan-icon-close class="icon" /><br/>close</span>
    <span class="icon-span"><lan-icon-close-bold class="icon" /><br/>close-bold</span>

    <span class="icon-span"><lan-icon-minus class="icon" /><br/>minus</span>
    <span class="icon-span"><lan-icon-plus class="icon" /><br/>plus</span>
    <span class="icon-span"><lan-icon-remove class="icon" /><br/>remove</span>
    <span class="icon-span"><lan-icon-remove-filled class="icon" /><br/>remove-filled</span>
    <span class="icon-span"><lan-icon-select class="icon" /><br/>select</span>

    <span class="icon-span"><lan-icon-top class="icon" /><br/>top</span>
    <span class="icon-span"><lan-icon-trig-bottom class="icon" /><br/>trig-bottom</span>
    <span class="icon-span"><lan-icon-trig-left class="icon" /><br/>trig-left</span>
    <span class="icon-span"><lan-icon-trig-right class="icon" /><br/>trig-right</span>
    <span class="icon-span"><lan-icon-trig-top class="icon" /><br/>trig-top</span>

    <span class="icon-span"><lan-icon-warning class="icon" /><br/>warning</span>
    <span class="icon-span"><lan-icon-warning-filled /><br/>warning-filled</span>
  </div>
  <div style="height: 3000px; background: #fff"></div>

  <popup v-model:show="toggle" :style="{ height: '20%', width: '20%' }">
    <button @click="toggle = !toggle">toggle</button>
  </popup>
</template>

<script lang="ts">
import { reactive, toRefs } from "vue";
import { Popup, Layer, Toast } from "../packages";

export default {
  components: { Popup: Popup },
  setup() {
    const state = reactive({
      toggle: false,
    });

    // let loading: any
    const atoastClose = () => {
      // Toast.close(loading);
      // console.log(loading);
    };
    const atoast = () => {
      const loading = Toast({
        type: "loading",
        // width:"50%",
        message: "success",
        // allowHtml: true,
        shade: false,
        // shadeClassName:'shadeClassNameshadeClassName',
        // position:'top'
        duration: 3000,
        onOpened: () => {
          console.log("dddsopen");
        },
        onClose: () => {
          console.log("onClose");
        },
      });

      setTimeout(() => {
        Toast.close(loading);
      }, 1000);
    };
    const lalert = () => {
      Layer.alert({
        message: "真的要删除吗?",
        // beforeClose: (action) => {},
        confirmButtonText: "点错了",
      }).then((ret) => {
        console.log(ret);
      });
    };

    const confirm = () => {
      Layer.confirm({
        message: "真的要删除吗?",
        className: "app-home-confirm",
        allowHtml: true,
        lockScroll: false,
        beforeClose: (action) => {
          // if (action === "confirm") { return false; }
          return new Promise((resolve) => {
            setTimeout(() => {
              if (action === "confirm") {
                resolve(true);
              } else {
                // 拦截取消操作
                resolve(false);
              }
            }, 1000);
          });
        },
        cancelButtonText: "取消",
        confirmButtonText: "点错了啊",
      })
        .then((ret) => {
          console.log(ret);
        })
        .catch((ret) => {
          console.log(ret);
        });
    };

    return {
      ...toRefs(state),
      confirm,
      lalert,
      atoast,
      atoastClose,
    };
  },
};
</script>


<style lang="less">
.icon-box{display: flex;flex-wrap: wrap;}
.icon-span{width: 25%;padding:10px 0;font-size: 12px;text-align: center;box-sizing: border-box;box-shadow: 0 0 1px #bdd0f5;}
.icon {
  width: 20px;
  height: 20px;
}
</style>
