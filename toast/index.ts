import { Toast } from './toastfn';
import "./index.less"
export default Toast;
export { Toast };
export * from "./types"

declare module 'vue' {
  export interface GlobalComponents {
    LanToast: typeof Toast.Component;
  }
}
