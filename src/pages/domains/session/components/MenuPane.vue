<script setup lang="ts">
import { ref, watch, reactive } from 'vue'
import { ascendArray, setSequence } from '@/scripts/utils'
import apiCall from '@/scripts/api-call'
import MenuSettingPane from './MenuSettingPane.vue';
import { isWriter } from '@/scripts/session';
import { notifyConfirm, notifyError, notifySuccess } from '@/scripts/store-popups';
import { isEmpty } from '@/scripts/validater';
import { getTimestamp } from '@/scripts/time-util';
import TooltipBox from '@/components/TooltipBox.vue';

const AUTH_MENU = '/main/menu'

const table = reactive({
    headers: [
        { label: "순번", value: "no" },
        { label: "시스템ID", value: "systemId" },
        { label: "메뉴ID", value: "menuId" },
        { label: "메뉴명", value: "menuName" },
    ],
    items: [] as any,
})

const page = reactive({
    total: 0,
    current: 1,
    count: 10,
})

const system = reactive({
    codeGroupId: 'system_id',
    defaultOption: { label: '전체시스템', value: '' },
    id: '',
    selected: {} as any
})

const selectSystem = (option: any) => {
    system.selected = option
}

interface MenuSetting {
    systemName: string,
    systemId: string,
    menuName: string,
    menuId: string
}
const menuSetting = ref<MenuSetting>({} as MenuSetting)

const selectSetting = (item: MenuSetting) => {
    menuSetting.value = item
    if (system.selected.value) {
        menuSetting.value.systemName = system.selected.label
        menuSetting.value.systemId = system.selected.value
    }
}

const addSetting = () => {
    selectSetting({
        systemName: '',
        systemId: '',
        menuName: '',
        menuId: ''
    })
}

const keyword = ref('')

const getMenus = async () => {
    table.items.length = 0

    const url = '/api/menus/list'
    const queryParams = {
        systemId: system.id,
        menuName: keyword.value,
        count: page.count,
        offset: page.current - 1
    }
    const { body: pagedList } = await apiCall.get(url, null, queryParams)
    if (pagedList) {
        page.total = pagedList.total
        page.current = pagedList.offset + 1
        table.items = pagedList.list
        table.items.forEach((item: any) => {
            item.backendApiCount = item.backendApiList?.length
        })
        ascendArray(table.items, ['systemName', 'menuId'])
        setSequence(table.items, (page.current - 1) * page.count + 1)
    }
}

const saveSetting = async (item: any) => {
    const url = '/api/menus'
    await apiCall.post(url, null, item)
    getMenus()
}

const deleteSetting = async (item: any) => {
    const url = '/api/menus'
    await apiCall.delete(url, null, item)
    getMenus()
}

watch(() => page.current, () => {
    getMenus()
})

watch(() => page.count, () => {
    page.current = 1
    getMenus()
})

watch(() => system.id, () => {
    if (table.items.length > 0) {
        getMenus()
    }
})

const toggleOn = ref(false)
const setToggle = (toggled: boolean) => {
    toggleOn.value = toggled
}

const downloadTemplate = async () => {
    const url = '/api/menus/excel/template'
    await apiCall.download(url, null, null, `menu-template-${getTimestamp()}`)
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
        notifyConfirm('메뉴를 업로드 할까요?', async (confirmed: boolean) => {
            if (confirmed) {
                const url = '/api/menus/excel/upload'
                const response = await apiCall.upload(url, null, file)
                if (response.result === apiCall.Response.SUCCESS) {
                    notifySuccess('메뉴가 업로드 되었어요.')
                }
            }
        })
    }
}


const downloadExcel = async () => {
    if (isEmpty(system.id)) {
        notifyError('시스템을 선택하세요.')
        return
    }
    const url = `/api/menus/excel/download?systemId=${system.id}`
    await apiCall.download(url, null, null, `menu-download-${getTimestamp()}`)
}

const downloadCsv = async () => {
    const url = '/api/menus/csv/download'
    await apiCall.download(url, null, null, `csv-download-${getTimestamp()}`)
}

</script>

<template>
    <PanelCollapse title="메뉴 관리: 시스템 선택 후 신규" @toggled="setToggle">
        <div v-if="toggleOn" class="row">
            <div class="col">
                <OptionSelectByCode :codeGroupId="system.codeGroupId" :defaultOption="system.defaultOption"
                    v-model="system.id" @optionSelected="selectSystem" />
            </div>
            <div class="col">
                <InlineInput v-model="keyword" placeholder="메뉴명 검색" @inputEnterPressed="getMenus" />
            </div>
            <div class="col-5 d-flex justify-content-end">
                <button class="btn btn-sm btn-primary me-1" @click="getMenus">
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
        <ItemsTable refTable="MenusPane" class="mt-2" :headers="table.headers" :items="table.items"
            @rowSelected="selectSetting" @addClicked="addSetting"
            :noaddition="!(system.selected.value && isWriter(AUTH_MENU))">
            <template #header>
                <MenuSettingPane :setting="menuSetting" :is-new="true" @save="saveSetting" @delete="deleteSetting" />
            </template>
            <template #body="{ item }">
                <MenuSettingPane :setting="item" :is-new="false" @save="saveSetting" @delete="deleteSetting" />
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