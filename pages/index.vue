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
        prevEl: '.popular-swiper-button-prev',
        nextEl: '.popular-swiper-button-next',
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
          slidesPerView: 5,
          spaceBetween: 20,
        },
      }"
      class="mySwiper"
    >
      <div class="popular-swiper-button-prev rounded-xl pa-5 cursor-pointer">
        <v-icon icon="mdi-arrow-left" size="x-large" />
      </div>
      <div class="popular-swiper-button-next rounded-xl pa-5 cursor-pointer">
        <v-icon icon="mdi-arrow-right" size="x-large" />
      </div>
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
        <div class="content d-flex flex-column ga-1 align-start pa-3 rounded-lg">
          <h3 class="text-subtitle-1 text-white text-xl-h5">{{ item.original_title }}</h3>
          <p class="text-subtitle-2 text-white text-md-subtitle-1">
            {{ item.release_date.slice(0, 4) }}
          </p>
          <div class="d-flex ga-1">
            <span class="text-subtitle-1 text-white">{{
              item.vote_average?.toFixed(1)
            }}</span>
            <v-icon icon="mdi-star" color="#FB8D00" />
          </div>
        </div>
      </SwiperSlide>
    </swiper>
  </div>

  <!-- action movies -->
  <div v-if="!store.isLoading" class="mt-15">
    <h3 class="text-h5 text-sm-h3 text-md-h2">Action</h3>
    <hr class="my-5 w-100 w-md-25" color="deep-orange" />
  </div>

  <div v-if="!store.isLoading" class="mt-15">
    <swiper
      :spaceBetween="30"
      :freeMode="true"
      :modules="[SwiperFreeMode, SwiperAutoplay, SwiperNavigation]"
      :grab-cursor="true"
      :navigation="{
        prevEl: '.action-swiper-button-prev',
        nextEl: '.action-swiper-button-next',
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
          slidesPerView: 5,
          spaceBetween: 20,
        },
      }"
      class="mySwiper"
    >
      <div class="action-swiper-button-prev rounded-xl pa-5 cursor-pointer">
        <v-icon icon="mdi-arrow-left" size="x-large" />
      </div>
      <div class="action-swiper-button-next rounded-xl pa-5 cursor-pointer">
        <v-icon icon="mdi-arrow-right" size="x-large" />
      </div>
      <SwiperSlide class="swiper-slide" v-for="item of store.actionMovies?.results">
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
        <div class="content d-flex flex-column ga-1 align-start pa-3 rounded-lg">
          <h3 class="text-subtitle-1 text-white text-xl-h5">{{ item.original_title }}</h3>
          <p class="text-subtitle-2 text-white text-md-subtitle-1">
            {{ item.release_date.slice(0, 4) }}
          </p>
          <div class="d-flex ga-1">
            <span class="text-subtitle-1 text-white">{{
              item.vote_average?.toFixed(1)
            }}</span>
            <v-icon icon="mdi-star" color="#FB8D00" />
          </div>
        </div>
      </SwiperSlide>
    </swiper>
  </div>

  <!-- thriller movies -->
  <div v-if="!store.isLoading" class="mt-15">
    <h3 class="text-h5 text-sm-h3 text-md-h2">Thriller</h3>
    <hr class="my-5 w-100 w-md-25" color="deep-orange" />
  </div>

  <div v-if="!store.isLoading" class="mt-15">
    <swiper
      :spaceBetween="30"
      :freeMode="true"
      :modules="[SwiperFreeMode, SwiperAutoplay, SwiperNavigation]"
      :grab-cursor="true"
      :navigation="{
        prevEl: '.thriller-swiper-button-prev',
        nextEl: '.thriller-swiper-button-next',
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
          slidesPerView: 5,
          spaceBetween: 20,
        },
      }"
      class="mySwiper"
    >
      <div class="thriller-swiper-button-prev rounded-xl pa-5 cursor-pointer">
        <v-icon icon="mdi-arrow-left" size="x-large" />
      </div>
      <div class="thriller-swiper-button-next rounded-xl pa-5 cursor-pointer">
        <v-icon icon="mdi-arrow-right" size="x-large" />
      </div>
      <SwiperSlide class="swiper-slide" v-for="item of store.thrillerMovies?.results">
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
        <div class="content d-flex flex-column ga-1 align-start pa-3 rounded-lg">
          <h3 class="text-subtitle-1 text-white text-xl-h5">{{ item.original_title }}</h3>
          <p class="text-subtitle-2 text-white text-md-subtitle-1">
            {{ item.release_date.slice(0, 4) }}
          </p>
          <div class="d-flex ga-1">
            <span class="text-subtitle-1 text-white">{{
              item.vote_average?.toFixed(1)
            }}</span>
            <v-icon icon="mdi-star" color="#FB8D00" />
          </div>
        </div>
      </SwiperSlide>
    </swiper>
  </div>

  <!-- horror movies -->
  <div v-if="!store.isLoading" class="mt-15">
    <h3 class="text-h5 text-sm-h3 text-md-h2">Horror</h3>
    <hr class="my-5 w-100 w-md-25" color="deep-orange" />
  </div>

  <div v-if="!store.isLoading" class="mt-15">
    <swiper
      :spaceBetween="30"
      :freeMode="true"
      :modules="[SwiperFreeMode, SwiperAutoplay, SwiperNavigation]"
      :grab-cursor="true"
      :navigation="{
        prevEl: '.horror-swiper-button-prev',
        nextEl: '.horror-swiper-button-next',
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
          slidesPerView: 5,
          spaceBetween: 20,
        },
      }"
      class="mySwiper"
    >
      <div class="horror-swiper-button-prev rounded-xl pa-5 cursor-pointer">
        <v-icon icon="mdi-arrow-left" size="x-large" />
      </div>
      <div class="horror-swiper-button-next rounded-xl pa-5 cursor-pointer">
        <v-icon icon="mdi-arrow-right" size="x-large" />
      </div>
      <SwiperSlide class="swiper-slide" v-for="item of store.horrorMovies?.results">
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
        <div class="content d-flex flex-column ga-1 align-start pa-3 rounded-lg">
          <h3 class="text-subtitle-1 text-white text-xl-h5">{{ item.original_title }}</h3>
          <p class="text-subtitle-2 text-white text-md-subtitle-1">
            {{ item.release_date.slice(0, 4) }}
          </p>
          <div class="d-flex ga-1">
            <span class="text-subtitle-1 text-white">{{
              item.vote_average?.toFixed(1)
            }}</span>
            <v-icon icon="mdi-star" color="#FB8D00" />
          </div>
        </div>
      </SwiperSlide>
    </swiper>
  </div>

  <!-- adventure movies -->
  <div v-if="!store.isLoading" class="mt-15">
    <h3 class="text-h5 text-sm-h3 text-md-h2">Adventure</h3>
    <hr class="my-5 w-100 w-md-25" color="deep-orange" />
  </div>

  <div v-if="!store.isLoading" class="mt-15">
    <swiper
      :spaceBetween="30"
      :freeMode="true"
      :modules="[SwiperFreeMode, SwiperAutoplay, SwiperNavigation]"
      :grab-cursor="true"
      :navigation="{
        prevEl: '.adventure-swiper-button-prev',
        nextEl: '.adventure-swiper-button-next',
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
          slidesPerView: 5,
          spaceBetween: 20,
        },
      }"
      class="mySwiper"
    >
      <div class="adventure-swiper-button-prev rounded-xl pa-5 cursor-pointer">
        <v-icon icon="mdi-arrow-left" size="x-large" />
      </div>
      <div class="adventure-swiper-button-next rounded-xl pa-5 cursor-pointer">
        <v-icon icon="mdi-arrow-right" size="x-large" />
      </div>
      <SwiperSlide class="swiper-slide" v-for="item of store.adventureMovies?.results">
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
        <div class="content d-flex flex-column ga-1 align-start pa-3 rounded-lg">
          <h3 class="text-subtitle-1 text-white text-xl-h5">{{ item.original_title }}</h3>
          <p class="text-subtitle-2 text-white text-md-subtitle-1">
            {{ item.release_date.slice(0, 4) }}
          </p>
          <div class="d-flex ga-1">
            <span class="text-subtitle-1 text-white">{{
              item.vote_average?.toFixed(1)
            }}</span>
            <v-icon icon="mdi-star" color="#FB8D00" />
          </div>
        </div>
      </SwiperSlide>
    </swiper>
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from "vue";
import { usePaginationStore } from "~/store/paginationStore";

const router = useRouter();
const store = usePaginationStore();
const randomPage = Math.floor(Math.random() * 100) + 1;

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

.popular-swiper-button-prev,
.popular-swiper-button-next,
.action-swiper-button-prev,
.action-swiper-button-next,
.horror-swiper-button-prev,
.horror-swiper-button-next,
.thriller-swiper-button-prev,
.thriller-swiper-button-next,
.adventure-swiper-button-prev,
.adventure-swiper-button-next {
  position: absolute;
  top: 50%;
  z-index: 99;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.5);
  border-radius: 505;
  padding: 1rem;
  color: #ff5722;
  z-index: 999;
}
.popular-swiper-button-prev,
.action-swiper-button-prev,
.horror-swiper-button-prev,
.thriller-swiper-button-prev,
.adventure-swiper-button-prev {
  left: 1%;
}
.popular-swiper-button-next,
.action-swiper-button-next,
.horror-swiper-button-next,
.thriller-swiper-button-next,
.adventure-swiper-button-next {
  right: 1%;
}
</style>
