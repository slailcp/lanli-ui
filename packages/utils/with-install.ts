import { App } from 'vue';
import { camelize } from './format';

type EventShim = {
  new (...args: any[]): {
    $props: {
      onClick?: (...args: any[]) => void;
    };
  };
};

export type WithInstall<T> = T & {
  install(app: App): void;
} & EventShim;

// 封装组件的install,全局调用
export function withInstall<T>(options: T) {
  (options as Record<string, unknown>).install = (app: App) => {
    const { name } = options as unknown as { name: string };
    app.component(name, options);
    app.component(camelize(`-${name}`), options);
  };

  return options as WithInstall<T>;
}
