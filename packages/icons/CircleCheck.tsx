import { defineComponent } from "vue"
import { withInstall } from '../utils';

const _CircleCheck = defineComponent({
  name: 'icon-circle-check',
  setup() {
    return () => (
      <svg class="icon" width="20" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M512 896a384 384 0 100-768 384 384 0 000 768zm0 64a448 448 0 110-896 448 448 0 010 896z"></path><path fill="currentColor" d="M745.344 361.344a32 32 0 0145.312 45.312l-288 288a32 32 0 01-45.312 0l-160-160a32 32 0 1145.312-45.312L480 626.752l265.344-265.408z"></path></svg>
    )
  }
})

export const CircleCheck = withInstall(_CircleCheck);
export default CircleCheck

declare module 'vue' {
  export interface GlobalComponents {
    CircleCheck: typeof CircleCheck;
  }
}

