<script setup lang="ts">
import { ref, watch, reactive, onMounted } from 'vue'
import { ascendArray, setSequence } from '@/scripts/utils'
import apiCall from '@/scripts/api-call'
import CodeGroupSetting from './CodeGroupSetting.vue';
import { isWriter } from '@/scripts/session';

const AUTH_MENU = '/main/code'

const table = reactive({
    headers: [
        { label: "순번", value: "no" },
        { label: "코드그룹명", value: "codeGroupName" },
        { label: "코드그룹ID", value: "codeGroupId" }
    ],
    items: [] as any,
})

const page = reactive({
    total: 0,
    current: 1,
    count: 10,
})

interface CodeGroup {
    id: number,
    codeGroupId: string,
    codeGroupName: string,
    codeList: any
}
const codeGroup = ref<CodeGroup>({} as CodeGroup)
const selectSetting = (item: CodeGroup) => {
    codeGroup.value = item
}
const addSetting = () => {
    codeGroup.value = {
        id: 0,
        codeGroupId: '',
        codeGroupName: '',
        codeList: [] as any
    }
}

const keyword = ref('')

const getCodeGroups = async () => {
    table.items.length = 0

    const url = '/api/code-group/list'
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
        ascendArray(table.items, 'codeGroupName')
        setSequence(table.items, (page.current - 1) * page.count + 1)
    }
}

const saveSetting = async (item: CodeGroup) => {
    const url = '/api/code-group'
    await apiCall.post(url, null, item)
    getCodeGroups()
}

const deleteSetting = async (item: CodeGroup) => {
    const url = '/api/code-group'
    await apiCall.delete(url, null, item)
    getCodeGroups()
}

watch(() => page.current, () => {
    getCodeGroups()
})

watch(() => page.count, () => {
    page.current = 1
    getCodeGroups()
})

onMounted(() => {
    // console.log(AUTH_MENU, isWriter(AUTH_MENU), isReader(AUTH_MENU))
})
</script>

<template>
    <PanelCollapse title="공통코드 관리">
        <div class="row">
            <div class="col">
                <InlineInput label="검색어" v-model="keyword" placeholder="코드그룹명" @inputEnterPressed="getCodeGroups" />
            </div>
            <div class="col-2 d-flex justify-content-end">
                <button class="btn btn-sm btn-primary" @click="getCodeGroups">검색</button>
            </div>
        </div>
        <ItemsTable refTable="CodeGroupPane" class="mt-2" :headers="table.headers" :items="table.items"
            :noaddition="!isWriter(AUTH_MENU)" @rowSelected="selectSetting" @addClicked="addSetting">
            <template #header>
                <CodeGroupSetting :setting="codeGroup" @save="saveSetting" @delete="deleteSetting" />
            </template>
            <template #body="{ item }">
                <CodeGroupSetting :setting="item" @save="saveSetting" @delete="deleteSetting" />
            </template>
        </ItemsTable>
        <PageNavigator :totalCount="page.total" v-model:current="page.current" v-model:count="page.count" />
    </PanelCollapse>
</template>