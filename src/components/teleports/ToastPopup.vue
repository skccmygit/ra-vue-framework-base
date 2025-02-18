<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { setToastPopup } from '@/scripts/store-popups'

const message = ref('')
const visible = ref(false)

const show = (msg: string) => {
  message.value = msg
  visible.value = true
  setTimeout(() => {
    visible.value = false
  }, 3000)
};

const hide = () => {
  visible.value = false
}

onMounted(() => {
  setToastPopup({ show, hide })
})
</script>

<template>
  <teleport to="body">
    <div class="toast-container p-3 bottom-0 end-0" id="toastPlacement" data-original-class="toast-container p-3">
      <div class="toast align-items-center text-bg-warning border-0" :class="visible ? 'show' : 'hide'" role="alert"
        data-bs-autohide="false">
        <div class="d-flex">
          <div class="toast-body">{{ message }}</div>
          <button type="button" class="btn-close btn-close-black me-2 m-auto" data-bs-dismiss="toast"
            @click="hide"></button>
        </div>
      </div>
    </div>
  </teleport>
</template>