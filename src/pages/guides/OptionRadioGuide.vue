<script setup lang="ts">
import { reactive, ref } from 'vue';
import GuideTemplate from './components/GuideTemplate.vue';


const usage = reactive({
  tag: [
    '<OptionRadio v-model :options? :disabled? @optionSelected />',
  ],
  props: [
    'v-model<any> : 셀렉트 선택 값(초기값 또는 선택값)',
    'options<Option[]> : {label, value} 형식의 셀렉트 대상 목록',
    'disabled?<boolean> : 비활성화',
  ],
  emits: [
    'optionSelected(option: Option) : {label, value} 형식의 셀렉트 대상 항목'
  ],
})

const options = reactive([
  { label: '소크라테스', value: 'socrates' },
  { label: '플라톤', value: 'plato' },
  { label: '아리스토 텔레스', value: 'aristotle' },
])

const optionValue = ref('')
const selectedOption = ref({} as any)

const optionSelected = (option: any) => {
  selectedOption.value = option
}

</script>

<template>
  <GuideTemplate title="OptionRadio" :usage="usage">
    <div class="row">
      <div class="col-4">
        <OptionRadio class="mb-1" label="철학자" :options="options" v-model="optionValue"
          @option-selected="optionSelected" />
      </div>
      <div class="col">
        <b>v-model :</b> {{ optionValue }}
      </div>
      <div class="col">
        <b>optionSelected :</b> {{ selectedOption }}
      </div>
    </div>
  </GuideTemplate>
</template>