import { defineComponent } from "vue"
import { withInstall } from '../utils';

const _trigRight = defineComponent({
  name: 'icon-trig-right',
  setup() {
    return () => (
      <svg class="icon" width="20" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M384 192v640l384-320.064z"></path></svg>
    )
  }
})

export const trigRight = withInstall(_trigRight);
export default trigRight

declare module 'vue' {
  export interface GlobalComponents {
    trigRight: typeof trigRight;
  }
}

