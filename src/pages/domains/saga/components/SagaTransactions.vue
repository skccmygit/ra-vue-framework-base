<script setup lang="ts">
import { ref, watch, reactive, onActivated } from 'vue'
import { ascendArray, setSequence } from '@/scripts/utils'
import apiCall from '@/scripts/api-call'
import SagaTransactionSetting from './SagaTransactionSetting.vue';
import SagaExecutions from './SagaExecutions.vue';
import { isWriter } from '@/scripts/session'
import { isCalledByMenu } from '@/scripts/store-cache';

const AUTH_MENU = '/main/saga'

onActivated(() => {
    if (isCalledByMenu()) {
        // clear cache
        keyword.value = ''
        table.items.length = 0
        page.total = 0
        page.current = 1
    }
})

const table = reactive({
    headers: [
        { label: "순번", value: "no" },
        { label: "트랜잭션 ID", value: "sagaId" },
        { label: "트랜잭션명", value: "sagaName" },
        { label: "API 개수", value: "backendApiCount" }
    ],
    items: [] as any,
})

const page = reactive({
    total: 0,
    current: 1,
    count: 10,
})

interface SagaTransaction {
    id: number,
    sagaId: string,
    sagaName: string,
    backendApiList: any
}
const transaction = ref<SagaTransaction>({} as SagaTransaction)
const selectSetting = (item: SagaTransaction) => {
    transaction.value = item
}
const addSetting = () => {
    transaction.value = {
        id: 0,
        sagaId: '',
        sagaName: '',
        backendApiList: [] as any
    }
}

const keyword = ref('')

const getSagaTransactions = async () => {
    table.items.length = 0

    const url = '/api/saga/transaction/list'
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
            item.backendApiCount = item.backendApiList?.length
        })
        ascendArray(table.items, 'sagaId')
        setSequence(table.items, (page.current - 1) * page.count + 1)
    }
}

const saveSetting = async (item: SagaTransaction) => {
    const url = '/api/saga/transaction'
    await apiCall.post(url, null, item)
    getSagaTransactions()
}

const deleteSetting = async (item: SagaTransaction) => {
    const url = '/api/saga/transaction'
    await apiCall.delete(url, null, item)
    getSagaTransactions()
}

watch(() => page.current, () => {
    getSagaTransactions()
})

watch(() => page.count, () => {
    page.current = 1
    getSagaTransactions()
})

</script>

<template>
    <PanelCollapse title="분산트랜잭션 관리: @SkipSessionValidation">
        <div class="row">
            <div class="col">
                <InlineInput label="검색어" v-model="keyword" placeholder="SAGA 트랜잭션명"
                    @inputEnterPressed="getSagaTransactions" />
            </div>
            <div class="col-2 d-flex justify-content-end">
                <button class="btn btn-sm btn-primary" @click="getSagaTransactions">검색</button>
            </div>
        </div>
        <ItemsTable refTable="SagaTransactions" class="mt-2" :headers="table.headers" :items="table.items"
            @rowSelected="selectSetting" @addClicked="addSetting" :noaddition="!isWriter(AUTH_MENU)">
            <template #header>
                <div class="row">
                    <div class="col pe-1">
                        <SagaTransactionSetting :setting="transaction" @save="saveSetting" @delete="deleteSetting" />
                    </div>
                    <div class="col ps-1">
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item">트랜잭션 ID는 특수 문자가 아닌 알파벳과 숫자를 공백없이('-'사용가능) 사용할 수 있습니다.</li>
                            <li class="list-group-item">트랜잭션명은 한글 또는 영문으로 공백을 포함하여 사용할 수 있습니다.</li>
                            <li class="list-group-item">Backend API는 처리 순서에 맞게 지정합니다.</li>
                        </ul>
                    </div>
                </div>
            </template>
            <template #body="{ item }">
                <div class="row">
                    <div class="col pe-1">
                        <SagaTransactionSetting :setting="item" @save="saveSetting" @delete="deleteSetting" />
                    </div>
                    <div class="col ps-1">
                        <SagaExecutions :execution="item" />
                    </div>
                </div>
            </template>
        </ItemsTable>
        <PageNavigator :totalCount="page.total" v-model:current="page.current" v-model:count="page.count" />
    </PanelCollapse>
</template>