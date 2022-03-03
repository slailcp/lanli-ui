# lanli-ui

## 安装
```
npm i -S lanli-ui
```

### 全局安装
```html
// main.ts
import { Popup, Icons } from '../lanli-ui'

createApp(App)
.use(Popup) 
.use(Icons)
.mount('#app')

// home.vue
<!--图标-->
<lan-icon-select /> 

<!--popup-->
<lan-popup v-model:show="toggle" position="left" :style="{ width:'20%' }">
  <button @click="toggle = !toggle">toggle</button>
</lan-popup>
```

## 按需引用
```html
  // home.vue
  <lan-icon-select />
  <lan-popup v-model:show="toggle" position="left" :style="{ width:'20%' }">
    <button @click="toggle = !toggle">toggle</button>
  </lan-popup>

  <script lang="ts">
    import { Popup, Layer, Toast } from "../packages";
    components: { LanPopup: Popup },
    setup(){
      Layer.confirm({message:'确定删除?'})
      Toast({message:'校验不通过!'})
    }
  </script>

}
```

