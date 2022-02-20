import iconComponents from './icons'
export * from './icons'

// 存储组件列表
// const components = [
//   AddLocation
// ]

// 定义 install 方法，接收 Vue 作为参数。如果使用 use 注册插件，则所有的组件都将被注册
const install = function (Vue) {
  // 遍历注册全局组件
  for (const key in iconComponents) {
    const ele = iconComponents[key]
    Vue.component(ele.name, ele)
  }
}

// 判断是否是直接引入文件
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}


export default {
  // 导出的对象必须具有 install，才能被 Vue.use() 方法安装
  install
}
