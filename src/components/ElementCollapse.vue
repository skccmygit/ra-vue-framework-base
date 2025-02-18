<script setup lang="ts">
import { ref, watch } from 'vue'

const props = defineProps<{
    title: string,
    plain?: boolean
}>()

const emit = defineEmits(['toggled'])

const elementId = crypto.randomUUID()
const toggle = ref(false)

watch(toggle, (value) => {
    emit('toggled', value)
})
</script>

<template>
    <div class="container-fluid m-1 border-0 border-secondary-subtle p-0" :class="props.plain ? '' : 'border-top'">
        <div class="d-flex justify-content-start align-items-center">
            <button class="btn btn-link p-1 pe-2" type="button" data-bs-toggle="collapse"
                :data-bs-target="'#' + elementId" @click="toggle = !toggle">
                <i :class="['bi', toggle ? 'bi-dash-square-dotted' : 'bi-plus-square-dotted']"
                    style="font-size: 1.1em;"></i>
            </button>
            <h6 class="m-0" :class="props.plain ? 'form-control-sm pb-0 ps-0 pt-2' : 'fw-bold'">{{ props.title }}</h6>
        </div>
        <div class="collapse p-1 pt-0" :id="elementId">
            <slot></slot>
        </div>
    </div>
</template>