<script setup lang="ts">
import { reactive, ref } from 'vue';
import GuideTemplate from './components/GuideTemplate.vue';


const usage = reactive({
  tag: [
    '<PanelCollapse :title @toggled> {slot} </PanelCollapse>',
    '{slot} : 펼쳐지면 보일 컴포넌트'
  ],
  props: [
    'title<string> : 제목',
  ],
  emits: [
    'toggle(toggled: boolean) : 토글 여부 이벤트 (펼쳐지면 true)'
  ],
})

const hasToggled = ref(false)

const toggle = (toggled: boolean) => {
  hasToggled.value = toggled
}
</script>

<template>
  <GuideTemplate title="PanelCollapse" :usage="usage">
    <div class="row">
      <div class="col">
        <PanelCollapse title="타이틀" @toggled="toggle">
          <div>
            슬롯으로 설정한 컴포넌트가 보입니다.
          </div>
        </PanelCollapse>
      </div>
      <div class="col">
        <b>toggled :</b> {{ hasToggled }}
      </div>
    </div>
  </GuideTemplate>
</template>