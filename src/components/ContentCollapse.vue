<script setup lang="ts">
import { ref, watch } from 'vue'
import { hasAuthMenu } from '@/scripts/session';
import { isEmpty } from '@/scripts/validater';

const props = defineProps<{
    title: string,
    selectedTitle?: string,
    authMenu?: string
}>()

const emit = defineEmits(['toggled'])

const elementId = crypto.randomUUID()
const toggle = ref(false)

watch(toggle, (value: any) => {
    emit('toggled', value)
})
</script>

<template>
    <div v-if="!isEmpty(props.authMenu) && hasAuthMenu(props.authMenu)" class="container-fluid mt-1 me-0 p-0">
        <div class="d-flex justify-content-start align-items-center">
            <button class="btn btn-link" type="button" data-bs-toggle="collapse" :data-bs-target="'#' + elementId"
                @click="toggle = !toggle">
                <i :class="['bi', toggle ? 'bi-dash-square' : 'bi-plus-square']" style="font-size: 1.2em;"></i>
            </button>
            <h5 class="fw-bold m-0">
                <span v-if="props.selectedTitle" class="text-danger">{{ props.selectedTitle }} : </span>
                <span>{{ props.title }}</span>
            </h5>
        </div>
        <div class="collapse ms-2 me-2 p-2 border-bottom border-2" :id="elementId">
            <slot></slot>
        </div>
    </div>
</template>
