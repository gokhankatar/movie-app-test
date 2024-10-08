<template>
  <Loading v-if="isLoading" />
  <div v-if="movie && !isLoading">
    <div
      class="d-none d-sm-flex background-blur"
      :style="{
        backgroundImage: `url(${baseImageUrlLg + movie.backdrop_path})`,
      }"
    />
    <div
      class="d-flex d-sm-none background-blur"
      :style="{
        backgroundImage: `url(${baseImageUrlSm + movie.backdrop_path})`,
      }"
    />

    <v-row
      class="content-container fill-height w-100 d-flex justify-space-evenly align-center"
    >
      <v-col class="content image" cols="12" sm="12" md="4">
        <v-img
          @click="isOpeningTrailer = true"
          class="play-icon d-none cursor-pointer transition"
          src="https://cdn-icons-png.flaticon.com/512/3686/3686899.png"
          width="100"
        />
        <v-img
          class="d-none d-xl-flex movie-poster rounded-lg"
          :src="baseImageUrlPosterLg + movie.poster_path"
          cover
          height="700"
        />
        <v-img
          class="d-none d-sm-flex d-xl-none movie-poster rounded-lg"
          :src="baseImageUrlPosterLg + movie.poster_path"
          cover
          height="500"
        />
        <v-img
          class="d-flex d-sm-none movie-poster rounded-lg"
          :src="baseImageUrlPosterSm + movie.poster_path"
          cover
          height="500"
        />
      </v-col>
      <v-col
        class="content content-text pa-5 rounded-lg d-flex flex-column ga-1"
        cols="12"
        sm="12"
        md="6"
      >
        <h3 class="text-h5 text-sm-h4 text-xl-h3 text-white mb-7">
          {{ movie.original_title }}
        </h3>
        <p class="text-subtitle-1 text-white">
          <strong>Overview : </strong>{{ movie.overview }}
        </p>
        <p class="text-subtitle-1 text-white">
          <strong>Genres : </strong>{{ genreNames }}
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
        <v-btn
          @click="isOpeningTrailer = true"
          variant="outlined"
          class="play-btn rounded-lg transition"
          size="large"
          text="play trailer"
          prepend-icon="mdi-play"
        />
        <v-btn
          @click="shareMovie(movie)"
          variant="outlined"
          class="share-btn my-3 rounded-lg transition"
          size="large"
          text="Share Movie"
          prepend-icon="mdi-play"
        />
        <v-btn
          @click="router.replace('/movies')"
          variant="outlined"
          class="back-btn rounded-lg transition"
          size="large"
          text="back to movies"
        />
      </v-col>
    </v-row>
  </div>

  <v-dialog v-model="isOpeningTrailer" max-width="600">
    <iframe
      class="rounded-xl"
      height="500"
      :src="`https://www.youtube.com/embed/${trailerKeys[randomIndex]}`"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
  /></v-dialog>
</template>

<script lang="ts" setup>
import { ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";

const isLoading = ref(false);
const isOpeningTrailer = ref(false);
const route = useRoute();
const router = useRouter();
const baseImageUrlLg = "https://image.tmdb.org/t/p/w1280";
const baseImageUrlSm = "https://image.tmdb.org/t/p/w500";
const baseImageUrlPosterLg = "https://image.tmdb.org/t/p/w500";
const baseImageUrlPosterSm = "https://image.tmdb.org/t/p/w300";
const trailerKeys = ref([]);
const randomIndex = Math.floor(Math.random() * trailerKeys.value.length);

const genreList = ref<{ id: number; name: string }[]>([]);
const movie = computed(() => {
  const movieData = route.query.movie;
  try {
    isLoading.value = true;
    return typeof movieData === "string" ? JSON.parse(movieData) : null;
  } catch (error) {
    console.error("Movie data parsing error:", error);
    return null;
  } finally {
    isLoading.value = false;
  }
});

const genreNames = computed(() => {
  if (!movie.value) return "";
  return movie.value.genre_ids
    .map((id: number) => {
      const genre = genreList.value.find((g) => g.id === id);
      return genre ? genre.name : "Unknown";
    })
    .join(", ");
});

const fetchGenres = async () => {
  try {
    const { data: genresResponse } = await useFetch(
      `https://api.themoviedb.org/3/genre/movie/list`,
      {
        params: {
          api_key: "4e012d6a950f5501f23ee3e7f1e548d4",
          language: "en-US",
        },
      }
    );
    genreList.value = genresResponse.value.genres;
  } catch (error) {
    console.error("Error fetching genres:", error.message);
  }
};

const movieTrailer = async () => {
  const { data } = await useFetch(
    `https://api.themoviedb.org/3/movie/${movie.value.id}/videos?api_key=4e012d6a950f5501f23ee3e7f1e548d4&language=en-US`
  );
  data.value?.results.map((movie: any) => {
    if (movie.type === "Trailer") {
      trailerKeys.value.push(movie.key);
    }
  });
};

useHead({
  title: `GKMovies - ${movie.value.original_title}`,
});

useSeoMeta({
  title: movie.value?.title,
  ogTitle: movie.value?.title,
  description: movie.value?.overview,
  ogDescription: movie.value?.overview,
  ogImage: `https://image.tmdb.org/t/p/w500${movie.value?.backdrop_path}`,
  twitterCard: "summary_large_image",
  twitterImage: movie.value?.backdrop_path,
});

const shareMovie = (movie: any) => {
  const movieUrl = `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`;
  const shareText = `Check this out: ${movie.title}\n${movieUrl}`;

  const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(
    shareText
  )}`;

  window.open(whatsappUrl, "_blank");
};

onMounted(async () => {
  await nextTick();

  fetchGenres();
  movieTrailer();
});
</script>

<style scoped>
@import url(/assets/css/main.css);

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
.image:hover .play-icon {
  display: flex !important;
}
.content-container {
  position: relative;
  z-index: 2;
}

.content {
  z-index: 999;
  position: relative;
}

.play-icon {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 9999;
  border-radius: 50%;
}
.play-icon:hover {
  background: rgba(0, 0, 0, 0.3);
}
.content-text {
  background: rgba(0, 0, 0, 0.3);
}
.play-btn,
.share-btn {
  border: 1px solid #fff;
  color: #fff;
}
.play-btn:hover {
  border-color: #4a148c;
  background-color: #4a148c;
  color: #fff;
}
.share-btn:hover {
  border-color: #4abce6;
  background-color: #4abce6;
  color: #fff;
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
