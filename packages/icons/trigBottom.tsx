import { defineComponent } from "vue"
import { withInstall } from '../utils';

const _trigBottom = defineComponent({
  name: 'icon-trig-bottom',
  setup() {
    return () => (
      <svg class="icon" width="20" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M192 384l320 384 320-384z"></path></svg>
    )
  }
})

export const trigBottom = withInstall(_trigBottom);
export default trigBottom

declare module 'vue' {
  export interface GlobalComponents {
    trigBottom: typeof trigBottom;
  }
}

