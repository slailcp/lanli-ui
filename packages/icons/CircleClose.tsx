import { defineComponent } from "vue"
import { withInstall } from '../utils';

const _CircleClose = defineComponent({
  name: 'icon-circle-close',
  setup() {
    return () => (
      <svg class="icon" width="20" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M466.752 512l-90.496-90.496a32 32 0 0145.248-45.248L512 466.752l90.496-90.496a32 32 0 1145.248 45.248L557.248 512l90.496 90.496a32 32 0 11-45.248 45.248L512 557.248l-90.496 90.496a32 32 0 01-45.248-45.248L466.752 512z"></path><path fill="currentColor" d="M512 896a384 384 0 100-768 384 384 0 000 768zm0 64a448 448 0 110-896 448 448 0 010 896z"></path></svg>
    )
  }
})

export const CircleClose = withInstall(_CircleClose);
export default CircleClose

declare module 'vue' {
  export interface GlobalComponents {
    CircleClose: typeof CircleClose;
  }
}

