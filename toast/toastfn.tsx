import { withInstall } from '../utils';
import { createApp, Component, App } from 'vue'
import LanToast from './toast'
import { ToastOptions, ToastAction, mountComponentVoid } from "./types"
import { ComponentInstance } from "../utils"

const inBrowser = typeof window !== 'undefined'
let instance: ComponentInstance;

function mountComponent(RootComponent: Component, obj: ToastOptions) {
  const app = createApp(RootComponent, obj);
  const root = document.createElement('div');

  const toastRandom = `lan${Math.floor(Math.random() * 100000000000000000)}`
  root.setAttribute('fan-toast-random', toastRandom)

  document.body.appendChild(root);
  return {
    instance: app.mount(root),
    toastRandom: toastRandom
  };
}

function Toast(options: ToastOptions) {
  let toastRandom: any
  if (!inBrowser) {
    return;
  }
  const props: ToastOptions = Object.assign({}, Toast.defaultOptions, options, {
    onClose: (action: ToastAction) => {
      const root = document.querySelector('[fan-toast-random=' + toastRandom + ']')
      if (root) {
        document.body.removeChild(root);
      }
      options.onClose?.()
    }
  });

  ({ instance, toastRandom } = mountComponent(<LanToast />, props));
  return toastRandom;
}

Toast.defaultOptions = {
  type: 'text',
  width: "",
  message: "",
  duration: 2000,
  shade: true,
  shadeClassName: "",
  className: "",
  allowHtml: false,
  position: 'center',
  onOpened: null,
  onClose: null
};

Toast.currentOptions = Object.assign({}, Toast.defaultOptions);

Toast.close = (toastRandom: string) => {
  const root = document.querySelector('[fan-toast-random=' + toastRandom + ']')
  if (root) {
    document.body.removeChild(root);
  }
};

Toast.Component = withInstall(LanToast);

Toast.install = (app: App) => {
  app.use(Toast.Component);
  app.config.globalProperties.$toast = Toast;
};


export { Toast }