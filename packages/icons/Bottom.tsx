import { defineComponent } from "vue"
import { withInstall } from '../utils';

const _Bottom = defineComponent({
  name: 'icon-bottom',
  setup() {
    return () => (
      <svg class="icon" width="20" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M544 805.888V168a32 32 0 10-64 0v637.888L246.656 557.952a30.72 30.72 0 00-45.312 0 35.52 35.52 0 000 48.064l288 306.048a30.72 30.72 0 0045.312 0l288-306.048a35.52 35.52 0 000-48 30.72 30.72 0 00-45.312 0L544 805.824z"></path></svg>
    )
  }
})

export const Bottom = withInstall(_Bottom);
export default Bottom

declare module 'vue' {
  export interface GlobalComponents {
    Bottom: typeof Bottom;
  }
}
