<script setup lang="ts">
import { reactive } from 'vue'
import apiCall from '@/scripts/api-call'
import { popToast } from '@/scripts/store-popups';
import { isWriter } from '@/scripts/session'

const AUTH_MENU = '/main/batch'

const startOndemand = async () => {
    const url = '/batch/api/operation/ondemand'
    const requestBody = {
        jobGroup: "sample",
        jobName: "sampleJobOnDemand",
        jobUrl: "http://localhost:8100/batch/api/sample/ondemand",
        jobDescription: "the on-demand sample job",
        jobParameters: {
            callback: null
        }
    }
    const response = await apiCall.post(url, null, requestBody)
    if (response.result == apiCall.Response.SUCCESS) {
        popToast('배치 작업이 시작되었습니다.')
        pollStatus(response.body)
    }
    else {
        popToast(`작업 요청이 실패하였습니다. error=${response.message}`)
    }
}

const poll = reactive({
    intervalId: 0,
    progress: 'width: 0%',
    count: 0,
    color: 'progress-bar-striped progress-bar-animated bg-info',
    duration: ''
})

const pollStatus = (batchStatus: any) => {
    if (poll.intervalId > 0) {
        clearInterval(poll.intervalId)
    }
    poll.intervalId = 0
    poll.progress = 'width: 0%'
    poll.count = 0
    poll.color = 'progress-bar-striped progress-bar-animated bg-info'
    poll.duration = ''

    poll.intervalId = setInterval(async () => {
        const url = '/batch/api/history/poll'
        const response = await apiCall.post(url, null, batchStatus)
        if (response.result === apiCall.Response.SUCCESS) {
            poll.count++
            poll.progress = `width: ${poll.count * 5}%`
            if (response.body.jobStatus === 'COMPLETED') {
                poll.progress = 'width: 100%'
                poll.color = 'bg-success'
                poll.duration = ` COMPLETED (${response.body.jobStartTime} - ${response.body.jobEndTime})`
                clearInterval(poll.intervalId)
                poll.intervalId = 0
            }
            if (response.body.jobStatus === 'STOPPED') {
                poll.progress = 'width: 100%'
                poll.color = 'bg-danger'
                poll.duration = ` STOPPED (${response.body.jobStartTime} - ${response.body.jobEndTime})`
                clearInterval(poll.intervalId)
                poll.intervalId = 0
            }
        } else {
            popToast(`작업 상태 조회 실패. error=${response.message}`)
            poll.color = 'bg-danger'
            clearInterval(poll.intervalId)
            poll.intervalId = 0
        }
    }, 1000)
}

</script>

<template>
    <PanelCollapse title="On-demand배치: 예시">
        <div class="row">
            <div class="col-2 d-flex justify-content-start">
                <button :disabled="!isWriter(AUTH_MENU)" class="btn btn-sm btn-primary"
                    @click="startOndemand">'sampleJobOnDemand' 실행</button>
            </div>
            <div class="col">
                <div class="progress" role="progressbar" style="height: 31px;">
                    <div class="progress-bar w-10" :class="poll.color" :style="poll.progress">
                        {{ poll.count }} {{ poll.duration }}
                    </div>
                </div>
            </div>
        </div>
    </PanelCollapse>
</template>