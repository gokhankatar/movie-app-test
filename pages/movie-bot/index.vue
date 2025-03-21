<template>
  <v-row
    v-if="!_store.isSpecialUser && !isLoading"
    class="form-pop-cent d-flex justify-center align-center"
  >
    <v-col cols="12" sm="10" md="8" lg="6">
      <v-form
        :class="_store.theme == 'light' ? 'form-container-light' : 'form-container-dark'"
        class="d-flex flex-column rounded-lg pa-5 pa-lg-10"
        ref="formApikey"
        @submit.prevent="handleSubmit"
      >
        <v-text-field
          v-model="models.api_key"
          variant="outlined"
          label="Your API Key"
          type="text"
          color="_store.theme == 'light'?'black':'white'"
          rounded="lg"
          :base-color="_store.theme == 'light' ? 'black' : 'white'"
          :class="_store.theme == 'light' ? 'text-black' : 'text-white'"
          prepend-inner-icon="mdi-api"
          required
          clearable
        />

        <p class="text-white rounded-lg pa-3 bg-error mb-5" v-if="isWrongPassw">
          Wrong Password !
        </p>

        <v-btn
          size="x-large"
          type="submit"
          variant="outlined"
          :color="_store.theme == 'light' ? 'black' : 'white'"
          rounded="lg"
          block
          text="Get Movies"
        />
      </v-form>
    </v-col>
  </v-row>

  <Loading v-if="isLoading" />

  <v-row
    v-if="!isLoading && _store.isSpecialUser"
    class="d-flex justify-center align-center"
  >
    <v-col cols="12" class="my-5">
      <p class="text-center text-md-start text-h5 text-lg-h4">Willkommen, Ahsen :)</p>
    </v-col>
    <v-col
      class="movie rounded-lg"
      v-for="item of botMovies"
      :key="item.id"
      cols="12"
      sm="6"
      md="4"
      lg="3"
    >
      <v-img
        height="450"
        @click="goToMovie(item)"
        cover
        class="cursor-pointer d-flex d-xl-none movie-img transition rounded-lg"
        :src="baseImageUrl + item.poster_path"
      />
      <v-img
        height="580"
        @click="goToMovie(item)"
        cover
        class="cursor-pointer d-none d-xl-flex movie-img transition rounded-lg"
        :src="baseImageUrl + item.poster_path"
      />
      <span class="movie-rate pa-2 bg-deep-orange text-white">{{
        item.vote_average.toFixed(1)
      }}</span>
      <v-img
        @click="goToMovie(item)"
        width="75"
        src="https://cdn-icons-png.flaticon.com/512/3686/3686899.png"
        class="play-icon d-none cursor-pointer transition rounded-xl"
      />
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
</template>
<script lang="ts" setup>
import Loading from "~/components/Loading.vue";
import store from "~/store/store";
import axios from "axios";

const router = useRouter();
const _store = store();

const baseImageUrl = "https://image.tmdb.org/t/p/w300";
const isWrongPassw = ref(false);
const formApikey = ref<HTMLFormElement | null>(null);

const API_KEY = "4e012d6a950f5501f23ee3e7f1e548d4";
const API_URL = "https://api.themoviedb.org/3/search/movie";

type Models = {
  api_key: string | null;
};

const models = ref<Models>({
  api_key: null,
});

const botMovies = ref<any[] | null>(null);
const isLoading = ref(false);

const movieTitles = [
  "Finch",
  "Arctic",
  "Snowpiercer",
  "Elysium",
  "The Night Eats the World",
  "The Autopsy of Jane Doe",
  "The Vanishing",
  "Green Room",
  "Buried",
  "Hush",
  "Coherence",
  "The Grey",
  "Upgrade",
  "Hardcore Henry",
  "The Colony",
  "The Belko Experiment",
  "The Rover",
  "Children of Men",
];

const getSpecialMovies = async () => {
  try {
    isLoading.value = true;
    const movieRequests = movieTitles.map(async (title) => {
      const response = await axios.get(API_URL, {
        params: {
          api_key: API_KEY,
          query: title,
          language: "en-US",
        },
      });

      return response.data.results[0];
    });

    const movies = await Promise.all(movieRequests);
    botMovies.value = _compact(movies);
  } catch (error: any) {
    console.error("Hata:", error.message);
  } finally {
    isLoading.value = false;
  }
};

const handleSubmit = async () => {
  const { valid } = await formApikey.value?.validate();

  if (!valid) return;

  if (models.value.api_key == _store.apiKey) {
    isWrongPassw.value = false;
    models.value.api_key = null;
    _store.setSpecialUser();
  } else {
    isWrongPassw.value = true;
  }
};

const goToMovie = (item: any) => {
  router.push({
    path: `/movies/${item.id}`,
    query: {
      movie: JSON.stringify(item),
    },
  });
};

onMounted(()=>{
    getSpecialMovies();
})
</script>
<style scoped>
.form-pop-cent {
  height: 85vh !important;
}
.form-container-dark {
  background-image: linear-gradient(to top, #30cfd0 0%, #330867 100%) !important;
}
.form-container-light {
  background-image: linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%) !important;
}
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
