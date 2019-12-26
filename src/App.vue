<template>
  <div id="app">
    <nav class="navbar" role="navigation" aria-label="main navigation">
      <div class="container">
        <div class="navbar-brand">
          <!--<a class="navbar-item" href="https://bulma.io">
            <img src="https://bulma.io/images/bulma-logo.png" width="112" height="28">
          </a>-->
          <router-link to="/home" class="navbar-item">Rocket</router-link>

          <a role="button" class="navbar-burger burger" v-bind:class="{ 'is-active': navMenuVisible }" v-on:click="toggleNavMenu" 
              aria-label="menu" aria-expanded="false">
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>

        <div class="navbar-menu" v-bind:class="{ 'is-active': navMenuVisible }">
          <div class="navbar-start">
            <router-link to="/apogee-determination" class="navbar-item">Apogee Determination</router-link>
            <router-link to="/performance-prediction" class="navbar-item">Performance Prediction</router-link>
            <router-link to="/drag-prediction" class="navbar-item">Drag Prediction</router-link>
          </div>
        </div>
      </div>
    </nav>
    <div class="container">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: 'app',
  data() {
    return {
      navMenuVisible: false
    }
  },
  methods: {
    toggleNavMenu: function () {
      this.navMenuVisible = !this.navMenuVisible
    }
  }
}
</script>