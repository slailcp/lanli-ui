export * from './office-flow';
export * from './type';
export * from './flowFn'

import ClipboardJS from "clipboard";
new ClipboardJS('.copybtn');

import { withInstall } from '../utils';
import OfficeFlowCom from './office-flow';
import "./index.less"

export const OfficeFlow = withInstall(OfficeFlowCom);
export default OfficeFlow;


declare module 'vue' {
  export interface GlobalComponents {
    FanOfficeFlow: typeof OfficeFlow;
  }
}



