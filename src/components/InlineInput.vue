<script setup lang="ts">
import { computed } from 'vue'
import TooltipBox from './TooltipBox.vue';

const props = defineProps<{
    modelValue: any,
    type?: string,
    label?: string,
    placeholder?: string,
    disabled?: boolean,
    clearable?: boolean,
    warning?: boolean,
    tooltips?: any
    append?: boolean
}>()

const emit = defineEmits(['update:modelValue', 'inputEnterPressed', 'clean'])

const elementId = crypto.randomUUID()

const value = computed({
    get() {
        return props.modelValue
    },
    set(newValue) {
        emit('update:modelValue', newValue)
    }
})

const handleKeyup = (target: any) => {
    emit('update:modelValue', target.value);
}
</script>

<template>
    <div class="row g-2 align-items-center">
        <div v-if="props.label" class="col-2 d-flex justify-content-end">
            <label class="col-form-label form-control-sm p-1" :for="elementId">{{ props.label }}</label>
            <TooltipBox v-if="props.tooltips" class="pt-1" :tips="tooltips.tips" :align="tooltips.align" />
        </div>
        <div class="col">
            <input :type="props.type" v-model="value" class="form-control form-control-sm"
                :class="props.warning ? 'bg-danger-subtle' : ''" :id="elementId" :placeholder="props.placeholder"
                :disabled="props.disabled" @keyup="handleKeyup($event.target)"
                @keydown.enter="emit('inputEnterPressed')" />
        </div>
        <div v-if="append" class="col">
            <slot></slot>
        </div>
        <div v-if="props.clearable" class="col-1 d-flex justify-content-center">
            <i class="btn bi bi-trash p-0" @click.prevent="emit('clean')"></i>
        </div>
    </div>
</template>