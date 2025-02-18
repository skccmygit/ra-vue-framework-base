<script setup lang="ts">
import { ref, watch, reactive } from 'vue'
import { ascendArray, setSequence } from '@/scripts/utils'
import apiCall from '@/scripts/api-call'
import UserSettingPane from './UserSettingPane.vue';

const table = reactive({
    headers: [
        { label: "순번", value: "no" },
        { label: "사용자ID", value: "userId" },
        { label: "사용자명", value: "userName" },
        { label: "사용자그룹ID", value: "userGroupId" },
    ],
    items: [] as any,
})

const page = reactive({
    total: 0,
    current: 1,
    count: 10,
})

interface UserSetting {
    userId: string,
    userName: string,
    userEmail: string,
    userPhone: string,
    userGroupId: string
}
const userSetting = ref<UserSetting>({} as UserSetting)
const selectSetting = (item: UserSetting) => {
    userSetting.value = item
}

const keyword = ref('')

const getUsers = async () => {
    table.items.length = 0

    const url = '/api/users/list'
    const queryParams = {
        userName: keyword.value,
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
        ascendArray(table.items, 'userId')
        setSequence(table.items, (page.current - 1) * page.count + 1)
    }
}

const saveSetting = async (item: UserSetting) => {
    const url = '/api/account/user-group'
    await apiCall.put(url, null, item)
    getUsers()
}

const deleteSetting = async (item: UserSetting) => {
    const url = '/api/users'
    await apiCall.delete(url, null, item)
    getUsers()
}

watch(() => page.current, () => {
    getUsers()
})

watch(() => page.count, () => {
    page.current = 1
    getUsers()
})

</script>

<template>
    <PanelCollapse title="사용자 관리: 마스킹O">
        <div class="row">
            <div class="col">
                <InlineInput label="검색어" v-model="keyword" placeholder="사용자명" @inputEnterPressed="getUsers" />
            </div>
            <div class="col-3 d-flex justify-content-end">
                <button class="btn btn-sm btn-primary me-1" @click="getUsers">검색</button>
            </div>
        </div>
        <ItemsTable refTable="UserPane" class="mt-2" :headers="table.headers" :items="table.items"
            @rowSelected="selectSetting" :noaddition="true">
            <template #body="{ item }">
                <UserSettingPane :setting="item" @save="saveSetting" @delete="deleteSetting" />
            </template>
        </ItemsTable>
        <PageNavigator :totalCount="page.total" v-model:current="page.current" v-model:count="page.count" />
    </PanelCollapse>
</template>