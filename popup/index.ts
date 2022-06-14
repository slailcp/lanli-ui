import { withInstall } from '../utils';
import popupCom from './popup';
import "./index.less"

export const Popup = withInstall(popupCom);
export default Popup;

declare module 'vue' {
  export interface GlobalComponents {
    FanPopup: typeof Popup;
  }
}
