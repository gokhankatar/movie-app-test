<script lang="ts" setup>
import { ref, onMounted } from "vue";
import store from "./store/store";
import seoImg from "~/assets/img/seoImg.png";

const _store = store();
const isLoading = ref(true);

useSeoMeta({
  title: "GKMovies - A web based movie application with Gksoftware software.",
  ogTitle: "A web based movie application with Gksoftware software.",
  description:
    "Gkmovies is one of the GKSoftware web applications that contains movies. You can access more than 10,000 movies with the movie search engine using the TMDB API.",
  ogDescription:
    "Gkmovies is one of the GKSoftware web applications that contains movies. You can access more than 10,000 movies with the movie search engine using the TMDB API.",
  ogImage: seoImg,
  twitterCard: seoImg,
  twitterImage: seoImg,
});

onMounted(() => {
  isLoading.value = false;
});
</script>

<template>
  <v-app :theme="_store.theme">
    <v-main>
      <v-container class="pa-5 pa-sm-8 pa-md-10 pa-lg-12 pa-xl-15">
        <NuxtLayout>
          <NuxtPage />
        </NuxtLayout>
      </v-container>
    </v-main>
  </v-app>
</template>
