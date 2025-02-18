<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue';

interface Option {
    label: string,
    value: any
}

const props = defineProps<{
    label?: string,
    options?: Option[],
    values?: any[],
    modelValue: any,
    disabled?: boolean,
    withValue?: boolean
}>();

const options = ref<Option[]>([]);

const emit = defineEmits<{
    (event: 'update:modelValue', value: any): void;
    (event: 'optionSelected', value: any): void;
}>();

const elementId = crypto.randomUUID();

const initializeOptions = () => {
    options.value.length = 0;
    if (props.options) {
        options.value = props.options;
    } else if (props.values) {
        props.values.forEach(value => {
            options.value.push({ label: value, value: value });
        });
    }
};

onMounted(initializeOptions);
watch(() => props.options, initializeOptions);
watch(() => props.values, initializeOptions);

const value = computed({
    get() {
        return props.modelValue;
    },
    set(newValue) {
        emit('update:modelValue', newValue);
    }
})

const selected = (event: any) => {
    const selectedValue = event.target.value
    const selectedOption = options.value.find((option: any) => option.value === selectedValue)
    emit('optionSelected', selectedOption)
}
</script>

<template>
    <div class="row g-2 align-items-center">
        <div v-if="label" class="col-2 d-flex justify-content-end">
            <label class="col-form-label form-control-sm" :for="elementId">{{ label }}</label>
        </div>
        <div class="col">
            <select class="form-select form-select-sm" v-model="value" :disabled="disabled" :id="elementId"
                @change="selected">
                <option v-for="(option, index) in options" :key="elementId + '-' + index" :value="option.value">
                    {{ option.label }}
                    <template v-if="props.withValue && option.value">
                        : {{ option.value }}
                    </template>
                </option>
            </select>
        </div>
    </div>
</template>
