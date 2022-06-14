<template>
  <div id="nav">
    <router-view/>
  </div>
</template>

<script lang="ts">
import { reactive, toRefs } from "vue";

export default {
  setup() {
    const state = reactive({
      toggle: false,
    });

    return {
      ...toRefs(state),
    };
  },
};
</script>


<style lang="less">
.icon-box {
  display: flex;
  flex-wrap: wrap;
}
.icon-span {
  width: 25%;
  padding: 10px 0;
  font-size: 12px;
  text-align: center;
  box-sizing: border-box;
  box-shadow: 0 0 1px #bdd0f5;
}
.icon {
  width: 20px;
  height: 20px;
}
</style>
