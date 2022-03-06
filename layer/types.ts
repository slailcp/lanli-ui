import { Interceptor } from "../utils"

export type LayerOptions = {
  title?: string;
  width?: string | number;
  message?: string;
  callback?: Interceptor
  className?: unknown;
  allowHtml?: boolean;
  lockScroll?: boolean;
  beforeClose?: Interceptor;
  cancelButtonText?: string;
  confirmButtonText?: string;
  showCancelButton?: boolean;
  showConfirmButton?: boolean;
};

export type LayerAction = 'confirm' | 'cancel';