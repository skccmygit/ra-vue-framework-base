<script setup lang="ts">
import { reactive, ref } from 'vue';
import GuideTemplate from './components/GuideTemplate.vue';


const usage = reactive({
  tag: [
    '<OptionSelect v-model :label? :options? :values? :disabled? :withValue? @optionSelected />',
    '- options 또는 values 목록을 설정'
  ],
  props: [
    'v-model<any> : 셀렉트 선택 값(초기값 또는 선택값)',
    'label?<string> : 셀렉트 라벨',
    'options?<Option[]> : {label, value} 형식의 셀렉트 대상 목록',
    'values?<any[]> : value 목록 (label을 value와 동일하게 설정)',
    'disabled?<boolean> : 비활성화',
    'withValue?<boolean> : label에 value를 추가하여 보여줌'
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
  <GuideTemplate title="OptionSelect" :usage="usage">
    <div class="row">
      <div class="col-4">
        <OptionSelect class="mb-1" label="철학자" :options="options" v-model="optionValue"
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