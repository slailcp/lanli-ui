import ArrowDown from "./ArrowDown";
import ArrowDownBold from "./ArrowDownBold";
import ArrowLeft from "./ArrowLeft";
import ArrowLeftBold from "./ArrowLeftBold";
import ArrowRight from "./ArrowRight";
import ArrowRightBold from "./ArrowRightBold";
import ArrowUp from "./ArrowUp";
import ArrowUpBold from "./ArrowUpBold";
import Back from "./Back";
import Bottom from "./Bottom";
import Circle from "./Circle";
import CircleCheck from "./CircleCheck";
import CircleCheckFilled from "./CircleCheckFilled";
import CircleClose from "./CircleClose";
import CircleCloseFilled from "./CircleCloseFilled";
import CirclePlus from "./CirclePlus";
import CirclePlusFilled from "./CirclePlusFilled";
import Close from "./Close";
import Minus from "./Minus";
import Plus from "./Plus";
import Remove from "./Remove";
import RemoveFilled from "./RemoveFilled";
import Top from "./Top";
import Warning from "./Warning";
import WarningFilled from "./WarningFilled";
import CloseBold from "./closeBold";
import Select from "./select";
import trigBottom from "./trigBottom";
import trigLeft from "./trigLeft";
import trigRight from "./trigRight";
import trigTop from "./trigTop";

//  按需引用
export { ArrowDown }
export { ArrowDownBold }
export { ArrowLeft }
export { ArrowLeftBold }
export { ArrowRight }
export { ArrowRightBold }
export { ArrowUp }
export { ArrowUpBold }
export { Back }
export { Bottom }
export { Circle }
export { CircleCheck }
export { CircleCheckFilled }
export { CircleClose }
export { CircleCloseFilled }
export { CirclePlus }
export { CirclePlusFilled }
export { Close }
export { Minus }
export { Plus }
export { Remove }
export { RemoveFilled }
export { Top }
export { Warning }
export { WarningFilled }
export { CloseBold }
export { Select }
export { trigBottom }
export { trigLeft }
export { trigRight }
export { trigTop }


// 全局配置
const components: any = {
  ArrowDown,
  ArrowDownBold,
  ArrowLeft,
  ArrowLeftBold,
  ArrowRight,
  ArrowRightBold,
  ArrowUp,
  ArrowUpBold,
  Back,
  Bottom,
  Circle,
  CircleCheck,
  CircleCheckFilled,
  CircleClose,
  CircleCloseFilled,
  CirclePlus,
  CirclePlusFilled,
  Close,
  Minus,
  Plus,
  Remove,
  RemoveFilled,
  Top,
  Warning,
  WarningFilled,
  CloseBold,
  Select,
  trigBottom,
  trigLeft,
  trigRight,
  trigTop,
}

// 定义 install 方法，接收 Vue 作为参数。如果使用 use 注册插件，则所有的组件都将被注册
const install = function (Vue: any) {
  // 遍历注册全局组件
  for (const key in components) {
    const ele = components[key]
    Vue.component(`lan-${ele.name}`, ele)
  }
}

// 导出全局注册
export const Icons = {
  // 导出的对象必须具有 install，才能被 Vue.use() 方法安装
  install
}

