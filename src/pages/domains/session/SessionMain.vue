<script setup lang="ts">
import { onMounted } from 'vue'
import UserPane from './components/UserPane.vue';
import MenuPane from './components/MenuPane.vue';
import ApiPane from './components/ApiPane.vue';
import UserGroupApi from './components/UserGroupApi.vue'
import CodeGroupPane from './components/CodeGroupPane.vue'
import UserGroupMenu from './components/UserGroupMenu.vue'
import { useUserSession, hasAuthMenu } from '@/scripts/session'
import ApiHistory from './components/ApiHistory.vue';
import SessionStatus from './components/SessionStatus.vue';
import { useRouter } from 'vue-router';

const router = useRouter()

const userSession = useUserSession()

onMounted(() => {
  if (!userSession.value) {
    router.push('/login')
  }
})
</script>

<template>
  <div class="container-fluid">
    <div class="row mt-1 border-0 border-start ">
      <div class="col">
        <MenuPane v-if="hasAuthMenu('/main/menu')" class="bg-warning-subtle" />
        <UserGroupMenu v-if="hasAuthMenu('/main/user')" class="bg-warning-subtle" />
        <ApiPane v-if="hasAuthMenu('/main/api')" class="bg-success-subtle" />
        <UserGroupApi v-if="hasAuthMenu('/main/api')" class="bg-success-subtle" />
      </div>
      <div class="col border-start">
        <CodeGroupPane v-if="hasAuthMenu('/main/code')" class="bg-warning-subtle" />
        <UserPane v-if="hasAuthMenu('/main/user')" class="bg-warning-subtle" />
        <SessionStatus v-if="hasAuthMenu('/main/session')" class="bg-body-tertiary" />
      </div>
    </div>
    <div class="row border-0 border-start">
      <div class="col">
        <ApiHistory v-if="hasAuthMenu('/main/api-log')" class="bg-body-tertiary" />
      </div>
    </div>
  </div>

</template>