import { defineComponent } from "vue"
import { withInstall } from '../utils';

const _ArrowUp = defineComponent({
  name: 'icon-arrow-up',
  setup() {
    return () => (
      <svg class="icon" width="20" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M488.832 344.32l-339.84 356.672a32 32 0 000 44.16l.384.384a29.44 29.44 0 0042.688 0l320-335.872 319.872 335.872a29.44 29.44 0 0042.688 0l.384-.384a32 32 0 000-44.16L535.168 344.32a32 32 0 00-46.336 0z"></path></svg>
    )
  }
})

export const ArrowUp = withInstall(_ArrowUp);
export default ArrowUp

declare module 'vue' {
  export interface GlobalComponents {
    ArrowUp: typeof ArrowUp;
  }
}

