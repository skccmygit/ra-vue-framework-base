<script setup lang="ts">
import { isWriter } from '@/scripts/session';
import { ascendArray, setSequence } from '@/scripts/utils';
import { onMounted, reactive, ref, watch } from 'vue'

const AUTH_MENU = '/main/code'

const props = defineProps<{
    list: any
}>()

const emit = defineEmits(['update'])

interface Code {
    sequence: number,
    codeName: string,
    codeId: string
}

const table = reactive({
    headers: [
        { label: "순서", value: "sequence" },
        { label: "코드ID", value: "codeId" },
        { label: "코드명", value: "codeName" }
    ],
    items: [] as any,
})

const sequence = ref(1)

const code = ref<Code>({} as Code)

const selectSetting = (item: any) => {
    code.value = item
}

const addSetting = () => {
    code.value = {
        sequence: sequence.value,
        codeId: '',
        codeName: ''
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
            <label class="col-form-label form-control-sm p-1">공통코드</label>
        </div>
        <div class="col">
            <ItemsTable refTable="CodeList" :headers="table.headers" :items="table.items" @rowSelected="selectSetting"
                @addClicked="addSetting" :small="true" :nosetting="!isWriter(AUTH_MENU)">
                <template #header>
                    <InlineInput class="mb-1" label="순서" v-model="code.sequence" type="text" placeholder="코드 순서" />
                    <InlineInput class="mb-1" label="코드ID" v-model="code.codeId" type="text" placeholder="코드 ID" />
                    <InlineInput class="mb-1" label="코드명" v-model="code.codeName" type="text" placeholder="코드명" />
                    <ElementButtons refTable="CodeList" @save="emitSave(code)" @delete="emitDelete(code)"
                        :watchTargets="code" :disableDelete="!code.codeId" />
                </template>
                <template #body="{ item }">
                    <InlineInput class="mb-1" label="순서" v-model="item.sequence" type="text" placeholder="코드 순서" />
                    <InlineInput class="mb-1" label="코드ID" v-model="item.codeId" type="text" placeholder="코드 ID" />
                    <InlineInput class="mb-1" label="코드명" v-model="item.codeName" type="text" placeholder="코드명" />
                    <ElementButtons refTable="CodeList" @save="emitSave(item)" @delete="emitDelete(item)"
                        :watchTargets="item" :disableDelete="!item.codeId" />
                </template>
            </ItemsTable>
        </div>
    </div>
</template>
