<template>
  <v-row>
    <h3 class="text-h5 text-md-h3">Now Trending</h3>
  </v-row>
  <hr class="my-15" />
  <v-row class="mt-5 d-flex flex-wrap align-center">
    <v-col v-for="item of data?.results" :key="item" cols="12" sm="6" md="4">
      <v-card class="card rounded-lg cursor-pointer" height="500">
        <v-img :src="baseImageUrl + item.backdrop_path" />
        <span class="vote pa-2 rounded-xl bg-grey-darken-1 text-white">{{
          item.vote_average.toFixed(1)
        }}</span>
        <v-card-actions class="pa-5 d-flex align-start flex-column ga-2">
          <v-card-title>{{ truncateText(item.original_title, 20) }}</v-card-title>
          <v-card-text>{{ truncateText(item.overview, 170) }}</v-card-text>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>
<script lang="ts" setup>
const url =
  "https://api.themoviedb.org/3/movie/now_playing?api_key=4e012d6a950f5501f23ee3e7f1e548d4&language=en-US&page=2";

const { data } = await useFetch(url);
const baseImageUrl = "https://image.tmdb.org/t/p/w500";
const truncateText = (text: string, length: number) => {
  if (text.length <= length) {
    return text;
  }
  return text.substring(0, length) + "...";
};
</script>
<style scoped>
.card {
  position: relative;
}
.vote {
  position: absolute;
  top: 2%;
  right: 2%;
  z-index: 2;
}
.card:hover .vote {
  background-color: orange !important;
  color: #fff !important;
}
</style>
