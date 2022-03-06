import { defineComponent } from "vue"
import { withInstall } from '../utils';

const _Minus = defineComponent({
  name: 'icon-minus',
  setup() {
    return () => (
      <svg class="icon" width="20" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M128 448h768q64 0 64 64t-64 64H128q-64 0-64-64t64-64z"></path></svg>
    )
  }
})

export const Minus = withInstall(_Minus);
export default Minus

declare module 'vue' {
  export interface GlobalComponents {
    Minus: typeof Minus;
  }
}

