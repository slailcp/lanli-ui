import { defineComponent } from "vue"
import { withInstall } from '../utils';

const _IconCloseBold = defineComponent({
  name: 'icon-close-bold',
  setup() {
    return () => (<svg
      class="icon"
      width="200"
      height="200"
      viewBox="0 0 1024 1024"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill="currentColor"
        d="M195.2 195.2a64 64 0 0190.496 0L512 421.504 738.304 195.2a64 64 0 0190.496 90.496L602.496 512 828.8 738.304a64 64 0 01-90.496 90.496L512 602.496 285.696 828.8a64 64 0 01-90.496-90.496L421.504 512 195.2 285.696a64 64 0 010-90.496z"
      />
    </svg>)
  }
})

export const IconCloseBold = withInstall(_IconCloseBold);
export default IconCloseBold

declare module 'vue' {
  export interface GlobalComponents {
    LaniconCloseBold: typeof IconCloseBold;
  }
}




