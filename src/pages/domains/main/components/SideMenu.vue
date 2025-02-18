<script setup lang="ts">
import { ref } from 'vue';
import SideMenuItem from './SideMenuItem.vue';
import { useAuthMenuGroups } from '@/scripts/store-menus'

const authMenuGroups = useAuthMenuGroups()

const offcanvasButton = ref<HTMLButtonElement | null>(null)

const show = async () => {
  const element = document.getElementById('sideMenuOffcanvas')
  if (element && !element.classList.contains('show')) {
    offcanvasButton.value?.click()
  }
}

const hide = async () => {
  const element = document.getElementById('sideMenuOffcanvas')
  if (element && element.classList.contains('show')) {
    offcanvasButton.value?.click()
  }
}

defineExpose({
  show, hide
})
</script>

<template>
  <button v-show="false" ref="offcanvasButton" class="btn btn-primary" type="button" data-bs-toggle="offcanvas"
    data-bs-target="#sideMenuOffcanvas"></button>
  <div class="offcanvas offcanvas-start" data-bs-backdrop="static" tabindex="-1" id="sideMenuOffcanvas"
    style="width: 320px;">
    <div class="offcanvas-header bg-dark-subtle">
      <h5 class="offcanvas-title" id="sideMenuOffcanvasLabel">BFF BASE POC</h5>
      <button type="button" class="btn-close" data-bs-dismiss="offcanvas"></button>
    </div>
    <div class="offcanvas-body">
      <div>
        <div class="accordion accordion-flush" id="sideMenuBar">
          <SideMenuItem v-for="(menuGroup, index) in authMenuGroups" :key="index" :menu-group="menuGroup"
            :close-side="hide" />
        </div>
      </div>
    </div>
  </div>
</template>
