import { Interceptor, ComponentInstance } from "../utils"

export type ToastOptions = {
  type?: 'loading' | 'success' | 'fail' | 'text';
  width?: string | number;
  message?: string;
  duration?: number;
  shade?: boolean;
  shadeClassName?: string;
  className?: string;
  allowHtml?: boolean;
  position?: 'top' | 'bottom' | 'center'; // 'top' 'bottom' 'center'
  onOpened?: Interceptor;
  onClose?: Interceptor;
};

export type ToastAction = 'open' | 'close'

export type mountComponentVoid = {
  instance: ComponentInstance;
  unmount: Interceptor | null | undefined
}  | null | undefined