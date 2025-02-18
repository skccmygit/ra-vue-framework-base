<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
    modelValue: boolean,
    label?: string
    disabled?: boolean
}>()
const emit = defineEmits(['update:modelValue'])

const elementId = crypto.randomUUID()

const value = computed({
    get() {
        return props.modelValue;
    },
    set(newValue) {
        emit('update:modelValue', newValue);
    }
});

</script>

<template>
    <div class="row g-2 align-items-center">
        <div v-if="props.label" class="col-2 d-flex justify-content-end">
            <label class="col-form-label form-control-sm" :for="elementId">{{ props.label }}</label>
        </div>
        <div class="col">
            <input class="form-check-input" type="checkbox" v-model="value" :id="elementId" :disabled="props.disabled">
        </div>
    </div>
</template>\