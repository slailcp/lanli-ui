import { defineComponent } from "vue"
import { withInstall } from '../utils';

const _trigLeft = defineComponent({
  name: 'icon-trig-left',
  setup() {
    return () => (
      <svg class="icon" width="20" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M672 192L288 511.936 672 832z"></path></svg>
    )
  }
})

export const trigLeft = withInstall(_trigLeft);
export default trigLeft

declare module 'vue' {
  export interface GlobalComponents {
    trigLeft: typeof trigLeft;
  }
}

