<script setup lang="ts">
import { ref, watch, reactive } from 'vue'
import { ascendArray } from '@/scripts/utils'
import apiCall from '@/scripts/api-call'
import { isAnyEmpty, isEmpty } from '@/scripts/validater'
import { isWriter } from '@/scripts/session'
import UserGroupApiModal from './UserGroupApiModal.vue'

const AUTH_MENU = '/main/api'

const table = reactive({
    headers: [
        { label: "사용자그룹ID", value: "userGroupId" },
        { label: "API경로", value: "apiPath" },
        { label: "API명", value: "apiName" },
        { label: "선택", value: "isSelected" },
    ],
    allowedApiList: [] as any,
    deniedApiList: [] as any,
})

const currentTab = ref('allowed')
const setCurrentTab = (tab: string) => {
    currentTab.value = tab
}

const userGroup = reactive({
    codeGroupId: 'user_auth_group',
    defaultOption: { label: '사용자그룹 선택', value: '' },
    id: '',
    selected: {} as any
})
const selectUserGroup = (option: any) => {
    userGroup.selected = option
}

const hasSearched = ref(false)

const getUserGroupApis = async () => {
    table.allowedApiList.length = 0
    table.deniedApiList.length = 0
    const url = '/api/user-group-apis'
    const queryParams = {
        userGroupId: userGroup.id,
    }
    const { body } = await apiCall.get(url, null, queryParams)
    if (body) {
        table.allowedApiList = body.allowedApiList || []
        table.allowedApiList.forEach((item: any) => {
            item.userGroupName = userGroup.selected.label
            item.userGroupId = userGroup.selected.value
            item.isSelected = true
        })
        ascendArray(table.allowedApiList, 'apiPath')

        table.deniedApiList = body.deniedApiList || []
        table.deniedApiList.forEach((item: any) => {
            item.userGroupName = userGroup.selected.label
            item.userGroupId = userGroup.selected.value
            item.isSelected = true
        })
        ascendArray(table.deniedApiList, 'apiPath')
    }
    hasSearched.value = true
}

const userGroupApiModal = ref()
const showApiModal = () => {
    if (userGroupApiModal.value) {
        userGroupApiModal.value.show(userGroup.selected, currentTab.value, table.allowedApiList, table.deniedApiList)
    }
}

const selectApi = (item: any) => {
    item.isSelected = !item.isSelected
}

const saveUserGroupApi = async () => {
    const url = '/api/user-group-apis'
    const requestBody = {
        id: 0,
        userGroupName: userGroup.selected.label,
        userGroupId: userGroup.selected.value,
        allowedApiList: table.allowedApiList.filter((api: any) => api.isSelected),
        deniedApiList: table.deniedApiList.filter((api: any) => api.isSelected)
    }
    await apiCall.post(url, null, requestBody)
    getUserGroupApis()
}

const toggleOn = ref(false)
const setToggle = (toggled: boolean) => {
    toggleOn.value = toggled
}

watch(() => userGroup.id, (value: string) => {
    if (!isEmpty(value)) {
        getUserGroupApis()
    }
})
</script>

<template>
    <PanelCollapse title="사용자그룹 API 관리" @toggled="setToggle">
        <div v-if="toggleOn" class="row">
            <div class="col-4">
                <OptionSelectByCode :codeGroupId="userGroup.codeGroupId" v-model="userGroup.id"
                    :defaultOption="userGroup.defaultOption" @optionSelected="selectUserGroup" :withValue="true" />
            </div>
            <div class="col d-flex justify-content-end">
                <button class="btn btn-sm btn-primary" @click="getUserGroupApis" :disabled="isAnyEmpty(userGroup.id)">
                    검색</button>
            </div>
        </div>
        <div class="mt-1">
            <div class="row">
                <div class="col">
                    <ul class="nav nav-tabs p-1 pb-0 mb-0 border-0" id="myTab" role="tablist">
                        <li class="nav-item bg-secondary-subtle " role="presentation">
                            <button class="nav-link active p-2" data-bs-toggle="tab" data-bs-target="#apis-allowed"
                                type="button" role="tab" @click="setCurrentTab('allowed')">허용API 목록</button>
                        </li>
                        <li class="nav-item bg-secondary-subtle" role="presentation">
                            <button class="nav-link p-2" data-bs-toggle="tab" data-bs-target="#apis-denied"
                                type="button" role="tab" @click="setCurrentTab('denied')">차단API 목록</button>
                        </li>
                    </ul>
                </div>
                <div v-if="hasSearched && isWriter(AUTH_MENU)" class="col d-flex justify-content-end">
                    <button class="btn btn-sm btn-secondary p-1 m-2 mb-1" @click="showApiModal"
                        :disabled="isAnyEmpty(userGroup.id)">
                        API 추가</button>
                    <button class="btn btn-sm btn-secondary ms-0 p-1 m-2 mb-1" @click="saveUserGroupApi"
                        :disabled="isAnyEmpty(userGroup.id)">
                        목록 저장</button>
                </div>
            </div>
            <div class="tab-content p-1 pt-0" id="tab-content">
                <div class="tab-pane bg-white border border-start border-end fade active show" id="apis-allowed"
                    role="tabpanel" tabindex="0">
                    <ItemsTable class="p-1" :headers="table.headers" :items="table.allowedApiList" :nosetting="true"
                        :scroll="true" :small="true" @row-selected="selectApi" />
                </div>
                <div class="tab-pane bg-white border border-start border-end fade" id="apis-denied" role="tabpanel"
                    tabindex="0">
                    <ItemsTable class="p-1" :headers="table.headers" :items="table.deniedApiList" :nosetting="true"
                        :scroll="true" :small="true" @row-selected="selectApi" />
                </div>
            </div>
        </div>
        <UserGroupApiModal ref="userGroupApiModal" />
    </PanelCollapse>
</template>