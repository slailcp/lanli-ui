import { withInstall } from '../utils';
import _Popup from './popup';
import "./index.less"

export const Popup = withInstall(_Popup);
export default Popup;
// export type {

// } from './types';

declare module 'vue' {
  export interface GlobalComponents {
    LanPopup: typeof Popup;
  }
}
