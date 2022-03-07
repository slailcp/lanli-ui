import { defineComponent } from "vue"
import { withInstall } from '../utils';

const _IconSelect = defineComponent({
  name: 'icon-select',
  setup() {
    return () => (
      <svg
        class="icon"
        width="20"
        viewBox="0 0 1024 1024"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill="currentColor"
          d="M77.248 415.04a64 64 0 0190.496 0l226.304 226.304L846.528 188.8a64 64 0 1190.56 90.496l-543.04 543.04-316.8-316.8a64 64 0 010-90.496z"
        />
      </svg>
    )
  }
})

export const IconSelect = withInstall(_IconSelect);
export default IconSelect

declare module 'vue' {
  export interface GlobalComponents {
    IconSelect: typeof IconSelect;
  }
}
