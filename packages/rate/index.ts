export * from './rate';

import { withInstall } from '../utils';
import RateCom from './rate';
import "./rate.less"

export const Rate = withInstall(RateCom);
export default Rate;


declare module 'vue' {
  export interface GlobalComponents {
    LanRate: typeof Rate;
  }
}
