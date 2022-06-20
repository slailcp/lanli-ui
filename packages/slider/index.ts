export * from './slider';

import { withInstall } from '../utils';
import SliderCom from './slider';
import "./slider.less"

export const Slider = withInstall(SliderCom);
export default Slider;


declare module 'vue' {
  export interface GlobalComponents {
    LanSlider: typeof Slider;
  }
}
