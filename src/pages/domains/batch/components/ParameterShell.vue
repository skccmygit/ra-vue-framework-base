<script setup lang="ts">
import { onMounted, reactive, watch } from 'vue'

const props = defineProps<{
    parameters: any
}>()

const emit = defineEmits(['update'])

const parameter = reactive({
    shell: '',
    callback: ''
})

watch(() => props.parameters, (value) => {
    if (value) {
        parameter.shell = props.parameters.shell
        parameter.callback = props.parameters.callback
    }
})

watch(() => parameter.shell, (value) => {
    if (value) {
        emit('update', 'shell', value)
    }
})

watch(() => parameter.callback, (value) => {
    if (value) {
        emit('update', 'callback', value)
    }
})

onMounted(() => {
    if (props.parameters) {
        parameter.shell = props.parameters.shell
        parameter.callback = props.parameters.callback
    }
})
</script>

<template>
    <InlineInput class="mb-1" label=": shell" type="text" placeholder="쉘 실행위치" v-model="parameter.shell" />
    <InlineInput class="mb-1" label=": callback" type="text" placeholder="이력수신 URL" v-model="parameter.callback" />
</template>
