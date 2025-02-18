<script setup lang="ts">
import { ref, watch, onMounted, toRaw } from 'vue'
import { getCallback } from '@/scripts/store-callbacks'
import { notifyConfirm } from '@/scripts/store-popups'
import { hasSameValues } from '@/scripts/utils'

const props = defineProps<{
    watchTargets: any
    disableSave?: boolean
    disableDelete?: boolean
    refTable?: string
    hideCancel?: boolean
}>()
const emit = defineEmits(['save', 'delete', 'cancel'])

const close = () => {
    hasChanged.value = false
    setTimeout(() => {
        if (props.refTable) {
            const callback = getCallback(props.refTable)
            if (callback) callback()
        }
    }, 250)
}

const doSave = () => {
    emit('save')
    close()
}

const doDelete = () => {
    notifyConfirm('Are you sure to delete?', (confirmed: boolean) => {
        if (confirmed) {
            emit('delete')
            close()
        }
    })
}

const doCancel = () => {
    if (hasChanged.value) {
        notifyConfirm('Are you sure to leave without saving?', (confirmed: boolean) => {
            if (confirmed) {
                emit('cancel')
                close()
            }
        })
    }
}

const oldValues = {} as any
onMounted(() => {
    Object.assign(oldValues, toRaw(props.watchTargets))
})

const hasChanged = ref(false)
watch(
    props.watchTargets,
    (newValues) => {
        hasChanged.value = !hasSameValues(oldValues, newValues)
    },
    { deep: true }
)
</script>

<template>
    <div class="d-flex justify-content-end mt-2">
        <button class="btn btn-sm btn-primary me-2" @click="doSave" :disabled="props.disableSave || !hasChanged">
            <i class="p-0 bi bi-check-circle"></i>
        </button>
        <button class="btn btn-sm btn-danger me-2" @click="doDelete" :disabled="props.disableDelete">
            <i class="p-0 bi bi-x-circle"></i>
        </button>
        <button v-if="!hideCancel" class="btn btn-sm btn-secondary me-2" @click="doCancel" :disabled="!hasChanged">
            <i class="p-0 bi bi-arrow-clockwise"></i>
        </button>
    </div>
</template>
