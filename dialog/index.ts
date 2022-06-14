import { Dialog} from './dialogfn';
import "./index.less"
export default Dialog;
export { Dialog };

declare module 'vue' {
  export interface GlobalComponents {
    FanDialog: typeof Dialog.Component;
  }
}
