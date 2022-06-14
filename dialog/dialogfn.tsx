import { withInstall, ComponentInstance } from '../utils';
import { createApp,  Component, App } from 'vue'
import LanDialog from './doalog'
import {DialogOptions, DialogAction} from "./types"

const inBrowser = typeof window !== 'undefined'
let instance: ComponentInstance;

function mountComponent(RootComponent: Component, obj: DialogOptions) {
  const app = createApp(RootComponent, obj);
  const root = document.createElement('div');

  document.body.appendChild(root);
  const bodyoverflow = document.body.style.overflow;

  if (obj.lockScroll) {
    document.body.style.overflow = "hidden"
  }

  return {
    instance: app.mount(root),
    unmount() {
      app.unmount();
      document.body.removeChild(root);
      if (obj.lockScroll) {
        document.body.style.overflow = bodyoverflow
      }
    },
  };
}

function Dialog(options: DialogOptions) {
  let unmount: any
  if (!inBrowser) {
    return Promise.resolve();
  }
  return new Promise((resolve, reject) => {
    const props = Object.assign({}, Dialog.defaultOptions, options, {
      callback: (action: DialogAction) => {
        (action === 'confirm' ? resolve : reject)(action);
        setTimeout(() => { unmount() }, 300)
      },

    });

    ({ instance, unmount } = mountComponent(<LanDialog />, props));
  });
}

Dialog.defaultOptions = {
  title: '提示',
  width: '',
  message: '',
  callback: null,
  className: '',
  allowHtml: false,
  lockScroll: false,
  beforeClose: null,
  cancelButtonText: '取消',
  confirmButtonText: '确认',
  showConfirmButton: true,
  showCancelButton: false,
};

Dialog.currentOptions = Object.assign({}, Dialog.defaultOptions);

Dialog.alert = Dialog;

Dialog.confirm = (options: DialogOptions) =>
  Dialog(Object.assign({ showCancelButton: true }, options));

Dialog.close = () => {
  if (instance) {
    instance.toggle(false);
  }
};


Dialog.Component = withInstall(LanDialog);

Dialog.install = (app: App) => {
  app.use(Dialog.Component);
  app.config.globalProperties.$dialog = Dialog;
};


export { Dialog }