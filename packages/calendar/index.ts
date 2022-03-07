export * from './date';
import { withInstall } from '../utils';
import _Calendar from './calendar';
import "./index.less"

export const Calendar = withInstall(_Calendar);
export default Calendar;

declare module 'vue' {
  export interface GlobalComponents {
    LanCalendar: typeof Calendar;
  }
}
