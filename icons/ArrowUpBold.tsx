import { defineComponent } from "vue"
import { withInstall } from '../utils';

const _ArrowUpBold = defineComponent({
  name: 'icon-arrow-up-bold',
  setup() {
    return () => (
      <svg class="icon" width="20" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M104.704 685.248a64 64 0 0090.496 0l316.8-316.8 316.8 316.8a64 64 0 0090.496-90.496L557.248 232.704a64 64 0 00-90.496 0L104.704 594.752a64 64 0 000 90.496z"></path></svg>
    )
  }
})

export const ArrowUpBold = withInstall(_ArrowUpBold);
export default ArrowUpBold

declare module 'vue' {
  export interface GlobalComponents {
    ArrowUpBold: typeof ArrowUpBold;
  }
}

