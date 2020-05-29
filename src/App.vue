<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

html,body{
  margin:0;
  padding:0;
  height:100%;
  width:100%;
  #app{
    height:100%;
    width:100%;
  }
}

h1,h2,h3,h4,h5,h6{
  padding:0;
  margin:0;
}

ul,li{
}

#nav {
  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
