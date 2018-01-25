<template>
  <div id="app">
    <top></top>
    <router-view></router-view>
    <bottom></bottom>
  </div>
</template>

<script>
import top from './components/top'
import bottom from './components/bottom'
export default {
  name: 'App',
  components: {
    top,
    bottom
  }
}
</script>

<style>
  * {
    padding: 0;
    margin: 0;
  }
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    width: 100vw;
    height: 100vh;
    position: relative;
    background-color: yellow;
    display: flex;
    flex-direction: column;
  }
</style>
