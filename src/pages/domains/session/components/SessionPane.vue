<script setup lang="ts">
import { toRaw, watch, ref, onMounted } from 'vue'
import { useUserSession, hasAuthMenu } from '@/scripts/session'
import apiCall from '@/scripts/api-call'
import SessionStatus from './SessionStatus.vue';

const BFF_SESSION_REDIS = 'Bff-Session:'

const userSession = useUserSession()
const sessionString = ref('')

watch(userSession, (value) => {
  if (value) {
    sessionString.value = JSON.stringify(toRaw(userSession.value), null, 2)
  }
})

onMounted(() => {
  sessionString.value = JSON.stringify(toRaw(userSession.value), null, 2)
})

const refreshSession = async () => {
  const url = `/api/redis/value?key=${BFF_SESSION_REDIS}${userSession.value?.sessionId}`
  const { body } = await apiCall.get(url, null, null)
  if (body.value) {
    sessionString.value = JSON.stringify(toRaw(userSession.value), null, 2)
    sessionString.value += ', 세션 TTL=' + body.timeout + '초'
  }
}
</script>

<template>
  <div class="row border p-1">
    <div class="col">
      <h6 class="fw-bold m-2">Login Session : </h6>
    </div>
    <div class="col-2 d-flex justify-content-end mt-1">
      <button class="btn btn-primary btn-sm" @click="refreshSession">
        갱신
        <i class="bi bi-arrow-counterclockwise"></i>
      </button>
    </div>
    <div class="mt-1" style="max-height: 360px; overflow-x: auto; overflow-y: auto">
      <pre class="border mt-1 p-1 rounded bg-secondary-subtle">{{ sessionString }}</pre>
    </div>
  </div>
  <SessionStatus v-if="hasAuthMenu('/main/session')" />
</template>