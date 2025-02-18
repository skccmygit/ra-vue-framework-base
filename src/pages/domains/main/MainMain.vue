<script setup lang="ts">
import { RouterView } from 'vue-router'
import NavigationBar from './components/NavigationBar.vue'

</script>

<template>
  <div class="container-fluid">
    <div class="row bg-body-tertiary">
      <div class="col">
        <NavigationBar />
      </div>
    </div>
    <div class="row ">
      <div class="col">
        <RouterView v-slot="{ Component }">
          <KeepAlive>
            <component :is="Component" />
          </KeepAlive>
        </RouterView>
      </div>
    </div>
  </div>
</template>
