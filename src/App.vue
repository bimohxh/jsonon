<template>
  <router-view />
</template>

<style lang="scss">
// @import "../node_modules/bootstrap/scss/_functions.scss";
// @import "../node_modules/bootstrap/scss/_variables.scss";
// @import "../node_modules/bootstrap/scss/_mixins.scss";
// @import "../node_modules/bootstrap/scss/_utilities.scss";
// @import "../node_modules/bootstrap/scss/_reboot.scss";

html, body {
  margin: 0;
  padding: 0;
  height: 100%;
  color: #555;
}

* {
  box-sizing: border-box;
  font-family: Menlo, Monaco, Consolas, "Helvetica Neue", Helvetica, "Courier New", 微软雅黑, monospace, Arial, sans-serif, 黑体;
  text-rendering: optimizeLegibility;
}

a {
  transition: all .3s;
}

#app {
  height: 100%;
}

</style>
