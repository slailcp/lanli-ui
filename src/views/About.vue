<template>
  <div class="about">
    <h1>This is an about page</h1>
    <button @click="aconfirm">aconfirm</button>
    
  </div>
</template>

<script>
export default {
  name: "about",
  data() {
    return {};
  },
  methods: {
    aconfirm() {
      console.log(this);
      this.$layer({ message: "你好" });
    },
  },
};
</script>
