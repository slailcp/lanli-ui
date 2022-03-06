import { defineComponent } from "vue"
import { withInstall } from '../utils';

const _ArrowDown = defineComponent({
  name: 'icon-arrow-down',
  setup() {
    return () => (
      <svg class="icon" width="20" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M831.872 340.864L512 652.672 192.128 340.864a30.592 30.592 0 00-42.752 0 29.12 29.12 0 000 41.6L489.664 714.24a32 32 0 0044.672 0l340.288-331.712a29.12 29.12 0 000-41.728 30.592 30.592 0 00-42.752 0z"></path></svg>
    )
  }
})

export const ArrowDown = withInstall(_ArrowDown);
export default ArrowDown

declare module 'vue' {
  export interface GlobalComponents {
    ArrowDown: typeof ArrowDown;
  }
}

