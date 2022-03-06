import { defineComponent } from "vue"
import { withInstall } from '../utils';

const _Circle = defineComponent({
  name: 'icon-circle',
  setup() {
    return () => (
      <svg class="icon" width="20" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
        <path fill="currentColor" d="M512 896a384 384 0 100-768 384 384 0 000 768zm0 64a448 448 0 110-896 448 448 0 010 896z"></path>
      </svg>
    )
  }
})

export const Circle = withInstall(_Circle);
export default Circle

declare module 'vue' {
  export interface GlobalComponents {
    Circle: typeof Circle;
  }
}

