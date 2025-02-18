<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { setSpinnerModal } from '@/scripts/store-popups'

const isModalVisible = ref(false)

const show = () => {
  isModalVisible.value = true
}

const hide = () => {
  isModalVisible.value = false
}

onMounted(() => {
  setSpinnerModal(show, hide)
})
</script>

<template>
  <teleport to="body">
    <div>
      <div v-if="isModalVisible" class="modal show d-block" tabindex="-1" role="dialog">
        <div class="modal-dialog" role="document">
          <div class="modal-content border-0">
            <div class="modal-body text-center">
              <div class="spinner-grow text-dark" role="status">
                <span class="visually-hidden">Working...</span>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-backdrop fade show" @dblclick="hide()"></div>
      </div>
    </div>
  </teleport>
</template>

<style scoped>
.modal-backdrop {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1040;
  background-color: transparent;
}

.modal-dialog .modal-content {
  background-color: transparent;
  border: none;
  box-shadow: none;
}

.modal.show.d-block {
  display: flex !important;
  align-items: center;
  justify-content: center;
}

.modal-dialog {
  margin: auto;
}
</style>