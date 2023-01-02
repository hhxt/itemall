<template>
  <div id="app">
    <router-view />
    <tab-bar v-if="!$route.meta.isHide" />
  </div>
</template>

<script>
import TabBar from './components/tab-bar';
export default {
  name: 'App',
  components: { TabBar },
};
</script>
