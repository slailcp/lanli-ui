import { defineComponent } from "vue"
import { withInstall } from '../utils';

const _ArrowLeft = defineComponent({
  name: 'icon-arrow-left',
  setup() {
    return () => (
      <svg class="icon" width="20" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M609.408 149.376L277.76 489.6a32 32 0 000 44.672l331.648 340.352a29.12 29.12 0 0041.728 0 30.592 30.592 0 000-42.752L339.264 511.936l311.872-319.872a30.592 30.592 0 000-42.688 29.12 29.12 0 00-41.728 0z"></path></svg>
    )
  }
})

export const ArrowLeft = withInstall(_ArrowLeft);
export default ArrowLeft

declare module 'vue' {
  export interface GlobalComponents {
    ArrowLeft: typeof ArrowLeft;
  }
}

