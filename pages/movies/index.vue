<template>
  <Loading v-if="store.isLoading" />

  <v-row v-if="!store.isLoading" class="mt-5 d-flex flex-wrap align-center">
    <v-col class="movie rounded-lg" v-for="item of store.data?.results" :key="item.id" cols="12" sm="6" md="4" lg="3">
      <v-img height="350" cover class="movie-img transition rounded-lg" :src="baseImageUrl + item.backdrop_path" />
      <span class="movie-rate pa-2 bg-deep-orange text-white">{{
        item.vote_average.toFixed(1)
      }}</span>
      <v-img width="50" src="https://cdn-icons-png.flaticon.com/512/3686/3686899.png"
        class="play-icon d-none cursor-pointer transition pa-5 rounded-xl" />
      <div class="content pa-2 d-flex flex-column rounded-lg">
        <p class="date text-white text-caption text-sm-subtitle-1">
          {{ item.release_date.slice(0, 4) }}
        </p>
        <p class="movie-title text-white text-subtitle-1">
          {{ item.original_title }}
        </p>
      </div>
    </v-col>
  </v-row>

  <v-pagination v-if="!store.isLoading" v-model="store.currentPage" :length="store.data?.total_pages"
    active-color="deep-orange" class="mt-15 transition" @input="onPageChange" />
</template>

<script lang="ts" setup>
import { ref, onMounted, watch } from "vue";
import { usePaginationStore } from "~/store/paginationStore.js";

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
  top: 3%;
  left: 4%;
  z-index: 2;
  border-radius: 0 0 1.1rem 0;
}

.play-icon {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 999;
}

.play-icon:hover {
  background: rgba(0, 0, 0, 0.3);
}

.movie {
  position: relative;
  overflow: hidden;
}

.movie:hover .content {
  background: rgba(0, 0, 0, 0.3);
  color: #ff5722 !important;
}

.movie:hover .play-icon {
  display: flex !important;
}

.movie:hover .movie-img {
  scale: 1.1;
}

.content {
  position: absolute;
  bottom: 5%;
  z-index: 99;
}
</style>
