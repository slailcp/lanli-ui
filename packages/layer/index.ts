import { Layer} from './layerfn';
import "./index.less"
export default Layer;
export { Layer };

declare module 'vue' {
  export interface GlobalComponents {
    LanLayer: typeof Layer.Component;
  }
}
