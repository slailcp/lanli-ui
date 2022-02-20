# lanli-ui

## install
```js
npm i -S lanli-ui
```

## use 全局注册
```js
import { createApp } from 'vue'
import App from './App.vue'

import lanli from 'lanli'

createApp(App).use(lanli).mount('#app')
```

## 按需引用
```html
<template>
  <add-location />
  <delete-location />
</template>

<script>
import { AddLocation, DeleteLocation } from "lanli";

export default {
  name: "Com",
  components: { DeleteLocation, AddLocation },
};
</script>
```