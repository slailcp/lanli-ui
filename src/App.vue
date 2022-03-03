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
  <button @click="atoastClose">atoastClose</button>
  <!-- <lan-icon-select />
  <lan-icon-close-bold />-->
  <div style="height:3000px;background:#fff"></div>

  <popup v-model:show="toggle" :style="{ height: '20%',width:'20%' }">
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
</style>
