<script lang="ts" setup>
import store from "./store/store";

const _store = store();
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
