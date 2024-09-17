<template>
  <v-app-bar
    class="navbar bg-transparent py-2 px-5 px-sm-8 px-md-10 px-lg-12 px-xl-15"
    :elevation="0"
  >
    <template v-slot:prepend>
      <div
        @click="router.replace('/')"
        class="logo cursor-pointer d-flex justify-center align-center ga-5"
      >
        <v-img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Eo_circle_orange_film-camera.svg/480px-Eo_circle_orange_film-camera.svg.png"
          width="60"
        />
        <span class="header text-subtitle-1 text-sm-h4 text-uppercase font-weight-bold"
          >GKmovie</span
        >
      </div>
    </template>
    <template v-slot:append>
      <div class="d-flex ga-3">
        <span
          @click="router.replace('/movies')"
          :class="route.fullPath.includes('movies') ? 'active-link' : ''"
          class="link transition cursor-pointer pa-2 bg-transparent rounded-lg"
          >Movies</span
        >
        <span
          @click="router.replace('/trending')"
          :class="route.fullPath.includes('trending') ? 'active-link' : ''"
          class="link transition cursor-pointer pa-2 bg-transparent rounded-lg"
          >Trending</span
        >
        <span
          @click="router.replace('/explore')"
          :class="route.fullPath.includes('explore') ? 'active-link' : ''"
          class="link transition cursor-pointer pa-2 bg-transparent rounded-lg"
          >Explore</span
        >
      </div>
      <v-icon
        @click="_store.changeTheme"
        size="x-large"
        class="icon-theme cursor-pointer transition ml-15"
        :icon="_store.theme === 'light' ? 'mdi-weather-night' : 'mdi-weather-sunny'"
      />
    </template>
  </v-app-bar>
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
