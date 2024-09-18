<template>
  <v-row :class="_store.theme === 'dark' ? 'navbar-dark' : 'navbar-light'"
    class="d-flex justify-space-between align-center py-2 mb-10 px-2 rounded-lg">
    <div @click="router.replace('/')" class="logo cursor-pointer d-flex justify-center align-center ga-2">
      <v-img
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Eo_circle_orange_film-camera.svg/480px-Eo_circle_orange_film-camera.svg.png"
        width="50" />
      <span :class="_store.theme === 'light' ? 'text-white' : ''"
        class="header d-none d-sm-flex text-subtitle-1 text-sm-h5 text-uppercase font-weight-bold">GKmovie</span>
    </div>

    <div class="d-flex justify-center align-center ga-3">
      <span @click="router.replace('/movies')" :class="route.fullPath.includes('movies') ? 'active-link' : ''"
        class="link transition cursor-pointer pa-2 mr-5 bg-transparent rounded-lg">All Movies</span>
      <v-btn width="250" variant="outlined" rounded="xl" :color="_store.theme === 'dark' ? 'deep-orange' : 'white'"
        prepend-icon="mdi-magnify" text="Search..." />
      <v-icon @click="_store.changeTheme" class="icon-theme rounded-lg pa-5 cursor-pointer transition"
        :icon="_store.theme === 'light' ? 'mdi-weather-night' : 'mdi-weather-sunny'" color="white" />
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

.navbar-dark {
  background: rgba(255, 255, 255, .1);
}

.navbar-light {
  background: #FF5721;
}

.link:hover {
  background: rgba(0, 0, 0, .3) !important;
}

.header {
  color: #fb8d00;
}

.active-link {
  background: rgba(0, 0, 0, .3) !important;
  color: #fff !important;
}

.active-link:hover {
  background-color: transparent !important;
}

.icon-theme:hover {
  background: rgba(0, 0, 0, .3) !important;
}
</style>
