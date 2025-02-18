<script setup lang="ts">
import OptionSwitch from '@/components/OptionSwitch.vue';
import TooltipBox from '@/components/TooltipBox.vue'
import CronField from '@/pages/domains/batch/components/CronField.vue'
import { reactive, ref } from 'vue';
import SideMenuBar from '../main/components/SideMenu.vue'


const refSideMenuBar = ref<any>(null)

const tips = reactive(['how can I help you - anything wrong', 'here we go'])

const cron = reactive({
  options: [
    { label: '*', value: '*' },
    { label: '0', value: '0' },
    { label: '1', value: '1' },
    { label: '2', value: '2' },
  ],
  value: '0'
})

const option = ref(false)

</script>

<template>
  <SideMenuBar ref="refSideMenuBar" />

  <div class="container-fluid">
    <TooltipBox :tips="tips" align="top" class="m-4" />top
    <TooltipBox :tips="tips" align="bottom" class="m-4" />bottom
    <TooltipBox :tips="tips" align="left" class="m-4" />left
    <TooltipBox :tips="tips" align="right" class="m-4" />right

    <div class="row">
      <div class="col-4">
        <CronField class="mb-1" label="초" :options="cron.options" v-model="cron.value" />
      </div>
      <div class="col">
      </div>
    </div>
    <div class="row">
      <div class="col">
        <OptionSwitch v-model="option" :small="true" label="On-off" />
      </div>
    </div>
  </div>
  <TooltipBox tips="긴 툴팁 메시지" class="m-4" :no-icon="true">
    <OptionSwitch v-model="option" :small="true" label="On-off" />
  </TooltipBox>
</template>
