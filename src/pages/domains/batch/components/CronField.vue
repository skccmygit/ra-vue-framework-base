<script setup lang="ts">
import OptionSwitch from '@/components/OptionSwitch.vue';
import TooltipBox from '@/components/TooltipBox.vue';
import { reactive, onMounted, computed, ref, watch } from 'vue';

const props = defineProps<{
  label: string,
  modelValue: string,
  options: any[],
}>();

const emit = defineEmits(['update:modelValue']);

const isManual = ref(false);

const parseField = () => {
  if (!isManual.value) {
    if (props.modelValue.includes('/') || props.modelValue.includes('-') || props.modelValue.includes(',')) {
      isManual.value = true;
    } else {
      isManual.value = false;
    }
  }
};

const value = computed({
  get() {
    return props.modelValue;
  },
  set(newValue) {
    emit('update:modelValue', `${newValue}`);
  }
});

const isValidCronField = () => {
  const cronRegex = /^(\*|\d+)([-/]\d+)?([,]\d+([-/]\d+)?)?$/;
  return cronRegex.test(props.modelValue);
};

const tips = reactive([
  'Ex.1) 0/20 : 20분 주기',
  'Ex.2) 2-4,6 : 화-목,토'
]);

const options = ref<any[]>([]);

watch(() => props.options, (newOptions) => {
  options.value = newOptions || [];
});

watch(() => props.modelValue, parseField);

onMounted(() => {
  parseField();
  options.value = props.options || [];
});
</script>

<template>
  <div class="row align-items-center mb-1">
    <div class="col-2 d-flex justify-content-end">
      <label class="col-form-label form-control-sm p-1">{{ label }}</label>
    </div>
    <div class="col">
      <InlineInput v-if="isManual" :warning="!isValidCronField()" v-model="value" type="text" />
      <OptionSelect v-else :options="options" v-model="value" />
    </div>
    <div class="col-3 d-flex justify-content-center">
      <OptionSwitch label="입력" v-model="isManual" :checkbox="true" />
      <TooltipBox v-if="isManual" :tips="tips" align="left" />
    </div>
  </div>
</template>
