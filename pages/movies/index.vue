<template>
  <Loading v-if="store.isLoading" />

  <v-row v-if="!store.isLoading">
    <h3 class="text-h5 text-md-h3">Now Trending</h3>
  </v-row>

  <hr v-if="!store.isLoading" class="my-15" />

  <v-row v-if="!store.isLoading" class="mt-5 d-flex flex-wrap align-center">
    <v-col
      class="movie rounded-lg"
      v-for="item of store.data?.results"
      :key="item.id"
      cols="12"
      sm="6"
      md="4"
      lg="3"
    >
      <v-img
        class="movie-img transition cursor-pointer rounded-lg"
        :src="baseImageUrl + item.backdrop_path"
      />
      <p class="movie-title pa-3 rounded-lg text-subititle-1 text-sm-h5">
        {{ item.original_title }}
      </p>
      <span class="movie-rate pa-2 bg-deep-orange text-white">{{
        item.vote_average.toFixed(1)
      }}</span>
    </v-col>
  </v-row>

  <v-pagination
    v-if="!store.isLoading"
    v-model="store.currentPage"
    :length="store.data?.total_pages"
    active-color="deep-orange"
    class="mt-15 transition"
    @input="onPageChange"
  ></v-pagination>
</template>

<script lang="ts" setup>
import { ref, onMounted, watch } from "vue";
import { usePaginationStore } from "/store/paginationStore.js";

const isLoading = ref(false);
const store = usePaginationStore();
const baseImageUrl = "https://image.tmdb.org/t/p/w500";

onMounted(() => {
  isLoading.value = true;
  store.fetchData(store.currentPage);
  isLoading.value = false;
});

const onPageChange = (page: number) => {
  store.setCurrentPage(page);
};

watch(
  () => store.currentPage,
  (newPage) => {
    store.fetchData(newPage);
  }
);
</script>

<style scoped>
@import url("/assets/css/main.css");
.card {
  position: relative;
}
.movie-rate {
  position: absolute;
  top: 4%;
  left: 2%;
  z-index: 2;
  border-radius: 0 0 1.5rem 0;
}
.card:hover .vote {
  background-color: orange !important;
  color: #fff !important;
}
.movie {
  position: relative;
  overflow: hidden;
}
.movie:hover .movie-title {
  background: rgba(0, 0, 0, 0.3);
  color: #ff5722;
}
.movie:hover .movie-img {
  scale: 1.1;
}
.movie-title {
  position: absolute;
  bottom: 5%;
  left: 5%;
  z-index: 99;
}
</style>
