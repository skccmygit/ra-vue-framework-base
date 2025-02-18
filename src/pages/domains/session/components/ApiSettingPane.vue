<script setup lang="ts">
import { reactive, onMounted } from 'vue'
import { validateAndNotify } from '@/scripts/validater'
import { isWriter } from '@/scripts/session';

const AUTH_MENU = '/main/api'

interface ApiSetting {
    id: number,
    apiPath: string,
    apiName: string,
    idInsert: string,
    dtInsert: string,
    idUpdate: string,
    dtUpdate: string
}

const props = defineProps<{
    setting: ApiSetting,
}>()

const emit = defineEmits(['save', 'delete'])

const watchTargets = reactive({
    apiPath: '',
    apiName: '',
    inserter: '',
    updater: ''
})

const emitSave = () => {
    const inputs = [
        { label: 'API경로', value: watchTargets.apiPath },
        { label: 'API명', value: watchTargets.apiName },
    ]
    if (validateAndNotify(inputs)) {
        const setting = {} as ApiSetting
        setting.id = props.setting.id
        setting.apiPath = watchTargets.apiPath
        setting.apiName = watchTargets.apiName

        emit('save', setting)
    }
}

const emitDelete = () => {
    emit('delete', props.setting)
}

onMounted(() => {
    watchTargets.apiPath = props.setting.apiPath
    watchTargets.apiName = props.setting.apiName
    watchTargets.inserter = `${props.setting.idInsert}(${props.setting.dtInsert})`
    watchTargets.updater = `${props.setting.idUpdate}(${props.setting.dtUpdate})`
})
</script>

<template>
    <div class="p-1 bg-primary-subtle">
        <InlineInput class="mb-1" label="API경로" v-model="watchTargets.apiPath" type="text" />
        <InlineInput class="mb-1" label="API명" v-model="watchTargets.apiName" type="text" />
        <template v-if="props.setting.id > 0">
            <InlineInput class="mb-1" label="등록(시간)" v-model="watchTargets.inserter" type="text" :disabled="true" />
            <InlineInput class="mb-1" label="변경(시간)" v-model="watchTargets.updater" type="text" :disabled="true" />
        </template>
        <ElementButtons v-if="isWriter(AUTH_MENU)" refTable="ApiPane" @save="emitSave" @delete="emitDelete"
            :watchTargets="watchTargets" :disableDelete="props.setting.id === 0" />
    </div>
</template>
