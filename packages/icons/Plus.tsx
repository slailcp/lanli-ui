import { defineComponent } from "vue"
import { withInstall } from '../utils';

const _Plus = defineComponent({
  name: 'icon-plus',
  setup() {
    return () => (
      <svg class="icon" width="20" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M480 480V128a32 32 0 0164 0v352h352a32 32 0 110 64H544v352a32 32 0 11-64 0V544H128a32 32 0 010-64h352z"></path></svg>
    )
  }
})

export const Plus = withInstall(_Plus);
export default Plus

declare module 'vue' {
  export interface GlobalComponents {
    Plus: typeof Plus;
  }
}

