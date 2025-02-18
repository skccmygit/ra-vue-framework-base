<script setup lang="ts">
import { onMounted } from 'vue';

interface Usage {
  tag: string[],
  props: string[],
  emits: string[],
}

const props = defineProps<{
  title: string,
  usage: Usage
}>()

onMounted(() => {
  props.usage.tag.unshift('')
  props.usage.props.unshift('')
  props.usage.emits.unshift('')
})

</script>

<template>
  <div class="container-fluid border">
    <div class="row mt-1">
      <p class="fs-3 mb-0"><i class="bi bi-c-circle-fill me-2"></i>{{ props.title }}</p>
    </div>
    <div class="row m-1">
      <div class="col-2 bg-body-tertiary d-flex justify-content-center">
        <div class="p-2 fw-bold">컴포넌트 예시 </div>
      </div>
      <div class="col">
        <slot></slot>
      </div>
    </div>
    <div class="row m-1">
      <div class="col-2 bg-body-tertiary d-flex justify-content-center">
        <div class="p-2 fw-bold">컴포넌트 사용방법 </div>
      </div>
      <div class="col">
        <div class="bd-example-snippet bd-code-snippet">
          <div class="d-flex align-items-center highlight-toolbar ps-3 pe-2 py-1 border-0 border-top">
            <small class="font-monospace text-body-secondary text-uppercase fw-bold">tag</small>
          </div>
          <div class="bg-light-subtle p-0 mb-1">
            <pre class="m-0 ps-2">
              {{ props.usage.tag.join('\n') }}
            </pre>
          </div>
          <div class="d-flex align-items-center highlight-toolbar ps-3 pe-2 py-1 border-0 border-top">
            <small class="font-monospace text-body-secondary text-uppercase fw-bold">props</small>
          </div>
          <div class="bg-light-subtle p-1 mb-1">
            <pre class="m-0 ps-2">
              {{ props.usage.props.join('\n') }}
            </pre>
          </div>
          <div class="d-flex align-items-center highlight-toolbar ps-3 pe-2 py-1 border-0 border-top">
            <small class="font-monospace text-body-secondary text-uppercase fw-bold">emits</small>
          </div>
          <div class="bg-light-subtle p-1">
            <pre class="m-0 ps-2">
              {{ props.usage.emits.join('\n') }}
            </pre>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>