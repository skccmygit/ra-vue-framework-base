<script setup lang="ts">
import { ref, watch, reactive } from 'vue'
import { ascendArray } from '@/scripts/utils'
import apiCall from '@/scripts/api-call'

interface UserGroupApi {
  userGroupName: string,
  userGroupId: string,
  apiName: string,
  apiPath: string,
  isSelected: boolean
}

interface Option {
  label: string,
  value: any
}

const selectedUserGroup = ref<Option>({} as Option)
const currentTab = ref()
const allowedApis = ref<UserGroupApi[]>([])
const deniedApis = ref<UserGroupApi[]>([])

const isUserGroupApi = (apiPath: string): boolean => {
  if (currentTab.value === 'allowed') {
    return allowedApis.value?.some((api: UserGroupApi) => api.apiPath === apiPath) ?? false;
  } else {
    return deniedApis.value?.some((api: UserGroupApi) => api.apiPath === apiPath) ?? false;
  }
}

const setUserGroupApi = (userGroupApis: UserGroupApi[], item: any) => {
  const index = userGroupApis.findIndex((api) => api.apiPath === item.apiPath);

  if (item.isSelected && index === -1) {
    const api = {
      userGroupName: selectedUserGroup.value.label,
      userGroupId: selectedUserGroup.value.value,
      apiPath: item.apiPath,
      apiName: item.apiName,
      isSelected: true
    } as UserGroupApi
    userGroupApis.push(api)
  } else if (!item.isSelected && index !== -1) {
    userGroupApis.splice(index, 1)
  }
}


const userGroupApiButton = ref<HTMLButtonElement | null>(null)

const show = async (userGroup: Option, tab: string, alloweds: UserGroupApi[], denieds: UserGroupApi[]) => {
  selectedUserGroup.value = userGroup
  currentTab.value = tab
  allowedApis.value = alloweds
  deniedApis.value = denieds
  const element = document.getElementById('userGroupApi')
  if (element && !element.classList.contains('show')) {
    getApis()
    userGroupApiButton.value?.click()
  }
}

const table = reactive({
  headers: [
    { label: "API경로", value: "apiPath" },
    { label: "API명", value: "apiName" },
    { label: "선택", value: "isSelected" },
  ],
  items: [] as any,
})

const page = reactive({
  total: 0,
  current: 1,
  count: 10,
})
const keyword = ref('')

const getApis = async () => {
  table.items.length = 0

  const url = '/api/apis/list'
  const queryParams = {
    keyword: keyword.value,
    count: page.count,
    offset: page.current - 1
  }
  const { body: pagedList } = await apiCall.get(url, null, queryParams)
  if (pagedList) {
    page.total = pagedList.total
    page.current = pagedList.offset + 1
    table.items = pagedList.list
    table.items.forEach((item: any) => {
      item.isSelected = isUserGroupApi(item.apiPath)
    })
    ascendArray(table.items, 'apiPath')
  }
}

watch(() => page.current, () => {
  getApis()
})

watch(() => page.count, () => {
  page.current = 1
  getApis()
})

const selectApi = (item: any) => {
  item.isSelected = !item.isSelected
}

const saveApis = () => {
  if (currentTab.value === 'allowed') {
    table.items.forEach((item: any) => {
      setUserGroupApi(allowedApis.value, item)
    })
  } else {
    table.items.forEach((item: any) => {
      setUserGroupApi(deniedApis.value, item)
    })
  }
}

defineExpose({
  show
})
</script>

<template>
  <button v-show="false" ref="userGroupApiButton" type="button" class="btn btn-primary" data-bs-toggle="modal"
    data-bs-target="#userGroupApi">
    Launch modal
  </button>
  <div class="modal fade" id="userGroupApi" tabindex="-1" data-bs-backdrop="static" data-bs-keyboard="false">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div v-if="currentTab === 'allowed'" class="modal-header bg-success-subtle">
          <h1 class="modal-title fs-5" id="userGroupApiLabel">허용API 선택</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div v-else class="modal-header bg-dark-subtle">
          <h1 class="modal-title fs-5" id="userGroupApiLabel">차단API 선택</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body row">
          <div class="row pe-0">
            <div class="col ps-2">
              <InlineInput v-model="keyword" placeholder="API명 검색" @inputEnterPressed="getApis" />
            </div>
            <div class="col-5 d-flex justify-content-end pe-0">
              <button class="btn btn-sm btn-primary" @click="getApis">
                검색
              </button>
            </div>
          </div>
          <ItemsTable refTable="ApiPane" class="mt-1 p-2" :headers="table.headers" :items="table.items"
            @rowSelected="selectApi" :noaddition="true" :nosetting="true" />
          <PageNavigator :totalCount="page.total" v-model:current="page.current" v-model:count="page.count" />
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary btn-sm" data-bs-dismiss="modal" @click="saveApis">저장</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>