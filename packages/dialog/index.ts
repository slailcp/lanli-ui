import { Dialog} from './dialogfn';
import "./index.less"
export default Dialog;
export { Dialog };

declare module 'vue' {
  export interface GlobalComponents {
    LanDialog: typeof Dialog.Component;
  }
}
