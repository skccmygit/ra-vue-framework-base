<script setup lang="ts">
import { reactive, ref, onMounted, watch, nextTick } from 'vue'
import { isValidCronExpression } from '@/scripts/batch'
import CronField from './CronField.vue'

const props = defineProps<{
  modelValue: string
}>()

const emit = defineEmits(['update:modelValue'])

const MONTHS = ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월']
const WEEKDAYS = ['일', '월', '화', '수', '목', '금', '토']

const cron = reactive({
  second: '',
  minute: '',
  hour: '',
  day: '',
  month: '',
  weekday: '',
})

const optionSeconds = ref<any[]>([])
const optionMinutes = ref<any[]>([])
const optionHours = ref<any[]>([])
const optionDays = ref<any[]>([])
const optionMonths = ref<any[]>([])
const optionWeekdays = ref<any[]>([])

const buildOptions = () => {
  optionSeconds.value = [{ label: '매초(*)', value: '*' }]
  optionMinutes.value = [{ label: '매분(*)', value: '*' }]
  optionHours.value = [{ label: '매시(*)', value: '*' }]
  optionDays.value = [{ label: '매일(*)', value: '*' }]
  optionMonths.value = [{ label: '매월(*)', value: '*' }]
  optionWeekdays.value = [{ label: '요일(*)', value: '*' }]

  for (let i = 0; i < 60; i++) {
    optionSeconds.value.push({ label: i, value: i })
    optionMinutes.value.push({ label: i, value: i })
  }

  for (let i = 0; i < 24; i++) {
    optionHours.value.push({ label: i, value: i })
  }

  for (let i = 1; i <= 31; i++) { // Days should start from 1 and go up to 31
    optionDays.value.push({ label: i, value: i })
  }

  MONTHS.forEach((item, index) => {
    optionMonths.value.push({ label: item, value: index + 1 })
  })

  WEEKDAYS.forEach((item, index) => {
    optionWeekdays.value.push({ label: item, value: index })
  })
}

const tooltips = reactive({
  tips: [
    '초 분 시 일 월 요일',
    '초/분: 0 - 59',
    '시: 0 - 23',
    '일: 1 - 31',
    '월: 1 - 12',
    '요일: 일(0, 7) - 토(6)'
  ],
  align: 'bottom'
})

const parseCronExpression = () => {
  const parts = props.modelValue.split(' ')

  if (parts.length === 6) {
    [cron.second, cron.minute, cron.hour, cron.day, cron.month, cron.weekday] = parts
  } else if (parts.length === 5) {
    [cron.minute, cron.hour, cron.day, cron.month, cron.weekday] = parts
    cron.second = '0'
  } else {
    [cron.second, cron.minute, cron.hour, cron.day, cron.month, cron.weekday] = ['0', '*', '*', '*', '*', '*']
  }
}

const buildCronExpression = () => {
  const cronExpression = `${cron.second} ${cron.minute} ${cron.hour} ${cron.day} ${cron.month} ${cron.weekday}`
  emit('update:modelValue', cronExpression)
}

const cronExpressModalButton = ref<HTMLButtonElement | null>(null)

const show = async () => {
  buildOptions()
  parseCronExpression()
  await nextTick()
  const element = document.getElementById('cronExpressModal')
  if (element && !element.classList.contains('show')) {
    cronExpressModalButton.value?.click()
  }
}

watch(() => props.modelValue, parseCronExpression, { immediate: true })

const save = () => {
  buildCronExpression()
  const element = document.getElementById('cronExpressModal')
  if (element && element.classList.contains('show')) {
    cronExpressModalButton.value?.click()
  }
}

onMounted(() => {
  buildOptions()
  parseCronExpression()
})

defineExpose({
  show
})
</script>

<template>
  <button v-show="false" ref="cronExpressModalButton" type="button" class="btn btn-primary" data-bs-toggle="modal"
    data-bs-target="#cronExpressModal">
    Launch modal
  </button>
  <div class="modal fade" id="cronExpressModal" tabindex="-1" data-bs-backdrop="static" data-bs-keyboard="false">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header bg-success-subtle">
          <h1 class="modal-title fs-5" id="cronExpressModalLabel">Cron 표현식 작성</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body row">
          <InlineInput class="mb-2" label="표현식" v-model="props.modelValue" type="text" disabled
            :warning="!isValidCronExpression(props.modelValue)" :tooltips="tooltips" />
          <CronField label="초" :options="optionSeconds" v-model="cron.second" />
          <CronField label="분" :options="optionMinutes" v-model="cron.minute" />
          <CronField label="시" :options="optionHours" v-model="cron.hour" />
          <CronField label="일" :options="optionDays" v-model="cron.day" />
          <CronField label="월" :options="optionMonths" v-model="cron.month" />
          <CronField label="요일" :options="optionWeekdays" v-model="cron.weekday" />
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary btn-sm" data-bs-dismiss="modal">취소</button>
          <button type="button" class="btn btn-primary btn-sm" @click="save">저장</button>
        </div>
      </div>
    </div>
  </div>
</template>
