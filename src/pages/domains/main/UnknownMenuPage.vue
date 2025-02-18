<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const router = useRouter()
const route = useRoute()
const menu = ref('')

onMounted(() => {
  menu.value = `${route.query.menuName}: ${route.query.path}`
  router.replace({ path: route.fullPath })
})

</script>


<template>
  <div class="container mt-3 d-flex flex-column">
    <div class="fs-2 text-center">메뉴 정보에 오류가 있습니다!</div>
    <span class="fs-1 text-center">
      <i class="bi bi-bug"> </i> {{ menu }}
    </span>
  </div>
</template>