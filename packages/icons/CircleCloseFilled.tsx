import { defineComponent } from "vue"
import { withInstall } from '../utils';

const _CircleCloseFilled = defineComponent({
  name: 'icon-circle-close-filled',
  setup() {
    return () => (
      <svg class="icon" width="20" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M512 64a448 448 0 110 896 448 448 0 010-896zm0 393.664L407.936 353.6a38.4 38.4 0 10-54.336 54.336L457.664 512 353.6 616.064a38.4 38.4 0 1054.336 54.336L512 566.336 616.064 670.4a38.4 38.4 0 1054.336-54.336L566.336 512 670.4 407.936a38.4 38.4 0 10-54.336-54.336L512 457.664z"></path></svg>
    )
  }
})

export const CircleCloseFilled = withInstall(_CircleCloseFilled);
export default CircleCloseFilled

declare module 'vue' {
  export interface GlobalComponents {
    CircleCloseFilled: typeof CircleCloseFilled;
  }
}

