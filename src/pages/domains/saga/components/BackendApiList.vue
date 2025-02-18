<script setup lang="ts">
import { ascendArray, setSequence } from '@/scripts/utils';
import { onMounted, reactive, ref, watch } from 'vue'

const props = defineProps<{
    list: any
}>()

const emit = defineEmits(['update'])

interface Backend {
    sequence: number,
    name: string,
    url: string
}

const table = reactive({
    headers: [
        { label: "순서", value: "sequence" },
        { label: "API명", value: "name" },
        { label: "API URL", value: "url" }
    ],
    items: [] as any,
})

const sequence = ref(1)

const backend = ref<Backend>({} as Backend)

const selectSetting = (item: any) => {
    backend.value = item
}

const addSetting = () => {
    backend.value = {
        sequence: sequence.value,
        name: '',
        url: ''
    }
}

const emitSave = (row: any) => {
    const setting = { ...row }
    const index = table.items.findIndex((item: any) => item.sequence === row.sequence)
    if (index >= 0) {
        table.items.splice(index, 1)
    }
    table.items.push(setting)
    ascendArray(table.items, 'sequence')
    setSequence(table.items, 1, 'sequence')
    sequence.value = table.items.length + 1

    emit('update', table.items)
}

const emitDelete = (row: any) => {
    const index = table.items.findIndex((item: any) => item.sequence === row.sequence)
    if (index >= 0) {
        table.items.splice(index, 1)
    }
    ascendArray(table.items, 'sequence')
    setSequence(table.items, 1, 'sequence')
    sequence.value = table.items.length + 1

    emit('update', table.items)
}

watch(() => props.list, (value) => {
    if (value) {
        table.items = [...props.list]
        setSequence(table.items, 1, 'sequence')
        sequence.value = table.items.length + 1
    }
})


onMounted(() => {
    if (props.list) {
        table.items = [...props.list]
        setSequence(table.items, 1, 'sequence')
        sequence.value = table.items.length + 1
    }
})
</script>

<template>
    <div class="row g-2 align-items-center mb-1">
        <div class="col-2 d-flex justify-content-end">
            <label class="col-form-label form-control-sm p-1">Backend API</label>
        </div>
        <div class="col">
            <ItemsTable refTable="BackendApiList" :headers="table.headers" :items="table.items"
                @rowSelected="selectSetting" @addClicked="addSetting" :small="true">
                <template #header>
                    <InlineInput class="mb-1" label="순서" v-model="backend.sequence" type="text"
                        placeholder="API 처리 순서" />
                    <InlineInput class="mb-1" label="API명" v-model="backend.name" type="text"
                        placeholder="Backend API 명" />
                    <InlineInput class="mb-1" label="API URL" v-model="backend.url" type="text" placeholder="http://" />
                    <ElementButtons refTable="BackendApiList" @save="emitSave(backend)" @delete="emitDelete(backend)"
                        :watchTargets="backend" :disableDelete="backend.url === ''" />
                </template>
                <template #body="{ item }">
                    <InlineInput class="mb-1" label="순서" v-model="item.sequence" type="text" placeholder="API 처리 순서" />
                    <InlineInput class="mb-1" label="API명" v-model="item.name" type="text"
                        placeholder="Backend API 명" />
                    <InlineInput class="mb-1" label="API URL" v-model="item.url" type="text" placeholder="http://" />
                    <ElementButtons refTable="BackendApiList" @save="emitSave(item)" @delete="emitDelete(item)"
                        :watchTargets="item" :disableDelete="item.url === ''" />
                </template>
            </ItemsTable>
        </div>
    </div>
</template>
