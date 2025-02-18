<script setup lang="ts">
import { onMounted } from 'vue';
import { clearUserSession } from '@/scripts/session';
import { useRouter } from 'vue-router';

const router = useRouter()

onMounted(clearUserSession)

const gotoMain = () => {
  router.push('/login')
}
</script>


<template>
  <div class="container-sm mt-3 d-flex flex-column" style="max-width: 640px">
    <div class="fs-2 text-center">세션 만료로 로그아웃 되었습니다!</div>
    <div class="fs-1 text-center"><i class="bi bi-power btn btn-primary" @click="gotoMain"></i></div>
  </div>
</template>