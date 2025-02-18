<script setup lang="ts">
import { toRaw, ref, reactive } from 'vue'
import { isAdmin } from '@/scripts/session'
import apiCall from '@/scripts/api-call'
import { ascendArray } from '@/scripts/utils'
import { notifyConfirm } from '@/scripts/store-popups';

const BFF_SESSION_REDIS = 'Bff-Session:'
const AUTH_MENU = '/main/session'

const table = reactive({
  headers: [
    { label: "세션ID", value: "sessionId" },
    { label: "사용자ID", value: "userId" },
    { label: "사용자명", value: "userName" },
    { label: "TTL(초)", value: "timeout" }
  ],
  items: [] as any,
})
const getSessions = async () => {
  table.items.length = 0
  const url = `/api/redis/list?prefix=${BFF_SESSION_REDIS}`
  const { body: pagedList } = await apiCall.get(url, null, null)
  if (pagedList) {
    pagedList.list.forEach((item: any) => {
      item.value.timeout = item.timeout
      table.items.push(item.value)
    })
    ascendArray(table.items, '')
  }
}

const sessionDetailString = ref('')
const selectSession = async (item: any) => {
  sessionDetailString.value = JSON.stringify(toRaw(item), null, 2)
}

const deleteSession = async (item: any) => {
  notifyConfirm('사용자 세션을 삭제 하시겠습니까?', async (confirmed: boolean) => {
    if (confirmed) {
      const url = '/api/redis/delete'
      const requestBody = {
        key: BFF_SESSION_REDIS + item.sessionId
      }
      await apiCall.delete(url, null, requestBody)
      getSessions()
    }
  })

}
</script>

<template>
  <PanelCollapse title="세션 현황: 마스킹O">
    <div class="row">
      <div class="col">
      </div>
      <div class="col-2 d-flex justify-content-end">
        <button class="btn btn-sm btn-primary" @click="getSessions">검색</button>
      </div>
    </div>
    <ItemsTable refTable="SessionStatus" class="mt-2" :headers="table.headers" :items="table.items" :noaddition="true"
      @rowSelected="selectSession" @rowSetting="selectSession">
      <template #body="{ item }">
        <div style="max-height: 360px; overflow-x: auto; overflow-y: auto">
          <pre class="border mt-1 mb-1 p-1 rounded bg-secondary-subtle">{{ sessionDetailString }}</pre>
        </div>
        <div v-if="isAdmin(AUTH_MENU)" class="d-flex justify-content-end mt-1">
          <button class="btn btn-sm btn-danger me-2" @click="deleteSession(item)">
            <i class="p-0 bi bi-x-circle"></i>
          </button>
        </div>
      </template>
    </ItemsTable>
  </PanelCollapse>
</template>