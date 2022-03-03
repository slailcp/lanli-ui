<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <button @click="atoast">atoast</button>
  </div>
</template>




<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src
import {Toast } from "../../packages"
@Options({
  components: {
    HelloWorld,
  },
})
export default class Home extends Vue {

  
}
</script>

