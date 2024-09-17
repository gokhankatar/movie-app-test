<script lang="ts" setup>
import { ref, onMounted } from "vue";
import store from "./store/store";

const _store = store();
const isLoading = ref(true);

onMounted(() => {
  isLoading.value = false;
});
</script>

<template>
  <v-app :theme="_store.theme">
    <v-main>
      <v-container class="pa-5 pa-sm-8 pa-md-10 pa-lg-12 pa-xl-15">
        <Loading v-if="isLoading" />
        <NuxtLayout v-if="!isLoading">
          <NuxtPage />
        </NuxtLayout>
      </v-container>
    </v-main>
  </v-app>
</template>
