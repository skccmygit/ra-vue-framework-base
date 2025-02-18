<script setup lang="ts">
import { ref, watch, reactive } from 'vue'
import { ascendArray } from '@/scripts/utils'
import apiCall from '@/scripts/api-call'
import { isAnyEmpty, isEmpty } from '@/scripts/validater'
import { setCodeGroupOptions } from '@/scripts/api-util'
import { isWriter } from '@/scripts/session'

const AUTH_MENU = '/main/user'

interface UserGroupMenu {
    userGroupName: string,
    userGroupId: string,
    systemName: string,
    systemId: string,
    menuName: string,
    menuId: string,
    authLevel: number,
    authLevelOption: any
}

const userGroupMenus = ref<UserGroupMenu[]>([])

const table = reactive({
    headers: [
        { label: "사용자그룹ID", value: "userGroupId" },
        { label: "시스템ID", value: "systemId" },
        { label: "메뉴ID", value: "menuId" },
        { label: "메뉴명", value: "menuName" },
        { label: "메뉴권한", value: "authLevelOption" },
    ],
    items: [] as any,
})

const userGroup = reactive({
    codeGroupId: 'user_auth_group',
    defaultOption: { label: '사용자그룹 선택', value: '' },
    id: '',
    selected: {} as any
})
const selectUserGroup = (option: any) => {
    userGroup.selected = option
}

const system = reactive({
    codeGroupId: 'system_id',
    defaultOption: { label: '시스템 선택', value: '' },
    id: '',
    selected: {} as any
})
const selectSystem = (option: any) => {
    system.selected = option
}

interface Option {
    label: string,
    value: any
}

const authLevel = reactive({
    codeGroupId: 'auth_level',
    options: [] as Option[],
})

const getUserGroupMenus = async () => {
    const url = '/api/user-group-menus/all'
    const queryParams = {
        userGroupId: userGroup.id,
        systemId: system.id,
    }
    const { body: pagedList } = await apiCall.get(url, null, queryParams)
    if (pagedList) {
        userGroupMenus.value = pagedList.list
    }
}

const getSystemMenu = async () => {
    table.items.length = 0
    const url = '/api/menus/system/menu'
    const queryParams = {
        systemId: system.id,
    }
    const { body: pagedList } = await apiCall.get(url, null, queryParams)
    if (pagedList) {
        table.items = pagedList.list
    }
}

const assignUserGroupMenu = async () => {
    setCodeGroupOptions(authLevel.codeGroupId, authLevel.options)
    await getUserGroupMenus()
    await getSystemMenu()

    table.items.forEach((item: any) => {
        setAuthLevelOption(item)
    })
    ascendArray(table.items, ['assigned', 'menuId'])
}

const setAuthLevelOption = (item: any) => {
    item.userGroupName = userGroup.selected.label
    item.userGroupId = userGroup.selected.value
    item.authLevel = 0
    userGroupMenus.value.forEach((menu: any) => {
        if (menu.menuId === item.menuId) {
            item.authLevel = menu.authLevel
        }
    })
    item.authLevelOption = { value: item.authLevel, options: authLevel.options }
}

const saveUserGroupMenu = async () => {
    const menus = [] as UserGroupMenu[]
    table.items.forEach((item: UserGroupMenu) => {
        item.authLevel = item.authLevelOption.value
        if (item.authLevel >= 0) {
            delete item.authLevelOption
            menus.push(item)
        }
    })
    const filteredMenus = menus.filter((menu: any) => menu.authLevel > 0)
    const url = '/api/user-group-menus/bulk'
    await apiCall.post(url, null, filteredMenus)

    assignUserGroupMenu()
}

const toggleOn = ref(false)
const setToggle = (toggled: boolean) => {
    toggleOn.value = toggled
}

watch(() => system.id, (value: string) => {
    if (!isEmpty(value) && table.items.length > 0) {
        assignUserGroupMenu()
    }
})

watch(() => userGroup.id, (value: string) => {
    if (!isEmpty(value) && table.items.length > 0) {
        assignUserGroupMenu()
    }
})

</script>

<template>
    <PanelCollapse title="사용자그룹 메뉴 관리" @toggled="setToggle">
        <div v-if="toggleOn" class="row">
            <div class="col">
                <OptionSelectByCode :codeGroupId="userGroup.codeGroupId" v-model="userGroup.id"
                    :defaultOption="userGroup.defaultOption" @optionSelected="selectUserGroup" :withValue="true" />
            </div>
            <div class="col">
                <OptionSelectByCode :codeGroupId="system.codeGroupId" v-model="system.id"
                    :defaultOption="system.defaultOption" @optionSelected="selectSystem" :withValue="true" />
            </div>
            <div class="col-2 d-flex justify-content-end">
                <button class="btn btn-sm btn-primary" @click="assignUserGroupMenu"
                    :disabled="isAnyEmpty(userGroup.id, system.id)">
                    검색</button>
            </div>
        </div>
        <ItemsTable refTable="UserGroupMenu" class="mt-2" :headers="table.headers" :items="table.items"
            :nosetting="true" :small="true" :disabled="!isWriter(AUTH_MENU)">
        </ItemsTable>
        <div v-if="table.items.length > 0 && isWriter(AUTH_MENU)" class="d-flex justify-content-end mt-1">
            <button class="btn btn-sm btn-secondary" @click="saveUserGroupMenu">저장</button>
        </div>
    </PanelCollapse>
</template>