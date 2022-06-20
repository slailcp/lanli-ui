export * from './picker';

import { withInstall } from '../utils';
import PickerCom from './picker';
import "./picker.less"

export const Picker = withInstall(PickerCom);
export default Picker;


declare module 'vue' {
  export interface GlobalComponents {
    LanPicker: typeof Picker;
  }
}
