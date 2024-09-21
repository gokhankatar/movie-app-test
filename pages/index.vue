<template>
  <Loading v-if="store.isLoading" />

  <div v-if="!store.isLoading" class="wrapper" />

  <div v-if="!store.isLoading" class="content d-flex flex-column align-start ga-3">
    <h5 class="text-h5 text-sm-h4 text-xl-h3 text-deep-orange">Now Streaming</h5>
    <h2 class="text-h4 text-sm-h3 text-md-h3 text-lg-h2 text-xl-h1">Now Streaming</h2>
    <v-btn
      @click="router.replace('/movies')"
      class="explore-btn d-none d-sm-flex cursor-pointer transition rounded-lg"
      text="explore movies"
      append-icon="mdi-arrow-right"
      size="x-large"
    />
    <v-btn
      @click="router.replace('/movies')"
      class="bg-deep-orange d-flex d-sm-none cursor-pointer transition rounded-lg"
      text="explore movies"
      append-icon="mdi-arrow-right"
      size="small"
    />
  </div>

  <v-responsive class="my-15"></v-responsive>
  <v-responsive class="my-15"></v-responsive>
  <v-responsive class="my-15"></v-responsive>
  <v-responsive class="my-15"></v-responsive>
  <v-responsive class="my-15"></v-responsive>
  <v-responsive class="my-15"></v-responsive>
  <v-responsive class="my-15"></v-responsive>
  <v-responsive class="my-15"></v-responsive>
  <div v-if="!store.isLoading" class="mt-15">
    <Swiper
      :modules="[SwiperEffectFade, SwiperPagination, SwiperNavigation, SwiperAutoplay]"
      :effect="'fade'"
      :keyboard="{
        enabled: true,
      }"
      :grab-cursor="true"
      :navigation="{
        prevEl: '.custom-swiper-button-prev',
        nextEl: '.custom-swiper-button-next',
      }"
      :spaceBetween="10"
      :loop="true"
      :autoplay="{
        delay: 4500,
        disableOnInteraction: false,
      }"
      :pagination="{
        clickable: true,
      }"
      :observer="true"
      :observe-parents="true"
    >
      <SwiperSlide class="swiper-slide" v-for="item of store.data?.results">
        <v-img
          class="rounded-xl d-none d-sm-flex"
          :src="baseImgUrl + item.poster_path"
          height="300"
          cover
        />
        <div
          class="content d-flex justify-center justify-sm-space-between align-center pa-5"
        ></div>
      </SwiperSlide>
    </Swiper>
  </div>
</template>
<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { usePaginationStore } from "/store/paginationStore.js";

const router = useRouter();
const store = usePaginationStore();
const randomPage = Math.floor(Math.random() * 200) + 1;
const baseImageUrl = "https://image.tmdb.org/t/p/w300";

onMounted(() => {
  store.fetchData(randomPage);
});
</script>
<style scoped>
@import url(/assets/css/main.css);

.wrapper {
  position: absolute;
  top: 0;
  left: 0;
  height: 60vh;
  width: 100%;
  background-image: url("https://png.pngtree.com/thumb_back/fh260/background/20230706/pngtree-gritty-cinematic-backdrop-a-luxurious-and-elegant-3d-rendering-of-a-image_3805012.jpg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  filter: blur(0.1rem);
  z-index: 1;
}
.content {
  position: absolute;
  top: 25%;
  left: 10%;
  z-index: 2;
}
.explore-btn {
  border: 1px solid #ff5722;
  color: #ff5722;
}
.explore-btn:hover {
  background-color: #ff5722;
  color: #fff;
}
</style>
