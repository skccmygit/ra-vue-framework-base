<script setup lang="ts">
import { computed } from 'vue';

interface Option {
  label: string,
  value: any
}

const props = defineProps<{
  options: Option[],
  modelValue: any,
  disabled?: boolean
}>();

const emit = defineEmits<{
  (event: 'update:modelValue', value: any): void;
  (event: 'optionSelected', value: any): void;
}>();

const value = computed({
  get() {
    return props.modelValue
  },
  set(newValue) {
    emit('update:modelValue', newValue)
  }
})

const elementId = crypto.randomUUID()

const isSelected = (item: any) => {
  return value.value === item
}

const select = (item: Option) => {
  value.value = item.value
  const selectedOption = props.options.find((option: Option) => option.value === item.value)
  emit('optionSelected', selectedOption)
}
</script>

<template>
  <div>
    <div v-for="(option, index) in props.options" :key="index" class="form-check form-check-inline">
      <input class="form-check-input" type="radio" :name="elementId + '-radioGroup'" :id="elementId + '-radio-' + index"
        :value="value" :checked="isSelected(option.value)" @click="select(option)">
      <label class="form-check-label" :for="elementId + '-radio-' + index">{{ option.label }}</label>
    </div>
  </div>
</template>