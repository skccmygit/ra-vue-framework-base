<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'
import { useUserSession } from '@/scripts/session';
import { setCalledByMenu } from '@/scripts/store-cache';

const props = defineProps<{
  menuGroup: any
  closeSide: Function,
  singleOpener?: string,
}>();

const elementId = crypto.randomUUID()

const UNKNOWN_PATH = '/unknown'

const router = useRouter()
const route = useRoute()

const userSession = useUserSession()

const openMenu = async (menu: any) => {
  if (menu.url) {
    window.open(`${menu.url}?userId=${userSession.value?.userId}&sessionId=${userSession.value?.sessionId}`, '_blank');
    return;
  }

  if (menu.component) {
    setCalledByMenu(menu)
    await router.push(menu.path)
    if (menu.path !== route.fullPath) {
      await router.push(menu.path)
    }
  } else {
    router.push(`${UNKNOWN_PATH}?menuName=${menu.menuName}&path=${menu.path}`)
  }

  if (props.closeSide) {
    props.closeSide()
  }
}
</script>

<template>
  <div class="accordion-item">
    <h2 class="accordion-header">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
        :data-bs-target="'#' + elementId">
        {{ props.menuGroup.groupName }}
      </button>
    </h2>
    <div :id="elementId" class="accordion-collapse collapse"
      :data-bs-parent="props.singleOpener ? '#' + props.singleOpener : null">
      <div class="accordion-body">
        <div class="list-group list-group-flush">
          <template v-for="(menu, index) in props.menuGroup.menuList" :key="index">
            <a v-if="!menu.hidden" href="#" class="list-group-item list-group-item-action" @click="openMenu(menu)">
              {{ menu.menuName }}
            </a>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>
