export * from './cell';

import { withInstall } from '../utils';
import CellCom from './cell';
import "./cell.less"

export const Cell = withInstall(CellCom);
export default Cell;


declare module 'vue' {
  export interface GlobalComponents {
    LanCell: typeof Cell;
  }
}
