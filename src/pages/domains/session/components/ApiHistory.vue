<script setup lang="ts">
import { ref, reactive, watch } from 'vue'
import apiCall from '@/scripts/api-call'

const keyword = ref('')
const logType = reactive({
  options: [
    { label: 'API명', value: 'path', keyword: 'API명' },
    { label: '요청파라미터', value: 'request', keyword: '파라미터 속성/값' },
    { label: '응답결과', value: 'result', keyword: 'API명' },
    { label: '응답시간', value: 'time', keyword: '값(초) 이상' },
  ],
  selected: { label: 'API명', value: 'path', keyword: 'API명' },
  value: 'path'
})

const selectLogtype = (option: any) => {
  logType.selected.label = option.label
  logType.selected.value = option.value
  logType.selected.keyword = option.keyword
  keyword.value = ''
}

const resultType = reactive({
  options: [
    { label: '성공', value: 'SUCCESS' },
    { label: '실패', value: 'FAIL' },
  ],
  value: 'SUCCESS'
})

const table = reactive({
  headers: [
    { label: "요청시간", value: "requestTime" },
    { label: "요청IP", value: "clientAddress" },
    { label: "사용자ID", value: "bffUserId" },
    { label: "메소드", value: "apiMethod" },
    { label: "응답결과", value: "apiResult" },
    { label: "API명(경로)", value: "apiPath" },
    { label: "요청파라미터", value: "requestParams" },
    { label: "요청바디", value: "requestBody" },
    { label: "응답데이터", value: "responseBody" },
    { label: "처리시간", value: "elapsedTimeSeconds" },
  ],
  items: [] as any,
})
const getHistory = async () => {
  table.items.length = 0
  const url = `/api/logs/${logType.value}`
  const queryParams = {
    keyword: keyword.value,
    seconds: logType.value === 'time' ? Number(keyword.value) : 0,
    result: logType.value === 'result' ? resultType.value : '',
    count: page.count,
    offset: page.current - 1
  }
  const { body: pagedList } = await apiCall.get(url, null, queryParams)
  if (pagedList) {
    page.total = pagedList.total
    page.current = pagedList.offset + 1
    table.items = pagedList.list
    table.items.forEach((item: any) => {
      item.elapsedTimeSeconds = item.elapsedTime / 1000
    })
  }
}

const beutifyJson = (text: string) => {
  const json = JSON.parse(text)
  return JSON.stringify(json, null, 2)
}


const page = reactive({
  total: 0,
  current: 1,
  count: 10,
})

watch(() => page.current, () => {
  getHistory()
})

watch(() => page.count, () => {
  page.current = 1
  getHistory()
})
</script>

<template>
  <PanelCollapse title="API이력 조회: @SkipLogging">
    <div class="row">
      <div class="col-2">
        <OptionSelect class="mb-1" :options="logType.options" v-model="logType.value" @optionSelected="selectLogtype" />
      </div>
      <div v-if="logType.value === 'result'" class="col-2">
        <OptionSelect class="mb-1" :options="resultType.options" v-model="resultType.value" />
      </div>
      <div class="col-2">
        <InlineInput v-model="keyword" :placeholder="logType.selected.keyword" @inputEnterPressed="getHistory" />
      </div>
      <div class="col d-flex justify-content-end">
        <button class="btn btn-sm btn-primary" @click="getHistory">검색</button>
      </div>
    </div>
    <ItemsTable refTable="SessionStatus" class="mt-2" :headers="table.headers" :items="table.items" :noaddition="true">
      <template #body="{ item }">
        <div style="max-height: 360px; overflow-x: auto; overflow-y: auto">
          <pre v-if="item.apiMethod === 'GET'"
            class="border mt-1 mb-1 p-1 rounded bg-secondary-subtle">requestParams: {{ item.requestParams }}</pre>
          <pre v-else
            class="border mt-1 mb-1 p-1 rounded bg-secondary-subtle">requestBody: {{ beutifyJson(item.requestBody) }}</pre>
          <pre
            class="border mt-1 mb-1 p-1 rounded bg-secondary-subtle">responseBody: {{ beutifyJson(item.responseBody) }}</pre>
        </div>
      </template>
    </ItemsTable>
    <PageNavigator :totalCount="page.total" v-model:current="page.current" v-model:count="page.count" />
  </PanelCollapse>
</template>