<script setup lang="ts">
import { reactive } from 'vue'
import BackendApiList from './BackendApiList.vue';
import { isWriter } from '@/scripts/session'

const AUTH_MENU = '/main/saga'

interface SagaTransaction {
    id: number,
    sagaId: string,
    sagaName: string,
    backendApiList: any
}
const props = defineProps<{
    setting: SagaTransaction
}>()

const emit = defineEmits(['save', 'delete'])

const watchTargets = reactive({
    sagaId: props.setting.sagaId,
    sagaName: props.setting.sagaName,
    backendApiList: props.setting.backendApiList as any,
    timestamp: 0
})

const emitSave = () => {
    const setting = {} as SagaTransaction
    setting.sagaId = watchTargets.sagaId
    setting.sagaName = watchTargets.sagaName
    setting.backendApiList = watchTargets.backendApiList

    emit('save', setting)
}

const emitDelete = () => {
    emit('delete', props.setting)
}

const updateBackendApis = (items: any) => {
    watchTargets.backendApiList = items
    watchTargets.timestamp = Date.now()
}

</script>

<template>
    <div class="p-1 bg-primary-subtle">
        <InlineInput class="mb-1" label="트랜잭션 ID" v-model="watchTargets.sagaId" type="text"
            placeholder="SAGA 트랜잭션 ID" />
        <InlineInput class="mb-1" label="트랜잭션명" v-model="watchTargets.sagaName" type="text" placeholder="SAGA 트랜잭션명" />
        <BackendApiList :list="watchTargets.backendApiList" @update="updateBackendApis" />
        <ElementButtons v-if="isWriter(AUTH_MENU)" refTable="SagaTransactions" @save="emitSave" @delete="emitDelete"
            :watchTargets="watchTargets" :disableDelete="props.setting.id === 0" />
    </div>
</template>
