<script setup lang="ts">
import { reactive, ref, watch } from 'vue'
import apiCall from '@/scripts/api-call'
import InlineTextarea from '@/components/InlineTextarea.vue';
import { notifySuccess } from '@/scripts/store-popups';
import SagaHistoryModal from './SagaHistoryModal.vue';
import { isWriter } from '@/scripts/session'

const AUTH_MENU = '/main/saga'

const props = defineProps<{
  execution: any
}>()

const refSagaHistoryModal = ref()
const showHistoryModal = (item: any) => {
  if (refSagaHistoryModal.value) {
    refSagaHistoryModal.value.show(item)
  }
}

const requestBody = ref('')

const startSaga = async () => {
  const url = `/api/saga/execute/${props.execution.sagaId}`
  const response = await apiCall.post(url, null, JSON.parse(requestBody.value))
  if (response.result === apiCall.Response.SUCCESS) {
    notifySuccess(`[${props.execution.sagaId}] 트랜잭션이 완료되었습니다.`)
  }
}

const isValidJson = () => {
  if (requestBody.value) {
    try {
      JSON.parse(requestBody.value);
      return true;
    } catch (e) {
      return false;
    }
  } else {
    return false
  }
}

const table = reactive({
  headers: [
    { label: "SAGA시작시간", value: "sagaTime" },
    { label: "API명", value: "apiName" },
    { label: "API URL", value: "apiUrl" },
    { label: "API시작시간", value: "startTime" },
    { label: "API종료시간", value: "endTime" },
    { label: "API응답", value: "result" }
  ],
  items: [] as any,
})

const page = reactive({
  total: 0,
  current: 1,
  count: 10,
})

const getSagaHistory = async () => {
  table.items.length = 0

  const url = '/api/saga/history/list'
  const queryParams = {
    sagaId: props.execution.sagaId,
    offset: page.current - 1,
    count: page.count
  }
  const { body: pagedList } = await apiCall.get(url, null, queryParams)
  if (pagedList) {
    page.total = pagedList.total
    page.current = pagedList.offset + 1
    table.items = pagedList.list
  }
}

const cache = ref('')
const getRedisKey = async () => {
  cache.value = ''
  const url = '/api/redis/value'
  const queryParams = {
    key: `Saga-Transaction:${props.execution.sagaId}`
  }
  const response = await apiCall.get(url, null, queryParams)
  if (response.result === apiCall.Response.SUCCESS) {
    if (response.body) {
      cache.value = JSON.stringify(response.body, null, 2)
    }
  }
}


watch(() => page.current, () => {
  getSagaHistory()
})

watch(() => page.count, () => {
  page.current = 1
  getSagaHistory()
})

</script>

<template>
  <ul class="nav nav-tabs bg-secondary-subtle pt-1 ps-1 pe-1 border-0" id="myTab" role="tablist">
    <li class="nav-item" role="presentation">
      <button class="nav-link active" id="profile-tab" data-bs-toggle="tab" data-bs-target="#saga-history" type="button"
        role="tab">트랜잭션 이력</button>
    </li>
    <li v-if="isWriter(AUTH_MENU)" class="nav-item" role="presentation">
      <button class="nav-link" id="home-tab" data-bs-toggle="tab" data-bs-target="#saga-execution" type="button"
        role="tab">트랜잭션 실행</button>
    </li>
    <li class="nav-item" role="presentation">
      <button class="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#saga-cache" type="button"
        role="tab">Redis 캐시</button>
    </li>
  </ul>
  <div class="tab-content bg-secondary-subtle pb-1 ps-1 pe-1" id="tab-content">
    <div class="tab-pane bg-white border border-start border-end fade active show" id="saga-history" role="tabpanel"
      tabindex="0">
      <div class="row g-2 align-items-center">
        <div class="col d-flex justify-content-end">
          <button class="btn btn-sm btn-primary m-1" @click="getSagaHistory"
            :disabled="!props.execution.sagaId">조회</button>
        </div>
      </div>
      <ItemsTable class="p-1 pt-0" :headers="table.headers" :items="table.items" :nosetting="true" :small="true"
        @row-selected="showHistoryModal" />
      <PageNavigator :totalCount="page.total" v-model:current="page.current" v-model:count="page.count" />
    </div>
    <div v-if="isWriter(AUTH_MENU)" class="tab-pane bg-white border border-start border-end fade" id="saga-execution"
      role="tabpanel" tabindex="0">
      <div class="row g-2 align-items-center">
        <div class="col d-flex justify-content-end">
          <button class="btn btn-sm btn-primary m-1" @click="startSaga" :disabled="!isValidJson()">실행</button>
        </div>
      </div>
      <InlineTextarea class="p-1 pt-0" v-model="requestBody" rows="6" :warning="!isValidJson()"
        placeholder="JSON Data" />
    </div>
    <div class="tab-pane bg-white border border-start border-end fade" id="saga-cache" role="tabpanel" tabindex="0">
      <div class="row g-2 align-items-center">
        <div class="col d-flex justify-content-end">
          <button class="btn btn-sm btn-primary m-1" @click="getRedisKey"
            :disabled="!props.execution.sagaId">조회</button>
        </div>
      </div>
      <div class="p-1 pt-0 border m-1 mt-0">
        <pre>{{ cache }}</pre>
      </div>
    </div>
    <SagaHistoryModal ref="refSagaHistoryModal" />
  </div>
</template>