<script setup lang="ts">
import ItemsTable from '@/components/ItemsTable.vue';
import { onMounted, reactive, ref, watch } from 'vue'
import { ascendArray } from '@/scripts/utils'

const props = defineProps<{
    parameters: any
}>()

const emit = defineEmits(['update'])

interface Offset {
    start: string,
    end: string
}

const table = reactive({
    headers: [
        { label: "start", value: "start" },
        { label: "end", value: "end" }
    ],
    items: [] as any,
})

const parseParameters = () => {
    if (props.parameters.offsets) {
        props.parameters.offsets.forEach((offset: any) => {
            table.items.push(offset)
        })
    }
}

const offset = ref<Offset>({} as Offset)

const selectSetting = (item: any) => {
    offset.value = item
}

const addSetting = () => {
    offset.value = {
        start: '',
        end: ''
    }
}

const emitSave = (row: any) => {
    const index = table.items.findIndex((item: any) => item.start === row.start)
    if (index >= 0) {
        table.items.splice(index, 1)
    }
    table.items.push({ ...offset.value })
    ascendArray(table.items, 'start')

    emit('update', 'offsets', table.items)
}

const emitDelete = (row: any) => {
    const index = table.items.findIndex((item: any) => item.start === row.start)
    if (index >= 0) {
        table.items.splice(index, 1)
    }
    emit('update', 'offsets', table.items)
}

watch(() => props.parameters, (value) => {
    if (value) {
        parseParameters()
    }
})


onMounted(() => {
    if (props.parameters) {
        parseParameters()
    }
})
</script>

<template>
    <div class="row g-2 align-items-center mb-1">
        <div class="col-2 d-flex justify-content-end">
            <label class="col-form-label form-control-sm p-1">: offsets</label>
        </div>
        <div class="col">
            <ItemsTable refTable="ParameterOffsets" :headers="table.headers" :items="table.items"
                @rowSelected="selectSetting" @addClicked="addSetting">
                <template #header>
                    <InlineInput class="mb-1" label="start" v-model="offset.start" type="text"
                        placeholder="Start Offset" />
                    <InlineInput class="mb-1" label="end" v-model="offset.end" type="text" placeholder="End Offset" />
                    <ElementButtons refTable="ParameterOffsets" @save="emitSave(offset)" @delete="emitDelete(offset)"
                        :watchTargets="offset" :disableDelete="offset.start === ''" />
                </template>
                <template #body="{ item }">
                    <InlineInput class="mb-1" label="start" v-model="item.start" type="text"
                        placeholder="Start Offset" />
                    <InlineInput class="mb-1" label="end" v-model="item.end" type="text" placeholder="End Offset" />
                    <ElementButtons refTable="ParameterOffsets" @save="emitSave(item)" @delete="emitDelete(item)"
                        :watchTargets="item" :disableDelete="item.start === ''" />
                </template>
            </ItemsTable>
        </div>
    </div>
</template>
