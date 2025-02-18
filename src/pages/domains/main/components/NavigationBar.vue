<script setup lang="ts">
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useUserSession, clearUserSession, hasAuthMenu } from '@/scripts/session';
import apiCall from '@/scripts/api-call';
import UserProfile from './UserProfile.vue';
import SideMenu from './SideMenu.vue';

const router = useRouter()
const route = useRoute()

const userSession = useUserSession()

const active = ref('')
const isActive = (page: string) => {
  return active.value === page ? 'active' : ''
}

const goto = async (page: string) => {
  active.value = page
  const path = `/main/${page}`
  await router.push(path)
  if (path !== route.fullPath) {
    //push again to load dynamic component at the first time
    await router.push(path)
  }
}

const openTab = () => {
  window.open(`http://localhost:5174/sso?userId=${userSession.value?.userId}&sessionId=${userSession.value?.sessionId}`, '_blank');
}

const logout = async () => {
  if (userSession.value) {
    const url = '/api/account/logout'
    await apiCall.post(url, null, userSession.value)
    clearUserSession()
  }
  router.push('/login')
}

const userProfileButton = ref<HTMLButtonElement | null>(null)
const closeUserProfile = () => {
  const element = document.getElementById('userProfile')
  if (element && element.classList.contains('show')) {
    userProfileButton.value?.click()
  }
}

const refSideMenu = ref<any>(null)
const showOffCanvas = () => {
  refSideMenu.value?.show()
}

</script>

<template>
  <SideMenu ref="refSideMenu" />
  <nav class="navbar navbar-expand-lg bg-primary-subtle mt-1">
    <div class="container-fluid">
      <div class="btn btn-light p-0 ps-1 pe-1" @click="showOffCanvas">
        <i class="bi bi-list ms-1 me-1" style="font-size: 1.5em;"></i>
      </div>
      <span class="ps-2 navbar-brand" href="#">BFF BASE POC</span>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li v-if="hasAuthMenu('/main/session')" class="nav-item">
            <a class="nav-link" :class="isActive('session')" href="#" @click="goto('session')">인증/세션/권한</a>
          </li>
          <li v-if="hasAuthMenu('/main/saga')" class="nav-item">
            <a class="nav-link" :class="isActive('saga')" href="#" @click="goto('saga')">분산트랜잭션(KeepAlive비교)</a>
          </li>
          <li v-if="hasAuthMenu('/main/batch')" class="nav-item">
            <a class="nav-link" :class="isActive('batch')" href="#" @click="goto('batch')">배치(Batch)</a>
          </li>
          <li v-if="hasAuthMenu('/sso/oas-portal')" class="nav-item">
            <a class="nav-link" :class="isActive('batch')" href="#" @click="openTab()">OAS포탈(SSO)</a>
          </li>
        </ul>
        <div v-if="userSession" class="d-flex">
          <div class="btn-group">
            <button ref="userProfileButton" type="button" class="btn dropdown-toggle border-0" data-bs-toggle="dropdown"
              data-bs-auto-close="false">
              <i class="bi bi-person-circle"></i>
              <span class="ps-1 pe-1">{{ userSession.userName }} ({{ userSession.userId }})</span>
            </button>
            <UserProfile id="userProfile" class="dropdown-menu dropdown-menu-end" @close="closeUserProfile" />
          </div>
          <button type="button" class="btn p-1">
            <i class="bi bi-box-arrow-right btn m-0 p-0 text-danger" @click="logout"></i>
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>
