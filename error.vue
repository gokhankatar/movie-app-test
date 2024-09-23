<template>
  <div class="wrapper bg-black d-flex justify-center align-center">
    <div class="d-flex flex-column justify-center align-center ga-5">
      <div v-if="error.statusCode === 404" class="text-h3 text-sm-h1 text-center">
        404
      </div>
      <code v-if="error.statusCode === 404" class="text-subtitle-1 text-center"
        >"{{ error.url }}"</code
      >
      <p v-if="error.statusCode === 404" class="text-subtitle-1 text-sm-h3 text-center">
        Page Not Found!
      </p>
      <p class="text-h5 text-sm-h3 text-center text-uppercase" v-else>You look lost.</p>
      <v-btn
        @click="router.replace('/')"
        size="x-large"
        class="btn-return d-none d-sm-flex cursor-pointer text-center transition rounded-xl"
        text="return home"
      />
      <v-btn
        @click="router.replace('/')"
        size="large"
        class="btn-return d-flex d-sm-none cursor-pointer text-center transition rounded-xl"
        text="return home"
      />
    </div>
  </div>
</template>
<script lang="ts" setup>
const error = useError();
const router = useRouter();
</script>
<style scoped>
@import url(/assets/css/main.css);

.wrapper {
  height: 100vh !important;
}
.btn-return {
  text-decoration: none;
  border: 1px solid #fff;
}
.btn-return:hover {
  background-color: red;
  border-color: red;
  color: #fff !important;
}
</style>
