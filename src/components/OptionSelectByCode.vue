<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { setCodeGroupOptions } from '@/scripts/api-util'

interface Option {
    label: string,
    value: any
}

const props = defineProps<{
    codeGroupId: string,
    defaultOption?: Option,
    label?: string,
    modelValue: any,
    disabled?: boolean
}>();

const options = ref<Option[]>([]);

const emit = defineEmits<{
    (event: 'update:modelValue', value: any): void;
    (event: 'optionSelected', value: any): void;
}>();

const getCodeList = async () => {
    options.value.length = 0
    setCodeGroupOptions(props.codeGroupId, options.value, props.defaultOption)
}

onMounted(getCodeList);
watch(() => props.codeGroupId, getCodeList);

const value = computed({
    get() {
        return props.modelValue;
    },
    set(newValue) {
        emit('update:modelValue', newValue);
    }
})

const selected = (selectedOption: any) => {
    emit('optionSelected', selectedOption)
}
</script>

<template>
    <OptionSelect :label="props.label" :options="options" v-model="value" @optionSelected="selected"
        :disabled="props.disabled" />
</template>
