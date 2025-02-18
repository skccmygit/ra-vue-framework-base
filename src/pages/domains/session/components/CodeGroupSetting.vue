<script setup lang="ts">
import { reactive, ref, onMounted } from 'vue'
import CodeList from './CodeList.vue';
import apiCall from '@/scripts/api-call'
import { isWriter } from '@/scripts/session';

const BFF_CODE_REDIS = 'Bff-Code:'
const AUTH_MENU = '/main/code'

interface CodeGroup {
    id: number,
    codeGroupId: string,
    codeGroupName: string,
    codeList: any
}
const props = defineProps<{
    setting: CodeGroup
}>()

const emit = defineEmits(['save', 'delete'])

const watchTargets = reactive({
    codeGroupId: props.setting.codeGroupId,
    codeGroupName: props.setting.codeGroupName,
    codeList: props.setting.codeList as any,
    timestamp: 0
})

const emitSave = () => {
    const setting = {} as CodeGroup
    setting.codeGroupId = watchTargets.codeGroupId
    setting.codeGroupName = watchTargets.codeGroupName
    setting.codeList = watchTargets.codeList

    emit('save', setting)
}

const emitDelete = () => {
    emit('delete', props.setting)
}

const updateCodeList = (items: any) => {
    watchTargets.codeList = items
    watchTargets.timestamp = Date.now()
}

const cached = ref(false)
const checkCache = async () => {
    const url = `/api/redis/value?key=${BFF_CODE_REDIS}${props.setting.codeGroupId}`
    const { body } = await apiCall.justGet(url, null, null)
    if (body?.value) {
        cached.value = true
    }
    else {
        cached.value = false
    }
}

onMounted(checkCache)

</script>

<template>
    <div class="p-1 bg-primary-subtle">
        <InlineInput class="mb-1" label="코드그룹명" v-model="watchTargets.codeGroupName" type="text" placeholder="코드그룹명"
            :append="true">
            <OptionSwitch label="Redis Cached" v-model="cached" />
        </InlineInput>
        <InlineInput class="mb-1" label="코드그룹ID" v-model="watchTargets.codeGroupId" type="text" placeholder="코드그룹 ID" />
        <CodeList :list="watchTargets.codeList" @update="updateCodeList" />
        <ElementButtons v-if="isWriter(AUTH_MENU)" refTable="CodeGroupPane" @save="emitSave" @delete="emitDelete"
            :watchTargets="watchTargets" :disableDelete="props.setting.id === 0" />
    </div>
</template>
