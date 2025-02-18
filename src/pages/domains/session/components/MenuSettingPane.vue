<script setup lang="ts">
import { reactive, onMounted } from 'vue'
import { validateAndNotify } from '@/scripts/validater'
import { isWriter } from '@/scripts/session';

const AUTH_MENU = '/main/menu'

interface MenuSetting {
    systemName: string,
    systemId: string,
    menuName: string,
    menuId: string,
}

const props = defineProps<{
    setting: MenuSetting,
    isNew: boolean
}>()

const emit = defineEmits(['save', 'delete'])

const watchTargets = reactive({
    systemName: '',
    systemId: '',
    menuName: '',
    menuId: ''
})

const emitSave = () => {
    const inputs = [
        { label: '메뉴ID', value: watchTargets.menuId },
        { label: '메뉴명', value: watchTargets.menuName },
    ]
    if (validateAndNotify(inputs)) {
        const setting = {} as MenuSetting
        setting.systemName = props.setting.systemName
        setting.systemId = props.setting.systemId
        setting.menuId = watchTargets.menuId
        setting.menuName = watchTargets.menuName

        emit('save', setting)
    }
}

const emitDelete = () => {
    emit('delete', props.setting)
}

onMounted(() => {
    watchTargets.systemName = props.setting.systemName
    watchTargets.systemId = props.setting.systemId
    watchTargets.menuName = props.setting.menuName
    watchTargets.menuId = props.setting.menuId
})
</script>

<template>
    <div class="p-1 bg-primary-subtle">
        <InlineInput class="mb-1" label="시스템ID" v-model="watchTargets.systemId" type="text" :disabled="true" />
        <InlineInput class="mb-1" label="시스템명" v-model="watchTargets.systemName" type="text" :disabled="true" />
        <InlineInput class="mb-1" label="메뉴ID" v-model="watchTargets.menuId" type="text" :disabled="!props.isNew" />
        <InlineInput class="mb-1" label="메뉴명" v-model="watchTargets.menuName" type="text"
            :disabled="!isWriter(AUTH_MENU)" />
        <ElementButtons v-if="isWriter(AUTH_MENU)" refTable="MenusPane" @save="emitSave" @delete="emitDelete"
            :watchTargets="watchTargets" :disableDelete="props.isNew" />
    </div>
</template>
