import { defineComponent } from "vue"
import { withInstall } from '../utils';

const _ArrowRightBold = defineComponent({
  name: 'icon-arrow-right-bold',
  setup() {
    return () => (
      <svg class="icon" width="20" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M338.752 104.704a64 64 0 000 90.496l316.8 316.8-316.8 316.8a64 64 0 0090.496 90.496l362.048-362.048a64 64 0 000-90.496L429.248 104.704a64 64 0 00-90.496 0z"></path></svg>
    )
  }
})

export const ArrowRightBold = withInstall(_ArrowRightBold);
export default ArrowRightBold

declare module 'vue' {
  export interface GlobalComponents {
    ArrowRightBold: typeof ArrowRightBold;
  }
}

