export * from './icon';

import { withInstall } from '../utils';
import IconCom from './icon';
import "./icon.less"

export const Icon = withInstall(IconCom);
export default Icon;


declare module 'vue' {
  export interface GlobalComponents {
    LanIcon: typeof Icon;
  }
}
