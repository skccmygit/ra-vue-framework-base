<script setup lang="ts">
import { RouterView } from 'vue-router'
import NoticeModal from "@/components/teleports/NoticeModal.vue";
import SpinnerModal from "@/components/teleports/SpinnerModal.vue";
import ToastPopup from "@/components/teleports/ToastPopup.vue";

</script>

<template>
    <NoticeModal />
    <SpinnerModal />
    <ToastPopup />
    <RouterView />
</template>
