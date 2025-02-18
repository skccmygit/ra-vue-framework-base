<script setup lang="ts">
import { ref } from 'vue'

const sagaHistoryButton = ref<HTMLButtonElement | null>(null)

const show = async (history: any) => {
  const element = document.getElementById('sagaHistory')
  if (element && !element.classList.contains('show')) {
    parseHistory(history)
    sagaHistoryButton.value?.click()
  }
}

const requestBody = ref('')
const responseBody = ref('')
const parseHistory = (history: any) => {
  if (history.requestBody) {
    const body = JSON.parse(history.requestBody)
    requestBody.value = JSON.stringify(body, null, 2)
  }
  if (history.responseBody) {
    const body = JSON.parse(history.responseBody)
    responseBody.value = JSON.stringify(body, null, 2)
  }
}

defineExpose({
  show
})
</script>

<template>
  <button v-show="false" ref="sagaHistoryButton" type="button" class="btn btn-primary" data-bs-toggle="modal"
    data-bs-target="#sagaHistory">
    Launch modal
  </button>
  <div class="modal fade" id="sagaHistory" tabindex="-1" data-bs-backdrop="static" data-bs-keyboard="false">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header  bg-success-subtle">
          <h1 class="modal-title fs-5" id="sagaHistoryLabel">API 요청 및 응답 상세</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body row">
          <div class="col border-end">
            <pre>{{ requestBody }}</pre>
          </div>
          <div class="col">
            <pre>{{ responseBody }}</pre>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary btn-sm" data-bs-dismiss="modal">확인</button>
        </div>
      </div>
    </div>
  </div>
</template>
