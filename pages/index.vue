<template>
  <Loading v-if="store.isLoading" />

  <div
    v-if="!store.isLoading"
    class="wrapper my-15 d-flex justify-start align-center pa-5 rounded-lg"
  >
    <div class="content-banner d-flex flex-column align-start ga-3">
      <h5 class="text-h5 text-sm-h4 text-xl-h3 text-deep-orange">Now Streaming</h5>
      <h2 class="text-h4 text-white text-sm-h3 text-md-h3 text-lg-h2 text-xl-h1">
        Now Streaming
      </h2>
      <v-btn
        @click="router.replace('/movies')"
        class="explore-btn bg-transparent transition d-none d-sm-flex cursor-pointer transition rounded-lg"
        text="explore movies"
        append-icon="mdi-arrow-right"
        size="x-large"
      />
      <v-btn
        @click="router.replace('/movies')"
        class="bg-deep-orange bg-transparent transition d-flex d-sm-none cursor-pointer transition rounded-lg"
        text="explore movies"
        append-icon="mdi-arrow-right"
        size="small"
      />
    </div>
  </div>

  <!-- populer movies -->
  <div v-if="!store.isLoading" class="mt-15">
    <h3 class="text-h5 text-sm-h3 text-md-h2">Popular</h3>
    <hr class="my-5 w-100 w-md-25" color="deep-orange" />
  </div>

  <div v-if="!store.isLoading" class="mt-15">
    <swiper
      :spaceBetween="30"
      :freeMode="true"
      :modules="[SwiperFreeMode, SwiperAutoplay, SwiperNavigation]"
      :grab-cursor="true"
      :navigation="{
        prevEl: '.custom-swiper-button-prev',
        nextEl: '.custom-swiper-button-next',
      }"
      :loop="true"
      :autoplay="{
        delay: 4500,
        disableOnInteraction: false,
      }"
      :breakpoints="{
        '@0.00': {
          slidesPerView: 1,
          spaceBetween: 10,
        },
        '@0.75': {
          slidesPerView: 2,
          spaceBetween: 10,
        },
        '@1.00': {
          slidesPerView: 3,
          spaceBetween: 40,
        },
        '@1.50': {
          slidesPerView: 4,
          spaceBetween: 20,
        },
      }"
      class="mySwiper"
    >
      <SwiperSlide class="swiper-slide" v-for="item of store.data?.results">
        <v-img
          class="rounded-xl d-none d-sm-flex"
          :src="`https://image.tmdb.org/t/p/w342${item.poster_path}`"
          height="450"
          cover
        />
        <v-img
          class="rounded-xl d-flex d-sm-none"
          :src="`https://image.tmdb.org/t/p/w500${item.poster_path}`"
          height="400"
          cover
        />
        <div class="content d-flex flex-column ga-2 align-start pa-3">
          <h3 class="text-subtitle-1 text-xl-h5">{{ item.original_title }}</h3>
          <p class="text-subtitle-2 text-md-subtitle-1">{{ item.release_date }}</p>
        </div>
      </SwiperSlide>
    </swiper>
  </div>

  <!-- action movies -->
  <div v-if="!store.isLoading" class="mt-15">
    <h3 class="text-h5 text-sm-h3 text-md-h2">Action</h3>
    <hr class="my-5 w-100 w-md-25" color="deep-orange" />
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from "vue";
import { usePaginationStore } from "~/store/paginationStore";

const router = useRouter();
const store = usePaginationStore();
const randomPage = Math.floor(Math.random() * 100) + 1;

// turune göre film getirmek
// aksıyon gerne = 28
// https://api.themoviedb.org/3/discover/movie?api_key=YOUR_API_KEY&with_genres=28&sort_by=popularity.desc&page=1

onMounted(async () => {
  store.fetchData(randomPage);
});
</script>
<style scoped>
@import url(/assets/css/main.css);

.wrapper {
  position: relative;
  top: 0;
  left: 0;
  height: 60vh;
  width: 100%;
  overflow: hidden;
}

.wrapper::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-image: url("https://png.pngtree.com/thumb_back/fh260/background/20230706/pngtree-gritty-cinematic-backdrop-a-luxurious-and-elegant-3d-rendering-of-a-image_3805012.jpg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  filter: blur(0.1rem);
  z-index: 1;
}

.content-banner {
  position: relative;
  z-index: 2;
  text-align: center;
  backdrop-filter: none;
}
.swiper-slide {
  position: relative;
}

.content {
  position: absolute;
  bottom: 5%;
  left: 5%;
  z-index: 999;
  background: rgba(0, 0, 0, 0.3);
}

.explore-btn {
  border: 1px solid #ff5722 !important;
  color: #fff !important;
}

.explore-btn:hover {
  background-color: #ff5722 !important;
  color: #fff !important;
}

.custom-swiper-button-prev,
.custom-swiper-button-next {
  position: absolute;
  top: 50%;
  z-index: 99;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 505;
  padding: 1rem;
  color: #ff5722;
}
</style>
