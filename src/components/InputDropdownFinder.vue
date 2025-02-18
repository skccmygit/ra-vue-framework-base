<script setup lang="ts">
import { ref, computed, watch, nextTick } from 'vue'

const props = defineProps<{
    modelValue: any
    label: any
    titles: any
    search: Function
    disabled?: boolean
    placeholder?: string
}>()

const emit = defineEmits(['update:modelValue', 'itemSelected'])

const focusedItemIndex = ref(-1)
const refDropdown = ref<HTMLElement | null>(null)
const elementId = crypto.randomUUID()
const items = ref<any>([])

const value = computed({
    get() {
        return props.modelValue
    },
    set(newValue) {
        emit('update:modelValue', newValue)
        if (!newValue) {
            items.value.length = 0
        }
    },
})

const focusOnDropdown = () => {
    if (items.value.length > 0) {
        focusedItemIndex.value = 0
        nextTick(() => {
            const dropdown = refDropdown.value?.children[focusedItemIndex.value] as any
            dropdown.focus()
        })
    }
}

const focusNextItem = () => {
    if (focusedItemIndex.value < items.value.length - 1) {
        focusedItemIndex.value++
        const dropdown = refDropdown.value?.children[focusedItemIndex.value] as any
        dropdown.focus()
    }
}

const focusPreviousItem = () => {
    if (focusedItemIndex.value > 0) {
        focusedItemIndex.value--
        const dropdown = refDropdown.value?.children[focusedItemIndex.value] as any
        dropdown.focus()
    }
}

const selectItem = (item: any) => {
    emit('itemSelected', item)
    setTimeout(() => {
        items.value.length = 0
    }, 250)
}

const fetchItems = () => {
    if (props.search) {
        props.search(props.modelValue, (list: any) => {
            items.value.length = 0
            list.forEach((item: any) => {
                item.dropdownTitle = ''
                props.titles.forEach((title: string) => {
                    item.dropdownTitle += `<span class="item-found">${item[title]}</span>`
                })
                items.value.push(item)
            })
        })
    }
}

const handleKeyup = (event: any) => {
    emit('update:modelValue', event.value)
    if (value) {
        fetchItems()
    } else {
        items.value.length = 0
    }
}

const handleKeydown = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
        items.value.length = 0
    }
}

watch(
    () => items.value.length,
    (value) => {
        if (value === 0) {
            focusedItemIndex.value = -1
        }
    }
)
</script>


<template>
    <div class="input-group">
        <span class="input-group-text fw-bold">{{ label }}<i class="bi bi-search ps-2"></i></span>
        <div class="form-control dropdown-container ">
            <input type="text" v-model="value" class="form-control border-0" :id="elementId"
                :placeholder="props.placeholder" :disabled="props.disabled" @keydown="handleKeydown"
                @keyup="handleKeyup($event.target)" @keydown.down="focusOnDropdown" />
            <ul v-if="items.length > 0" class="list-group scrollable-dropdown" ref="refDropdown"
                @keydown="handleKeydown">
                <li v-for="(item, index) in items" :key="index" tabindex="0" class="list-group-item"
                    :class="{ 'active': focusedItemIndex === index }" @keydown.down.prevent="focusNextItem"
                    @keydown.up.prevent="focusPreviousItem" @click.prevent="selectItem(item)"
                    @keydown.enter="selectItem(item)" v-html="item.dropdownTitle" />
            </ul>
        </div>
    </div>
</template>

<style scoped>
.dropdown-container {
    position: relative;
}

.scrollable-dropdown {
    position: absolute;
    left: 0;
    top: 100%;
    z-index: 10;
    max-height: 300px;
}

:deep(.item-found) {
    display: inline-block;
    width: 100%;
    text-align: start;
    border-right: 1px solid #0000009d;
}

:deep(.item-found:last-child) {
    border-right: none;
}
</style>
