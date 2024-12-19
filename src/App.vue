<script setup>
import { RouterLink, RouterView } from "vue-router";
import navigation from "@/views/navigation.vue";
import { onMounted } from "vue";
import { aaa } from "@/api/app.js";
onMounted(() => {
  aaa().then((res) => {
    console.log(res);
  });
});
</script>

<template>
  <navigation />
  <RouterView />
  <div class="footer" v-for="item in 10" :key="item">{{ item }}</div>
</template>

<style scoped>
#app {
  width: 100%;
  height: 100%;
}
/* .footer {
  width: 100%;
  height: 100px;
  background-color: #23292b;
} */
</style>
