import { defineComponent } from "vue"
import { withInstall } from '../utils';

const _Top = defineComponent({
  name: 'icon-top',
  setup() {
    return () => (
      <svg class="icon" width="20" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M572.235 205.282v600.365a30.118 30.118 0 11-60.235 0V205.282L292.382 438.633a28.913 28.913 0 01-42.646 0 33.43 33.43 0 010-45.236l271.058-288.045a28.913 28.913 0 0142.647 0L834.5 393.397a33.43 33.43 0 010 45.176 28.913 28.913 0 01-42.647 0l-219.618-233.23z"></path></svg>
    )
  }
})

export const Top = withInstall(_Top);
export default Top

declare module 'vue' {
  export interface GlobalComponents {
    Top: typeof Top;
  }
}

