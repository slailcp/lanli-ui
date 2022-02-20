import addlocation from './src/add-location.vue'
import deletelocation from './src/delete-location.vue'

// 存储组件列表
const components = {
    AddLocation: addlocation,
    DeleteLocation: deletelocation
}

for (const key in components) {
    const ele = components[key]
    // 为组件提供 install 安装方法，供按需引入
    ele.install = function (Vue) {
        Vue.component(ele.name, ele)
    }
}

export const AddLocation = components.AddLocation;
export const DeleteLocation = components.DeleteLocation;

export default components
