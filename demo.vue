<template>
  <!--document滚动-->
  <!-- <div v-for="item in List" :key="item" style="padding:50px .2rem;border-bottom:1px solid #ccc">{{item}}</div>
  <infinite-scroll :loadMoreFn="loadMoreFn" :hasMore="hasMore" />-->

  <!---容器中滚动--->
  <div id="box" style="height:5rem;overflow-y:auto;background: #fff;">
    <div v-for="item in List" :key="item" style="padding:20px 10px;border-bottom:1px solid #ccc">{{item}}</div>
    <infinite-scroll el="#box" :loadMoreFn="loadMoreFn" :hasMore="hasMore" />
  </div>
</template>

<script>
import { reactive, toRefs } from '@vue/reactivity'

import { onMounted } from '@vue/runtime-core';
import InfiniteScroll from "@/components/infinite-scroll/index.jsx";

export default {
  name: "demo",
  components: { InfiniteScroll },
  setup(props, { emit }) {
    const state = reactive({
      PageIndex: 1,
      hasMore: true,
      List: []
    })

    onMounted(() => {
      loadMoreFn()
    })

    async function loadMoreFn() {
      console.log('loadMore');
      const ret = await GetApi(state.PageIndex)
      state.hasMore = ret.length > 0;
      state.List = [...state.List, ...ret]
      state.PageIndex = state.PageIndex + 1
    }

    const GetApi = (PageIndex) => {
      return new Promise((resolve, reject) => {
        if (PageIndex == 4) {
          resolve([]);
          return;
        }
        setTimeout(() => {
          resolve([
            `${PageIndex}-1`,
            `${PageIndex}-2`,
            `${PageIndex}-3`,
            `${PageIndex}-4`,
            `${PageIndex}-5`,
            `${PageIndex}-6`,
            `${PageIndex}-7`,
            `${PageIndex}-8`,
            `${PageIndex}-9`,
            `${PageIndex}-10`,
          ])
        }, 1000);
      })
    }
    return {
      ...toRefs(state),
      loadMoreFn,
    }
  },
}


</script>

<style>
html {
  background: #eee;
}
</style>

