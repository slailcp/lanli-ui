import { withInstall, ComponentInstance } from '../utils';
import { createApp,  Component, App, reactive, nextTick } from 'vue'
import LanLayer from './layer'
import {LayerOptions, LayerAction} from "./types"

const inBrowser = typeof window !== 'undefined'
let instance: ComponentInstance;

function mountComponent(RootComponent: Component, obj: LayerOptions) {
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

function Layer(options: LayerOptions) {
  let unmount: any
  if (!inBrowser) {
    return Promise.resolve();
  }
  return new Promise((resolve, reject) => {
    const props = Object.assign({}, Layer.defaultOptions, options, {
      callback: (action: LayerAction) => {
        (action === 'confirm' ? resolve : reject)(action);
        setTimeout(() => { unmount() }, 300)
      },

    });

    ({ instance, unmount } = mountComponent(<LanLayer />, props));
  });
}

Layer.defaultOptions = {
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

Layer.currentOptions = Object.assign({}, Layer.defaultOptions);

Layer.alert = Layer;

Layer.confirm = (options: LayerOptions) =>
  Layer(Object.assign({ showCancelButton: true }, options));

Layer.close = () => {
  if (instance) {
    instance.toggle(false);
  }
};


Layer.Component = withInstall(LanLayer);

Layer.install = (app: App) => {
  app.use(Layer.Component);
  app.config.globalProperties.$layer = Layer;
};


export { Layer }