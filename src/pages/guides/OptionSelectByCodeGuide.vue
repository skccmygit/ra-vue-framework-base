<script setup lang="ts">
import { reactive, ref } from 'vue';
import GuideTemplate from './components/GuideTemplate.vue';


const usage = reactive({
  tag: [
    '<OptionSelectByCode :codeGroupId :defaultOption v-model :label? :disabled? @optionSelected />',
    '- API를 통해 공통코드그룹ID("system_id")에 속한 공통코드 목록을 구성'
  ],
  props: [
    'codeGroupId<string> : 공통코드그룹ID',
    'defaultOption?<Option> : 초기옵션을 목록 처음에 입력',
    'v-model<any> : 셀렉트 선택 값(초기값 또는 선택값)',
    'label?<string> : 셀렉트 라벨',
    'disabled?<boolean> : 비활성화'
  ],
  emits: [
    'optionSelected(option: Option) : {label, value} 형식의 셀렉트 대상 항목'
  ],
})

const optionValue = ref('')
const selectedOption = ref({} as any)

const optionSelected = (option: any) => {
  selectedOption.value = option
}

</script>

<template>
  <GuideTemplate title="OptionSelectByCode" :usage="usage">
    <div class="row">
      <div class="col-4">
        <OptionSelectByCode class="mb-1" label="시스템" codeGroupId="system_id" v-model="optionValue"
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