<script setup lang="ts">
import { computed, ref } from 'vue';

interface Page {
    totalCount: number;
    current: number;
    count: number;
}

const props = defineProps<Page>();

const emit = defineEmits<{
    (event: 'update:current', value: number): void;
    (event: 'update:count', value: number): void;
}>();

const maxPages = 10;
const pageValues = ref([10, 20, 50, 100]);

const currentPage = computed({
    get: () => props.current,
    set: (value) => emit('update:current', value),
})

const itemsPerPage = computed({
    get: () => props.count,
    set: (value) => emit('update:count', value),
})

const totalPages = computed(() => Math.ceil(props.totalCount / itemsPerPage.value))

const pageNumbers = computed(() => {
    const pages = [];

    if (totalPages.value <= maxPages) {
        for (let i = 1; i <= totalPages.value; i++) {
            pages.push(i)
        }
        return pages
    }

    let start = currentPage.value - Math.floor(maxPages / 2)
    let end = currentPage.value + Math.floor(maxPages / 2)

    if (start <= 0) {
        end -= start - 1
        start = 1
    }

    if (end > totalPages.value) {
        start -= end - totalPages.value
        end = totalPages.value
    }

    for (let i = start; i <= end; i++) {
        pages.push(i)
    }

    return pages
})

const changePage = (page: number) => {
    if (page > 0 && page <= totalPages.value) {
        currentPage.value = page
    }
}
</script>

<template>
    <div v-if="totalCount" class="row">
        <div class="col-2 mt-2">
            <label class="col-form-label form-control-sm p-1 fw-bold">Total: {{ totalCount }}</label>
        </div>
        <div class="col">
            <nav class="d-flex justify-content-center mt-2">
                <ul class="pagination pagination-sm">
                    <!-- First Page Button -->
                    <li class="page-item" :class="{ disabled: currentPage === 1 }">
                        <a class="page-link p-1" @click.prevent="changePage(1)">
                            <i class="bi bi-caret-left-fill"></i>
                        </a>
                    </li>
                    <!-- Previous Page Button -->
                    <li class="page-item" :class="{ disabled: currentPage === 1 }">
                        <a class="page-link p-1" @click.prevent="changePage(currentPage - 1)">
                            <i class="bi bi-caret-left"></i>
                        </a>
                    </li>
                    <!-- Page Numbers -->
                    <li v-for="page in pageNumbers" :key="page" class="page-item"
                        :class="{ active: page === currentPage }">
                        <a class="page-link" @click.prevent="changePage(page)">{{ page }}</a>
                    </li>
                    <!-- Next Page Button -->
                    <li class="page-item" :class="{ disabled: currentPage === totalPages }">
                        <a class="page-link p-1" @click.prevent="changePage(currentPage + 1)">
                            <i class="bi bi-caret-right"></i>
                        </a>
                    </li>
                    <!-- Last Page Button -->
                    <li class="page-item" :class="{ disabled: currentPage === totalPages }">
                        <a class="page-link p-1" @click.prevent="changePage(totalPages)">
                            <i class="bi bi-caret-right-fill"></i>
                        </a>
                    </li>
                </ul>
            </nav>
        </div>
        <div class="col-2 mt-2">
            <OptionSelect :values="pageValues" v-model="itemsPerPage" />
        </div>
    </div>
</template>
