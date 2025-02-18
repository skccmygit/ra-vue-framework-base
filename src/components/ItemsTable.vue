<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { setCallback } from '@/scripts/store-callbacks'

interface Header {
    label: string,
    value: string
}

interface Props {
    headers: Header[],
    items: any[],
    small?: boolean,
    noheader?: boolean,
    nosetting?: boolean,
    noaddition?: boolean,
    scroll?: boolean,
    multiple?: boolean,
    disableSetting?: boolean,
    refTable?: any,
    disabled?: boolean
}

const props = defineProps<Props>()

const emit = defineEmits(['rowSelected', 'rowSetting', 'addClicked'])

const elementId = crypto.randomUUID();

const toggles = ref(new Map<string | number, boolean>())

const hasToggled = (key: string | number) => toggles.value.get(key) || false

const clearToggles = () => {
    toggles.value.forEach((_, key) => toggles.value.set(key, false))
}

const toggle = (key: string | number) => {
    const current = hasToggled(key)
    if (!props.multiple) {
        toggles.value.forEach((_, entry) => {
            if (entry !== key) toggles.value.set(entry, false)
        })
    }
    toggles.value.set(key, !current)
}

const align = (value: any) => {
    const positions = {
        string: 'text-start',
        number: 'text-end',
        bigint: 'text-end',
        boolean: 'text-center',
        object: 'text-center',
        function: 'text-center',
        symbol: 'text-center',
        undefined: 'text-center'
    }
    return positions[typeof value] || 'text-center'
}

const select = (item: any) => {
    clearToggles()
    emit('rowSelected', item)
}

const setting = (index: number, item: any) => {
    toggle(index)
    emit('rowSetting', item)
}

const addNew = () => {
    if (props.disableSetting || props.noaddition) return
    toggle('th')
    if (hasToggled('th')) emit('addClicked')
}

const isBoolean = (value: any) => typeof value === 'boolean'
const isObject = (value: any): boolean => {
    return value !== null && typeof value === 'object' && !Array.isArray(value);
}

onMounted(() => {
    if (props.refTable) setCallback(props.refTable, clearToggles)
})

const tableClass = computed(() => ({
    'scroll-able': props.scroll,
}))

const headerClass = computed(() => ({
    'text-center pt-0': true,
    'form-control-sm': props.small,
}))

const colors = ['bg-secondary-subtle', 'bg-success-subtle', 'bg-warning-subtle', 'bg-danger-subtle', 'bg-info-subtle', 'bg-primary-subtle']
const getColor = (index: any) => {
    const value = Number(index) || 0
    return colors[value % colors.length]
}

</script>

<template>
    <div class="m-0 p-0" :class="tableClass">
        <table class="table table-hover border-top border-secondary-subtle table-bordered table-sm mb-0">
            <thead v-if="!props.noheader">
                <tr>
                    <th v-for="header in props.headers" :key="header.value" :class="headerClass">
                        {{ header.label }}
                    </th>
                    <th v-if="!props.nosetting" :class="headerClass">
                        <i v-if="hasToggled('th')" class="btn bi bi-dash-circle-fill p-0" @click.prevent="addNew"></i>
                        <i v-else class="btn bi bi-plus-circle-fill p-0"
                            :class="{ 'text-black-50': (props.disableSetting || props.noaddition) }"
                            @click.prevent="addNew"></i>
                    </th>
                </tr>
                <tr v-if="hasToggled('th')">
                    <td :colspan="props.headers.length + 1">
                        <slot name="header"></slot>
                    </td>
                </tr>
            </thead>
            <tbody class="table-group-divider">
                <template v-for="(item, index) in props.items" :key="index">
                    <tr>
                        <td v-for="header in props.headers" :key="header.value" class="text-truncate"
                            :class="[align(item[header.value]), props.small ? 'form-control-sm' : '']"
                            style="max-width: 200px" @click="select(item)">
                            <template v-if="isBoolean(item[header.value])">
                                <input class="form-check-input" type="checkbox" v-model="item[header.value]"
                                    :disabled="props.disabled" />
                            </template>
                            <template v-else-if="isObject(item[header.value])">
                                <select class="form-select form-select-sm" :class="getColor(item[header.value].value)"
                                    v-model="item[header.value].value" :id="elementId" :disabled="props.disabled">
                                    <option v-for="(option, index) in item[header.value].options"
                                        :class="getColor(option.value)" :key="elementId + '-' + index"
                                        :value="option.value">
                                        {{ option.label }}
                                    </option>
                                </select>
                            </template>
                            <template v-else>
                                {{ item[header.value] }}
                            </template>
                        </td>
                        <td v-if="!props.nosetting" class="text-center" @click.prevent="setting(index, item)">
                            <i v-if="hasToggled(index)" class="btn bi bi-dash-circle p-0 border-0"></i>
                            <i v-else class="btn bi bi-plus-circle p-0 border-0"></i>
                        </td>
                    </tr>
                    <tr v-if="hasToggled(index)">
                        <td :colspan="props.headers.length + 1">
                            <slot name="body" :item="item"></slot>
                        </td>
                    </tr>
                </template>
            </tbody>
        </table>
    </div>
</template>

<style scoped>
.scroll-able {
    min-height: 40px;
    max-height: 360px;
    overflow-x: hidden;
    overflow-y: auto;
}
</style>
