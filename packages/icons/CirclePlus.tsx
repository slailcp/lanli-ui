import { defineComponent } from "vue"
import { withInstall } from '../utils';

const _CirclePlus = defineComponent({
  name: 'icon-circle-plus',
  setup() {
    return () => (
      <svg class="icon" width="20" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M352 480h320a32 32 0 110 64H352a32 32 0 010-64z"></path><path fill="currentColor" d="M480 672V352a32 32 0 1164 0v320a32 32 0 01-64 0z"></path><path fill="currentColor" d="M512 896a384 384 0 100-768 384 384 0 000 768zm0 64a448 448 0 110-896 448 448 0 010 896z"></path></svg>
    )
  }
})

export const CirclePlus = withInstall(_CirclePlus);
export default CirclePlus

declare module 'vue' {
  export interface GlobalComponents {
    CirclePlus: typeof CirclePlus;
  }
}

