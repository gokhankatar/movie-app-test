<template>
  <v-row
    :class="_store.theme === 'dark' ? 'navbar-dark' : 'navbar-light'"
    class="d-flex justify-space-between align-center py-2 mb-10 px-2 rounded-lg"
  >
    <div
      @click="router.replace('/')"
      class="logo cursor-pointer d-flex justify-center align-center ga-2"
    >
      <v-img
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Eo_circle_orange_film-camera.svg/480px-Eo_circle_orange_film-camera.svg.png"
        width="50"
      />
      <span
        :class="_store.theme === 'light' ? 'text-white' : ''"
        class="header d-none d-sm-flex text-subtitle-1 text-sm-h5 text-uppercase font-weight-bold"
        >GKmovie</span
      >
    </div>

    <div class="d-flex justify-center align-center ga-3">
      <span
        @click="router.replace('/movies')"
        :class="route.fullPath.includes('movies') ? 'active-link' : ''"
        class="link d-none d-sm-flex transition cursor-pointer pa-2 mr-5 bg-transparent rounded-lg"
        >All Movies</span
      >
      <v-btn
        @click="openSearchBar"
        variant="outlined"
        rounded="xl"
        :color="_store.theme === 'dark' ? 'deep-orange' : 'white'"
        prepend-icon="mdi-magnify"
        :class="_store.theme === 'dark' ? 'dark-search-btn' : 'light-search-btn'"
        text="ctrl+k"
      />
      <v-icon
        @click="_store.changeTheme"
        class="icon-theme rounded-lg pa-5 cursor-pointer transition"
        :icon="_store.theme === 'light' ? 'mdi-weather-night' : 'mdi-weather-sunny'"
        color="white"
      />
    </div>
  </v-row>

  <!-- Search -->
  <v-dialog v-model="isSearcingMovie" max-width="600">
    <div class="wrapper pa-5 pa-sm-10 rounded-lg">
      <v-text-field
        id="searchBar"
        @input="searchMovie"
        class="text-white"
        v-model="models.name"
        label="Search"
        color="deep-orange"
        placeholder="Write movie name"
        variant="outlined"
        rounded="xl"
        clearable
      />
      <div
        @click="goToMovie(item)"
        v-if="searchResultMovies.length > 0"
        v-for="item of searchResultMovies"
        :key="item.id"
        class="search-result-list cursor-pointer pa-2 d-flex ga-2 my-1 rounded-lg"
      >
        <img :src="item.poster_url" width="70" class="d-none d-sm-flex rounded-lg" />
        <img :src="item.poster_url" width="50" class="d-flex d-sm-none rounded-lg" />
        <div class="content d-flex flex-column ga-1">
          <p class="text-subtitle-2 text-white search-result-title text-sm-subtitle-1">
            {{ item.original_title }}
          </p>
          <p class="text-subtitle-2 text-white text-sm-subtitle-1">
            {{ item.genre_names }}
          </p>
          <p class="text-caption text-white text-sm-subtitle-1">
            {{ item.release_date.slice(0, 4) }}
          </p>
        </div>
      </div>
      <div v-if="isNotFounded">
        <p class="text-subtitle-1 text-sm-h5 text-white">No results found.</p>
      </div>
    </div>
    <v-progress-circular
      class="loading-bar"
      v-if="isLoading"
      color="deep-orange"
      indeterminate
    ></v-progress-circular>
  </v-dialog>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import store from "~/store/store";

const isLoading = ref(false);
const isSearcingMovie = ref(false);
const isNotFounded = ref(false);
const _store = store();
const router = useRouter();
const route = useRoute();

const models = ref({
  name: "",
});

const searchResultMovies = ref([]);
const genreList = ref([]);

const openSearchBar = async () => {
  isSearcingMovie.value = true;
  models.value.name = "";
  searchResultMovies.value = [];
  await nextTick();

  const searchBar = document.getElementById("searchBar");
  searchBar?.focus();
};

const handleKeyDown = (e: any) => {
  if (e.ctrlKey && e.key === "k") {
    e.preventDefault();
    openSearchBar();
  }
};

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
    genreList.value = genresResponse.value?.genres;
  } catch (error: any) {
    console.error("Error fetching genres:", error.message);
  }
};

const searchMovie = async () => {
  if (models.value.name.length > 2) {
    try {
      isLoading.value = true;

      const { data: response } = await useFetch(
        `https://api.themoviedb.org/3/search/movie`,
        {
          params: {
            api_key: "4e012d6a950f5501f23ee3e7f1e548d4",
            query: models.value.name,
            language: "en-US",
            page: 1,
          },
        }
      );

      if (response.value && response.value.results.length > 0) {
        searchResultMovies.value = response.value.results.map((movie: any) => ({
          ...movie,
          genre_names: movie.genre_ids
            .map((id: number) => {
              if (genreList.value) {
                const genre = genreList.value.find((g: any) => g.id === id);
                return genre ? genre.name : "Unknown";
              }
            })
            .join(", "),
          poster_url: movie.poster_path
            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
            : "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Eo_circle_orange_film-camera.svg/480px-Eo_circle_orange_film-camera.svg.png",
        }));
        isNotFounded.value = false;
      } else {
        searchResultMovies.value = [];
        isNotFounded.value = true;
      }

      isLoading.value = false;
    } catch (error: any) {
      console.error(error.message);
    }
  }
};

const goToMovie = (item: any) => {
  isSearcingMovie.value = false;
  models.value.name = "";
  searchResultMovies.value = [];
  router.push({
    path: `/movies/${item.id}`,
    query: {
      movie: JSON.stringify(item),
    },
  });
};

onMounted(() => {
  window.addEventListener("keydown", handleKeyDown);
  fetchGenres();
});
</script>

<style scoped>
@import url("/assets/css/main.css");

.wrapper {
  position: relative;
  background: #20334e;
  max-height: 70vh;
  overflow: auto;
  scrollbar-width: thin;
  scrollbar-color: #20334e #f1f1f1;
  scroll-behavior: smooth;
}
.loading-bar {
  position: absolute;
  top: 70%;
  left: 50%;
  transform: translate(-50%, -50);
}
.navbar-dark {
  background: rgba(255, 255, 255, 0.1);
}

.navbar-light {
  background: #ff5721;
}

.search-result-list {
  background: rgba(0, 0, 0, 0.2);
}

.search-result-list:hover {
  background: rgba(0, 0, 0, 0.3);
}

.search-result-list:hover .search-result-title {
  color: #ff5721 !important;
}

.link:hover {
  background: rgba(0, 0, 0, 0.3) !important;
}

.dark-search-btn:hover {
  border-color: #ff5722;
  background-color: #ff5722 !important;
  color: #fff !important;
}

.light-search-btn:hover {
  border-color: #000;
  background-color: #000 !important;
  color: #fff !important;
}

.header {
  color: #fb8d00;
}

.active-link {
  background: rgba(0, 0, 0, 0.3) !important;
  color: #fff !important;
}

.active-link:hover {
  background-color: transparent !important;
}

.icon-theme:hover {
  background: rgba(0, 0, 0, 0.3) !important;
}
</style>
