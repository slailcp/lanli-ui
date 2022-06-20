export * from './button';

import { withInstall } from '../utils';
import ButtonCom from './button';
import "./button.less"

export const Button = withInstall(ButtonCom);
export default Button;


declare module 'vue' {
  export interface GlobalComponents {
    LanButton: typeof Button;
  }
}
