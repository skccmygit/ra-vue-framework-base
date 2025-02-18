<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  label?: string,
  modelValue: any,
  disabled?: boolean,
  reverse?: boolean,
  checkbox?: boolean,
  large?: boolean
}>();

const emit = defineEmits<{
  (event: 'update:modelValue', value: any): void;
  (event: 'optionSwitched', value: any): void;
}>();

const elementId = crypto.randomUUID()

const value = computed({
  get() {
    return props.modelValue
  },
  set(newValue) {
    emit('update:modelValue', newValue)
    emit('optionSwitched', newValue);
  }
})
</script>

<template>
  <div class="form-check"
    :class="{ 'form-switch': !props.checkbox, 'form-check-reverse': props.reverse, 'form-control-sm': !props.large }">
    <input class="form-check-input" type="checkbox" role="switch" :id="elementId" v-model="value"
      :disabled="props.disabled">
    <label v-if="props.label" class="form-check-label" :for="elementId">{{ props.label }}</label>
  </div>
</template>