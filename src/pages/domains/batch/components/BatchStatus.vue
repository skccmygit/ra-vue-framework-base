<script setup lang="ts">
import { reactive, ref } from 'vue'
import { setSequence } from '@/scripts/utils'
import apiCall from '@/scripts/api-call'
import { notifyConfirm } from '@/scripts/store-popups'
import StepStatusModal from './StepStatusModal.vue'
import { isWriter } from '@/scripts/session'

const AUTH_MENU = '/main/batch'

interface BatchJobOperation {
    jobId: number,
    jobGroup: string,
    jobName: string,
    jobUrl: string,
    jobDescription: string,
    jobType: string,
    jobCron: string,
    jobInterval: number,
    jobInitialDelay: number,
    jobParameters: string | any,
    jobStyle: string
}
const props = defineProps<{
    operation: BatchJobOperation
}>()

const table = reactive({
    headers: [
        { label: "순번", value: "no" },
        { label: "실행ID", value: "jobExecutionId" },
        { label: "작업명", value: "jobName" },
        { label: "시작시간", value: "jobStartTime" },
        { label: "종료시간", value: "jobEndTime" },
        { label: "작업상태", value: "jobStatus" },
        { label: "종료상태", value: "jobExitStatus" }
    ],
    items: [] as any,
})

const tableShell = reactive({
    headers: [
        { label: "순번", value: "no" },
        { label: "작업명", value: "jobName" },
        { label: "스크립트", value: "shell" },
        { label: "시작시간", value: "jobStartTime" },
        { label: "종료시간", value: "jobEndTime" },
        { label: "시도", value: "jobItemsRead" },
        { label: "완료", value: "jobItemsWrite" },
        { label: "종료상태", value: "jobExitStatus" }
    ],
    items: [] as any,
})
const page = reactive({
    total: 0,
    current: 0,
    count: 10,
})

const getBatchHistory = async () => {
    table.items.length = 0
    tableShell.items.length = 0
    page.current = 0
    await appendBatchHistory()
}

const appendBatchHistory = async () => {
    let url = `/batch/api/history?count=${page.count}&offset=${page.current}`

    if (props.operation.jobStyle === 'shell') {
        url = `/batch/api/shell/history?count=${page.count}&offset=${page.current}`
    }

    const requestBody = { ...props.operation }
    requestBody.jobParameters = null
    const { body: pagedList } = await apiCall.post(url, null, requestBody)
    if (pagedList) {
        page.total = pagedList.total
        page.current = pagedList.offset + 1

        pagedList.list.forEach((item: any) => {
            table.items.push(item)
        })
        pagedList.list.forEach((item: any) => {
            tableShell.items.push(item)
        })

        setSequence(table.items, 1)
        setSequence(tableShell.items, 1)
    }
}

const startJob = async () => {
    notifyConfirm(`[${props.operation.jobName}] 작업을 시작 할까요?`, async (yes: boolean) => {
        if (yes) {
            const requestBody = { ...props.operation }
            requestBody.jobParameters = null
            const url = '/batch/api/operation/start'
            await apiCall.post(url, null, requestBody)
        }
    })
}

const stopJob = async () => {
    notifyConfirm(`[${props.operation.jobName}] 작업을 정지 할까요?`, async (yes: boolean) => {
        if (yes) {
            const requestBody = { ...props.operation }
            requestBody.jobParameters = null
            const url = '/batch/api/operation/stop'
            await apiCall.post(url, null, requestBody)
        }
    })
}

const refStepStatusModal = ref<any>(null)

const showStepHistory = (jobStatus: any) => {
    refStepStatusModal.value.show(jobStatus)
}

</script>

<template>
    <div class="p-1 bg-secondary-subtle">
        <div class="row g-2 align-items-center mb-1">
            <div class="col d-flex justify-content-end">
                <button v-if="isWriter(AUTH_MENU)" class="btn btn-sm btn-danger me-2" @click="startJob">
                    작업 실행
                </button>
                <button v-if="isWriter(AUTH_MENU)" class="btn btn-sm btn-danger me-2" @click="stopJob">
                    작업 정지
                </button>
                <button class="btn btn-sm btn-primary me-1" @click="getBatchHistory">
                    작업 이력
                </button>
                <button v-if="page.total === -1" class="btn btn-sm btn-outline-primary" @click="appendBatchHistory">
                    <i class="bi bi-caret-down"></i>
                </button>
            </div>
        </div>
        <ItemsTable v-if="props.operation.jobStyle !== 'shell'" refTable="BatchOperation" class="mt-2"
            @rowSelected="showStepHistory" :headers="table.headers" :items="table.items" :nosetting="true"
            :scroll="true" :small="true">
        </ItemsTable>
        <ItemsTable v-else refTable="BatchOperation" class="mt-2" :headers="tableShell.headers"
            :items="tableShell.items" :nosetting="true" :scroll="true" :small="true">
        </ItemsTable>
    </div>
    <StepStatusModal ref="refStepStatusModal" />
</template>