<script setup lang="ts">
import { ref, watch, reactive } from 'vue'
import { ascendArray, setSequence } from '@/scripts/utils'
import apiCall from '@/scripts/api-call'
import BatchScheduleSetting from './BatchScheduleSetting.vue'
import BatchStatus from './BatchStatus.vue'
import { isWriter } from '@/scripts/session'

const AUTH_MENU = '/main/batch'

const table = reactive({
    headers: [
        { label: "순번", value: "no" },
        { label: "작업 ID", value: "jobId" },
        { label: "작업 그룹", value: "jobGroup" },
        { label: "작업명", value: "jobName" },
        { label: "작업 유형", value: "jobStyleName" },
        { label: "작업 URL", value: "jobUrl" },
        { label: "작업 설명", value: "jobDescription" },
        { label: "실행 방식", value: "jobType" }
    ],
    items: [] as any,
})

const page = reactive({
    total: 0,
    current: 1,
    count: 10,
})

interface BatchJobOperation {
    jobId: number,
    jobGroup: string,
    jobName: string,
    jobUrl: string,
    jobDescription: string,
    jobStyle: string,
    jobType: string,
    jobCron: string,
    jobInterval: number,
    jobInitialDelay: number,
    jobParameters: string | any
}
const operation = ref<BatchJobOperation>({} as BatchJobOperation)
const selectSetting = (item: BatchJobOperation) => {
    operation.value = item
}
const addSetting = () => {
    operation.value = {
        jobId: 0,
        jobGroup: '',
        jobName: '',
        jobUrl: 'http://',
        jobDescription: '',
        jobStyle: 'normal',
        jobType: '',
        jobCron: '',
        jobInterval: 0,
        jobInitialDelay: 0,
        jobParameters: ''
    }
}

const keyword = ref('')

const getBatchSchedules = async () => {
    table.items.length = 0

    const url = '/batch/api/schedule'
    const queryParams = {
        keyword: keyword.value,
        count: page.count,
        offset: page.current - 1
    }
    const { body: pagedList } = await apiCall.get(url, null, queryParams)
    if (pagedList) {
        page.total = pagedList.total
        page.current = pagedList.offset + 1
        table.items = pagedList.list
        table.items.forEach((item: any) => {
            item.jobStyleName = getJobStyleName(item.jobStyle)
        })
        ascendArray(table.items, 'jobId')
        setSequence(table.items, (page.current - 1) * page.count + 1)
    }
}

const getJobStyleName = (style: string) => {
    switch (style) {
        case 'parallel': return '병렬'
        case 'shell': return '쉘'
        case 'ondemand': return 'OnD'
        default: return '일반'
    }
}

const saveSetting = async (item: BatchJobOperation) => {
    const url = '/batch/api/schedule'
    if (item.jobId > 0) {
        await apiCall.put(url, null, item)
    }
    else {
        await apiCall.post(url, null, item)
    }
    getBatchSchedules()
}

const deleteSetting = async (item: BatchJobOperation) => {
    const url = '/batch/api/schedule'
    item.jobParameters = null
    await apiCall.delete(url, null, item)
    getBatchSchedules()
}

watch(() => page.current, () => {
    getBatchSchedules()
})

watch(() => page.count, () => {
    page.current = 1
    getBatchSchedules()
})

</script>

<template>
    <PanelCollapse title="배치작업 관리">
        <div class="row">
            <div class="col">
                <InlineInput label="검색어" v-model="keyword" placeholder="배치 작업명 또는 그룹명"
                    @inputEnterPressed="getBatchSchedules" />
            </div>
            <div class="col-2 d-flex justify-content-end">
                <button class="btn btn-sm btn-primary" @click="getBatchSchedules">검색</button>
            </div>
        </div>
        <ItemsTable refTable="BatchSchedulers" class="mt-2" :headers="table.headers" :items="table.items"
            @rowSelected="selectSetting" @addClicked="addSetting" :noaddition="!isWriter(AUTH_MENU)">
            <template #header>
                <div class="row">
                    <div class="col pe-1">
                        <BatchScheduleSetting :setting="operation" @save="saveSetting" @delete="deleteSetting" />
                    </div>
                    <div class="col ps-1">
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item">작업 그룹은 도메인명과 일치 시키면 관리하기 좋습니다.</li>
                            <li class="list-group-item">작업명은 Spring Batch Job으로 생성한 Bean 명칭을 입력합니다.</li>
                            <li class="list-group-item">작업 URL은 배치 작업이 실행될 경로를 입력합니다.</li>
                            <li class="list-group-item">실행 방식에 맞게 작업 실행 주기를 설정하세요. </li>
                            <li class="list-group-item">병렬 작업은 동시에 처리할 Step수 만큼 offset(start/end)을 지정하세요.</li>
                            <li class="list-group-item">쉘스크립트 작업은 shell 실행 위치와 작업이력 callback을 지정하세요.</li>
                        </ul>
                    </div>
                </div>
            </template>
            <template #body="{ item }">
                <div class="row">
                    <div class="col pe-1">
                        <BatchScheduleSetting :setting="item" @save="saveSetting" @delete="deleteSetting" />
                    </div>
                    <div class="col ps-1">
                        <BatchStatus :operation="item" />
                    </div>
                </div>
            </template>
        </ItemsTable>
        <PageNavigator :totalCount="page.total" v-model:current="page.current" v-model:count="page.count" />
    </PanelCollapse>
</template>