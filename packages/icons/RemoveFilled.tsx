import { defineComponent } from "vue"
import { withInstall } from '../utils';

const _RemoveFilled = defineComponent({
  name: 'icon-remove-filled',
  setup() {
    return () => (
      <svg class="icon" width="20" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M512 64a448 448 0 110 896 448 448 0 010-896zM288 512a38.4 38.4 0 0038.4 38.4h371.2a38.4 38.4 0 000-76.8H326.4A38.4 38.4 0 00288 512z"></path></svg>
    )
  }
})

export const RemoveFilled = withInstall(_RemoveFilled);
export default RemoveFilled

declare module 'vue' {
  export interface GlobalComponents {
    RemoveFilled: typeof RemoveFilled;
  }
}

