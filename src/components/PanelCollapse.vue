<script setup lang="ts">
import { ref, watchEffect } from 'vue';

interface iProps {
    title: string;
}

const props = defineProps<iProps>()
const emit = defineEmits<{ (event: 'toggled', value: boolean): void }>()

const toggle = ref(false)
const elementId = crypto.randomUUID()

watchEffect(() => {
    emit('toggled', toggle.value)
})
</script>

<template>
    <div class="container-fluid mt-1 border p-0">
        <div class="d-flex justify-content-start align-items-center">
            <button class="btn btn-link" type="button" data-bs-toggle="collapse" :data-bs-target="'#' + elementId"
                @click="toggle = !toggle">
                <i :class="['bi', toggle ? 'bi-dash-square' : 'bi-plus-square']" style="font-size: 1.1em;"></i>
            </button>
            <h6 class="fw-bold m-0">{{ props.title }}</h6>
        </div>
        <div class="collapse ms-2 p-2 pt-0" :id="elementId">
            <slot></slot>
        </div>
    </div>
</template>
