<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { setNoticeModal } from "@/scripts/store-popups"

type CallbackFunction = (confirmed: boolean) => void;

interface Modal {
  title: string;
  message: string;
  callback: CallbackFunction | null;
}

interface Color {
  background: string;
  text: string;
}

const modal = reactive<Modal>({
  title: '',
  message: '',
  callback: null
})

const color = reactive<Color>({
  background: '',
  text: ''
})

const elementId = 'noticeModalId'

const isVisible = ref(false)

const hide = () => {
  isVisible.value = false
}

const show = (title: string, message: string, background: string, callback: CallbackFunction | null) => {
  modal.title = title
  modal.message = message
  color.background = background
  modal.callback = callback

  isVisible.value = true
}

const feedback = (confirmed: boolean) => {
  if (modal.callback) {
    modal.callback(confirmed)
  }
  hide()
}

const success = (msg: string) => {
  show("Success", msg, "bg-success", null)
}

const error = (msg: string) => {
  show("Error", msg, "bg-warning", null)
}

const info = (msg: string) => {
  show("Info", msg, "bg-info", null)
}

const confirm = (msg: string, callback: CallbackFunction) => {
  show("Confirm", msg, "bg-danger", callback)
}

onMounted(() => {
  setNoticeModal({ show, success, error, info, confirm });
})
</script>

<template>
  <teleport to="body">
    <transition name="fade">
      <div v-if="isVisible" class="modal fade show" :id="elementId" data-bs-backdrop="static" data-bs-keyboard="false"
        style="display: block;" tabindex="-1">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header bg-opacity-50" v-bind:class="color.background">
              <h1 class="modal-title fs-5" v-bind:class="color.text">{{ modal.title }}</h1>
              <button type="button" class="btn-close" @click="hide"></button>
            </div>
            <div class="modal-body">
              {{ modal.message }}
            </div>
            <div v-if="modal.callback" class="modal-footer">
              <button type="button" class="btn btn-sm btn-primary me-2" @click="feedback(true)">Confirm</button>
              <button type="button" class="btn btn-sm btn-secondary" @click="feedback(false)">Cancel</button>
            </div>
            <div v-else class="modal-footer">
              <button type="button" class="btn btn-sm btn-primary" @click="hide">Close</button>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </teleport>
</template>


<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
