import IconSelect from "./select"
import IconCloseBold from "./closeBold"

//  按需引用
export { IconSelect }
export { IconCloseBold }


// 全局配置
const components: any = {
  IconSelect,
  IconCloseBold
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

