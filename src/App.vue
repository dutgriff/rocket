<template>
  <div id="app">
    <nav>
      <router-link to="/apogee-determination">Apogee Determination</router-link>
      <router-link to="/performance-prediction">Performance Prediction</router-link>
      <router-link to="/drag-prediction">Drag Prediction</router-link>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
}
</script>