<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';

const router = useRouter()
const route = useRoute()

const goBack = () => {
  router.go(-1);
}

</script>

<template>
  <div class="container mt-3 d-flex flex-column">
    <div class="fs-2 text-center"><i class="bi bi-emoji-tear"> </i> Ooops! Unknown Route.</div>
    <span class="fs-1 text-center">
      {{ route.fullPath }}
    </span>
    <!-- Add Home Icon Button -->
    <div class="text-center mt-3">
      <button @click="goBack" class="btn btn-primary">
        <i class="bi bi-arrow-left"></i> Go Back
      </button>
    </div>
  </div>
</template>
