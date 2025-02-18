<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
    modelValue: any
    label?: string
    rows?: any
    placeholder?: string
    disabled?: boolean,
    warning?: boolean,
}>()

const emit = defineEmits(['update:modelValue'])

const elementId = crypto.randomUUID()

const value = computed({
    get() {
        return props.modelValue
    },
    set(newValue) {
        emit('update:modelValue', newValue)
    },
})
</script>

<template>
    <div class="row g-3 align-items-center">
        <div v-if="props.label" class="col-2 d-flex justify-content-end">
            <label class="col-form-label" :for="elementId">{{ props.label }}</label>
        </div>
        <div class="col">
            <textarea v-model="value" class="form-control form-control-sm" :id="elementId" :rows="props.rows"
                :placeholder="props.placeholder" :disabled="props.disabled"
                :class="props.warning ? 'bg-danger-subtle' : ''"></textarea>
        </div>
    </div>
</template>
