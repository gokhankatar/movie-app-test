<template>
  <v-row class="navbar bg-transparent d-flex justify-space-between align-center mb-10 py-1 px-2 rounded-lg bg-deep-orange">
    <div @click="router.replace('/')" class="logo cursor-pointer d-flex justify-center align-center ga-2">
      <v-img
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Eo_circle_orange_film-camera.svg/480px-Eo_circle_orange_film-camera.svg.png"
        width="50" />
      <span
        class="text-white d-none d-sm-flex text-subtitle-1 text-sm-h5 text-uppercase font-weight-bold">GKmovie</span>
    </div>
    <div class="d-flex ga-3">
      <span @click="router.replace('/movies')" :class="route.fullPath.includes('movies') ? 'active-link' : ''"
        class="link transition cursor-pointer pa-2 bg-transparent rounded-lg">Movies</span>
      <span @click="router.replace('/trending')" :class="route.fullPath.includes('trending') ? 'active-link' : ''"
        class="link transition cursor-pointer pa-2 bg-transparent rounded-lg">Trending</span>
      <span @click="router.replace('/explore')" :class="route.fullPath.includes('explore') ? 'active-link' : ''"
        class="link transition cursor-pointer pa-2 bg-transparent rounded-lg">Explore</span>
        <v-icon @click="_store.changeTheme" size="x-large" class="icon-theme cursor-pointer transition ml-15"
          :icon="_store.theme === 'light' ? 'mdi-weather-night' : 'mdi-weather-sunny'" />
    </div>
  </v-row>
</template>

<script lang="ts" setup>
import store from "~/store/store";

const _store = store();
const router = useRouter();
const route = useRoute();
</script>

<style scoped>
@import url("/assets/css/main.css");

.navbar {
  border-bottom: 0.3rem solid #ff5722;
}

.link:hover {
  color: #ff5722 !important;
}

.header {
  color: #fb8d00 !important;
}

.active-link {
  background-color: #ff5722 !important;
  color: #fff !important;
}

.active-link:hover {
  background-color: transparent !important;
}

.icon-theme:hover {
  transform: scale(1.1);
  transform: rotate(90deg);
  color: #ff5722;
}
</style>
