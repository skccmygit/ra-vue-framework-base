<script setup lang="ts">
import BatchSchedules from './components/BatchSchedules.vue';
import OndemandBatch from './components/OndemandBatch.vue';
</script>

<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col border-0 border-start border-end mt-2">
        <BatchSchedules />
        <OndemandBatch class="bg-body-tertiary" />
      </div>
    </div>
  </div>
</template>