import { defineComponent } from "vue"
import { withInstall } from '../utils';

const _ArrowRight = defineComponent({
  name: 'icon-arrow-right',
  setup() {
    return () => (
      <svg class="icon" width="20" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M340.864 149.312a30.592 30.592 0 000 42.752L652.736 512 340.864 831.872a30.592 30.592 0 000 42.752 29.12 29.12 0 0041.728 0L714.24 534.336a32 32 0 000-44.672L382.592 149.376a29.12 29.12 0 00-41.728 0z"></path></svg>
    )
  }
})

export const ArrowRight = withInstall(_ArrowRight);
export default ArrowRight

declare module 'vue' {
  export interface GlobalComponents {
    ArrowRight: typeof ArrowRight;
  }
}

