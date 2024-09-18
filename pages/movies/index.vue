<script lang="ts" setup>
import { ref, onMounted, watch } from "vue";
import { usePaginationStore } from "~/store/paginationStore.js";

const router = useRouter();
const isLoading = ref(false);
const store = usePaginationStore();
const baseImageUrl = "https://image.tmdb.org/t/p/w300";

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
const goToMovie = (item: any) => {
  router.push({
    path: `/movies/${item.id}`,
    query: {
      movie: JSON.stringify(item),
    },
  });
};
</script>

<template>
  <Loading v-if="store.isLoading" />

  <v-row v-if="!store.isLoading" class="mt-5 d-flex flex-wrap align-center">
    <v-col class="movie rounded-lg" v-for="item of store.data?.results" :key="item.id" cols="12" sm="6" md="4" lg="3">
      <v-img height="450" cover class="d-flex d-xl-none movie-img transition rounded-lg"
        :src="baseImageUrl + item.poster_path" />
      <v-img height="580" cover class="d-none d-xl-flex movie-img transition rounded-lg"
        :src="baseImageUrl + item.poster_path" />
      <span class="movie-rate pa-2 bg-deep-orange text-white">{{
        item.vote_average.toFixed(1)
        }}</span>
      <v-img @click="goToMovie(item)" width="75" src="https://cdn-icons-png.flaticon.com/512/3686/3686899.png"
        class="play-icon d-none cursor-pointer transition rounded-xl" />
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

<style scoped>
@import url("/assets/css/main.css");

.card {
  position: relative;
}

.movie-rate {
  position: absolute;
  top: 2%;
  left: 2%;
  z-index: 2;
  border-radius: 0 0 1.1rem 0;
}

.play-icon {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 999;
  overflow: hidden;
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
