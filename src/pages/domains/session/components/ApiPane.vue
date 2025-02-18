<script setup lang="ts">
import { ref, watch, reactive } from 'vue'
import { ascendArray } from '@/scripts/utils'
import apiCall from '@/scripts/api-call'
import ApiSettingPane from './ApiSettingPane.vue';
import { isWriter } from '@/scripts/session';
import { notifyConfirm, notifySuccess } from '@/scripts/store-popups';
import { getTimestamp } from '@/scripts/time-util';
import TooltipBox from '@/components/TooltipBox.vue';

const AUTH_MENU = '/main/api'

const table = reactive({
    headers: [
        { label: "API경로", value: "apiPath" },
        { label: "API명", value: "apiName" },
        { label: "ID", value: "id" },
        { label: "등록자", value: "idInsert" },
        { label: "등록시간", value: "dtInsert" },
    ],
    items: [] as any,
})

const page = reactive({
    total: 0,
    current: 1,
    count: 10,
})

interface ApiSetting {
    id: number,
    apiPath: string,
    apiName: string,
    idInsert: string,
    dtInsert: string,
    idUpdate: string,
    dtUpdate: string
}
const apiSetting = ref<ApiSetting>({} as ApiSetting)

const selectSetting = (item: ApiSetting) => {
    apiSetting.value = item
}

const addSetting = () => {
    selectSetting({
        id: 0,
        apiPath: '',
        apiName: '',
        idInsert: '',
        dtInsert: '',
        idUpdate: '',
        dtUpdate: ''
    })
}

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
        ascendArray(table.items, 'apiPath')
    }
}

const saveSetting = async (item: any) => {
    const url = '/api/apis'
    await apiCall.post(url, null, item)
    getApis()
}

const deleteSetting = async (item: any) => {
    const url = '/api/apis'
    await apiCall.delete(url, null, item)
    getApis()
}

watch(() => page.current, () => {
    getApis()
})

watch(() => page.count, () => {
    page.current = 1
    getApis()
})

const toggleOn = ref(false)
const setToggle = (toggled: boolean) => {
    toggleOn.value = toggled
}

const downloadTemplate = async () => {
    const url = '/api/apis/excel/template'
    await apiCall.download(url, null, null, `api-template-${getTimestamp()}`)
}

const fileInput = ref<HTMLInputElement | null>(null)

const openBrowser = () => {
    if (fileInput.value) {
        fileInput.value.value = ''
        fileInput.value.click()
    }
}

const selectFile = async () => {
    const file = fileInput.value?.files?.[0]
    if (file) {
        notifyConfirm('API 목록을 업로드 할까요?', async (confirmed: boolean) => {
            if (confirmed) {
                const url = '/api/apis/excel/upload'
                const response = await apiCall.upload(url, null, file)
                if (response.result === apiCall.Response.SUCCESS) {
                    notifySuccess('목록이 업로드 되었어요.')
                }
            }
        })
    }
}


const downloadExcel = async () => {
    const url = `/api/apis/excel/download?keyword=${keyword.value}`
    await apiCall.download(url, null, null, `api-download-${getTimestamp()}`)
}

const downloadCsv = async () => {
    const url = `/api/apis/csv/download?keyword=${keyword.value}`
    await apiCall.download(url, null, null, `csv-download-${getTimestamp()}`)
}

</script>

<template>
    <PanelCollapse title="API 관리" @toggled="setToggle">
        <div v-if="toggleOn" class="row">
            <div class="col">
                <InlineInput v-model="keyword" placeholder="API명 검색" @inputEnterPressed="getApis" />
            </div>
            <div class="col-5 d-flex justify-content-end">
                <button class="btn btn-sm btn-primary me-1" @click="getApis">
                    검색
                </button>
                <template v-if="isWriter(AUTH_MENU)">
                    <TooltipBox tips="템플릿 받기" :no-icon="true">
                        <button class="btn btn-sm btn-outline-primary p-0 me-1" @click="downloadTemplate">
                            <i class="bi bi-file-earmark-arrow-down file-icon"></i>
                        </button>
                    </TooltipBox>
                    <TooltipBox tips="엑셀 올리기" :no-icon="true">
                        <input v-show="false" type="file" ref="fileInput" accept=".xlsx" @change="selectFile"
                            multiple="false" />
                        <button class="btn btn-sm btn-outline-primary p-0 me-1" @click="openBrowser">
                            <i class="bi bi-file-earmark-arrow-up  file-icon"></i>
                        </button>
                    </TooltipBox>
                    <TooltipBox tips="엑셀 받기" :no-icon="true">
                        <button class="btn btn-sm btn-outline-primary p-0 me-1" @click="downloadExcel">
                            <i class="bi bi-filetype-xlsx file-icon"></i>
                        </button>
                    </TooltipBox>
                    <TooltipBox tips="CSV 받기" :no-icon="true">
                        <button class="btn btn-sm btn-outline-primary p-0" @click="downloadCsv">
                            <i class="bi bi-filetype-csv file-icon"></i>
                        </button>
                    </TooltipBox>
                </template>
            </div>
        </div>
        <ItemsTable refTable="ApiPane" class="mt-2" :headers="table.headers" :items="table.items"
            @rowSelected="selectSetting" @addClicked="addSetting" :noaddition="!isWriter(AUTH_MENU)">
            <template #header>
                <ApiSettingPane :setting="apiSetting" @save="saveSetting" @delete="deleteSetting" />
            </template>
            <template #body="{ item }">
                <ApiSettingPane :setting="item" @save="saveSetting" @delete="deleteSetting" />
            </template>
        </ItemsTable>
        <PageNavigator :totalCount="page.total" v-model:current="page.current" v-model:count="page.count" />
    </PanelCollapse>
</template>

<style scoped>
.file-icon {
    font-size: 1.5rem;
    color: black;
}
</style>