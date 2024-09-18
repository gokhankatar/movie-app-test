<script lang="ts" setup>
import { computed } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const router = useRouter();
const baseImageUrlLg = "https://image.tmdb.org/t/p/w1280";
const baseImageUrlSm = "https://image.tmdb.org/t/p/w500";
const baseImageUrlPosterLg = "https://image.tmdb.org/t/p/w500";
const baseImageUrlPosterSm = "https://image.tmdb.org/t/p/w300";

const movie = computed(() => {
  const movieData = route.query.movie;
  try {
    return typeof movieData === "string" ? JSON.parse(movieData) : null;
  } catch (error) {
    console.error("Movie data parsing error:", error);
    return null;
  }
});
</script>

<template>
  <div v-if="movie">
    <div class="d-none d-sm-flex background-blur" :style="{
      backgroundImage: `url(${baseImageUrlLg + movie.backdrop_path})`,
    }" />
    <div class="d-flex d-sm-none background-blur" :style="{
      backgroundImage: `url(${baseImageUrlSm + movie.backdrop_path})`,
    }" />

    <v-row class="content-container fill-height w-100 d-flex justify-space-evenly align-center">
      <v-col class="content" cols="12" sm="12" md="4">
        <v-img class="d-none d-xl-flex movie-poster rounded-lg" :src="baseImageUrlPosterLg + movie.poster_path" cover
          height="700" />
        <v-img class="d-none d-lg-flex movie-poster rounded-lg" :src="baseImageUrlPosterLg + movie.poster_path" cover
          height="500" />
        <v-img class="d-flex d-lg-none movie-poster rounded-lg" :src="baseImageUrlPosterSm + movie.poster_path" cover
          height="500" />
      </v-col>
      <v-col class="content content-text pa-5 rounded-lg d-flex flex-column ga-1" cols="12" sm="12" md="6">
        <h3 class="text-h5 text-sm-h4 text-xl-h3 text-white mb-7">{{ movie.original_title }}</h3>
        <p class="text-subtitle-1 text-white">
          <strong>Overview : </strong>{{ movie.overview }}
        </p>
        <p class="text-subtitle-1 text-white">
          <strong>Release : </strong>{{ movie.release_date.slice(0, 4) }}
        </p>
        <p class="text-subtitle-1 text-white d-flex ga-2 justify-start align-center">
          <strong>IMDB : </strong>{{ movie.vote_average.toFixed(1) }}
          <v-icon color="#FB8D00" icon="mdi-star" />
        </p>
        <p class="text-subtitle-1 text-white d-flex ga-2 justify-start align-center">
          <strong>Vote : </strong>{{ movie.vote_count }}
          <v-icon color="#FB8D00" icon="mdi-thumbs-up-down" />
        </p>
        <p class="text-subtitle-1 text-white d-flex ga-2 justify-start align-center">
          <strong>Views : </strong>{{ movie.popularity }}
          <v-icon color="#FB8D00" icon="mdi-eye" />
        </p>
        <v-btn @click="router.replace('/movies')" variant="outlined" class="back-btn my-3 rounded-lg" size="large"
          text="back to movies" />
      </v-col>
    </v-row>
  </div>
  <div v-else>Loading movie details...</div>
</template>

<style scoped>
.background-blur {
  position: absolute;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100%;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  filter: blur(0.6rem);
  z-index: 1;
}

.content-container {
  position: relative;
  z-index: 2;
}

.content {
  z-index: 999;
}

.content-text {
  background: rgba(0, 0, 0, 0.3);
}

.back-btn {
  border: 1px solid #fff;
  color: #fff;
}

.back-btn:hover {
  border-color: red;
  background-color: red;
  color: #fff;
}
</style>
