<script setup lang="ts">
import { reactive, ref } from 'vue'
import apiCall from '@/scripts/api-call'

const stepStatusButton = ref<HTMLButtonElement | null>(null)

const show = async (jobStatus: any) => {
  const element = document.getElementById('stepStatus')
  if (element && !element.classList.contains('show')) {
    await getStepStatus(jobStatus)
    stepStatusButton.value?.click()
  }
}

const table = reactive({
  headers: [
    { label: "스텝 ID", value: "stepId" },
    { label: "스텝 명", value: "stepName" },
    { label: "시작시간", value: "stepStartTime" },
    { label: "종료시간", value: "stepEndTime" },
    { label: "읽기", value: "stepReadCount" },
    { label: "쓰기", value: "stepWriteCount" },
    { label: "커밋", value: "stepCommitCount" },
    { label: "종료 상태", value: "stepExitStatus" },
    { label: "종료 메시지", value: "stepExitMessage" }
  ],
  items: [] as any,
})

const getStepStatus = async (jobStatus: any) => {
  const url = '/batch/api/history/steps'
  const { body: pagedList } = await apiCall.post(url, null, jobStatus)
  if (pagedList) {
    pagedList.list.forEach((item: any) => {
      item.stepStartTime = reformTime(item.stepStartTime)
      item.stepEndTime = reformTime(item.stepEndTime)
    })
    table.items = pagedList.list
  }
}

const reformTime = (time: string) => {
  if (time) {
    const parts = time.split('.')
    return parts[0].replace('T', ' ')
  }
  return ''
}

defineExpose({
  show
})
</script>

<template>
  <button v-show="false" ref="stepStatusButton" type="button" class="btn btn-primary" data-bs-toggle="modal"
    data-bs-target="#stepStatus">
    Launch modal
  </button>
  <div class="modal fade" id="stepStatus" tabindex="-1" data-bs-backdrop="static" data-bs-keyboard="false">
    <div class="modal-dialog modal-xl">
      <div class="modal-content">
        <div class="modal-header  bg-success-subtle">
          <h1 class="modal-title fs-5" id="stepStatusLabel">배치 작업 Step 상태</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body row">
          <ItemsTable class="mt-2" :headers="table.headers" :items="table.items" :nosetting="true" :small="true" />
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary btn-sm" data-bs-dismiss="modal">확인</button>
        </div>
      </div>
    </div>
  </div>
</template>
