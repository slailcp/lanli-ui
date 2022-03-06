import { defineComponent } from "vue"
import { withInstall } from '../utils';

const _trigTop = defineComponent({
  name: 'icon-trig-top',
  setup() {
    return () => (
      <svg class="icon" width="20" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M512 320L192 704h639.936z"></path></svg>
    )
  }
})

export const trigTop = withInstall(_trigTop);
export default trigTop

declare module 'vue' {
  export interface GlobalComponents {
    trigTop: typeof trigTop;
  }
}

