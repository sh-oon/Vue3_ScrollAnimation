<template>
  <div class="gap">
    <ScrollComponent v-for="test in 30" :key="test">
      <div>
        <h1>Test</h1>
      </div>
    </ScrollComponent>
  </div>
</template>

<script setup>
import ScrollComponent from "./components/ScrollComponent.vue";
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.gap {
  display: flex;
  flex-direction: column;
  gap: 100vh;
}
</style>
