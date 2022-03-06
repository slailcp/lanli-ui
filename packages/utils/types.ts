import { ComponentPublicInstance } from 'vue'

export type Interceptor = (
  ...args: any[]
) => Promise<boolean> | boolean | undefined | void;

export type ComponentInstance = ComponentPublicInstance<{}, any>;