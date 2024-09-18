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
        class="link transition cursor-pointer pa-2 mr-5 bg-transparent rounded-lg"
        >All Movies</span
      >
      <v-btn
        @click="isSearcingMovie = !isSearcingMovie"
        width="250"
        variant="outlined"
        rounded="xl"
        :color="_store.theme === 'dark' ? 'deep-orange' : 'white'"
        prepend-icon="mdi-magnify"
        :class="_store.theme === 'dark' ? 'dark-search-btn' : 'light-search-btn'"
        text="Search... &nbsp; ctrl+k"
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
    <div class="wrapper pa-10 rounded-lg">
      <v-text-field
        class="text-white"
        v-model="models.name"
        label="Search"
        color="deep-orange"
        placeholder="Write movie name"
        variant="outlined"
        rounded="xl"
      />
      <div
        v-for="item of searchResultMovies"
        class="search-result-list cursor-pointer pa-2 d-flex ga-2 my-1 rounded-lg"
      >
        <img :src="item.url" width="70" class="rounded-lg" />
        <div class="content d-flex flex-column ga-1">
          <p class="text-subtitle-2 text-white search-result-title text-sm-subtitle-1">
            {{ item.name }}
          </p>
          <p class="text-caption text-white text-sm-subtitle-1">{{ item.genre }}</p>
        </div>
      </div>
    </div>
  </v-dialog>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import store from "~/store/store";

const isSearcingMovie = ref(false);
const _store = store();
const router = useRouter();
const route = useRoute();

const models = ref({
  name: "",
});

/* todo: burada yapılması gereken dinamik olarak search etkileşimi koyup api den verileri çekmek */
const searchResultMovies = [
  {
    name: "John Wick",
    genre: "Action",
    url:
      "https://media.wired.com/photos/641cb060a52b790517dbfeb6/1:1/w_1045,h_1045,c_limit/john-wick-changed-movies-forever-culture.jpg",
  },
  {
    name: "John Wick",
    genre: "Action",
    url:
      "https://media.wired.com/photos/641cb060a52b790517dbfeb6/1:1/w_1045,h_1045,c_limit/john-wick-changed-movies-forever-culture.jpg",
  },
  {
    name: "John Wick",
    genre: "Action",
    url:
      "https://media.wired.com/photos/641cb060a52b790517dbfeb6/1:1/w_1045,h_1045,c_limit/john-wick-changed-movies-forever-culture.jpg",
  },
  {
    name: "John Wick",
    genre: "Action",
    url:
      "https://media.wired.com/photos/641cb060a52b790517dbfeb6/1:1/w_1045,h_1045,c_limit/john-wick-changed-movies-forever-culture.jpg",
  },
  {
    name: "John Wick",
    genre: "Action",
    url:
      "https://media.wired.com/photos/641cb060a52b790517dbfeb6/1:1/w_1045,h_1045,c_limit/john-wick-changed-movies-forever-culture.jpg",
  },
  {
    name: "John Wick",
    genre: "Action",
    url:
      "https://media.wired.com/photos/641cb060a52b790517dbfeb6/1:1/w_1045,h_1045,c_limit/john-wick-changed-movies-forever-culture.jpg",
  },
  {
    name: "John Wick",
    genre: "Action",
    url:
      "https://media.wired.com/photos/641cb060a52b790517dbfeb6/1:1/w_1045,h_1045,c_limit/john-wick-changed-movies-forever-culture.jpg",
  },
  {
    name: "John Wick",
    genre: "Action",
    url:
      "https://media.wired.com/photos/641cb060a52b790517dbfeb6/1:1/w_1045,h_1045,c_limit/john-wick-changed-movies-forever-culture.jpg",
  },
];

const handleKeyDown = (e: any) => {
  if (e.ctrlKey && e.key === "k") {
    e.preventDefault();
    isSearcingMovie.value = true;
  }
};

onMounted(() => {
  window.addEventListener("keydown", handleKeyDown);
});
</script>

<style scoped>
@import url("/assets/css/main.css");

.wrapper {
  background: #20334e;
  max-height: 70vh;
  overflow: scroll;
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
