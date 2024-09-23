<template>
  <!-- loading bar -->
  <v-progress-circular
    class="loadingBar"
    :size="90"
    :width="9"
    color="deep-orange"
    indeterminate
  ></v-progress-circular>
</template>

<style scoped>
.loadingBar {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
