import { defineComponent } from "vue"
import { withInstall } from '../utils';

const _ArrowDownBold = defineComponent({
  name: 'icon-arrow-down-bold',
  setup() {
    return () => (
      <svg class="icon" width="20" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M104.704 338.752a64 64 0 0190.496 0l316.8 316.8 316.8-316.8a64 64 0 0190.496 90.496L557.248 791.296a64 64 0 01-90.496 0L104.704 429.248a64 64 0 010-90.496z"></path></svg>
    )
  }
})

export const ArrowDownBold = withInstall(_ArrowDownBold);
export default ArrowDownBold

declare module 'vue' {
  export interface GlobalComponents {
    ArrowDownBold: typeof ArrowDownBold;
  }
}

