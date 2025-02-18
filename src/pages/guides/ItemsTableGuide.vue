<script setup lang="ts">
import { reactive } from 'vue';
import GuideTemplate from './components/GuideTemplate.vue';
import CodeGroupPane from '../domains/session/components/CodeGroupPane.vue';


const usage = reactive({
  tag: [
    '<ItemsTable :headers :items :small? :noheader? :nosetting? :noaddition? :scroll? :multiple? :disableSetting? :refTable? :disabled? @rowSelected @rowSetting @addClicked />',
  ],
  props: [
    'headers<Header[]> : {label, value} 형식의 테이블 헤더',
    'items<any[]> : 테이블 데이터 목록',
    'small?<boolean> : 작은 글씨체',
    'noheader?<boolean> : 헤더 없는 테이블',
    'nosetting?<boolean> : 테이블 데이터 변경 금지',
    'noaddition?<boolean> :  새로운 데이터 추가 금지',
    'scroll?<boolean> :  수직 스크롤바 활성화',
    'multiple?<boolean> : 여러개의 데이터 상세정보 노출',
    'disableSetting?<boolean> : 데이터 조직 비활성화',
    'refTable?<any> : 데이터 상세정보 변경작업 이벤트 수신을 위한 참조명',
    'disabled?<boolean> : 비활성화',
  ],
  emits: [
    'rowSelected(item: any) : 테이블의 특정 행 선택 이벤트',
    'rowSetting(item: any) : 테이블 특정 행 편집 이벤트',
    'addClicked() : 테이블 헤더의 신규 항목 추가 이벤트'
  ],
})

</script>

<template>
  <GuideTemplate title="ItemsTable & PageNavigator" :usage="usage">
    <div class="row">
      <div class="col-6">
        <CodeGroupPane />
      </div>
    </div>
  </GuideTemplate>
</template>