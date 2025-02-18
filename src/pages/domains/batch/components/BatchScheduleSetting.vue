<script setup lang="ts">
import { onMounted, reactive, ref, watch } from 'vue'
import { isValidCronExpression } from '@/scripts/batch'
import CronExpressionModal from './CronExpressionModal.vue';
import ParameterOffsets from './ParameterOffsets.vue';
import ParameterShell from './ParameterShell.vue';
import ParameterOndemand from './ParameterOndemand.vue';
import { isWriter } from '@/scripts/session'

const AUTH_MENU = '/main/batch'

const cronExpressionModal = ref<any>(null)

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
const props = defineProps<{
    setting: BatchJobOperation
}>()

const emit = defineEmits(['save', 'delete'])

const watchTargets = reactive({
    jobGroup: props.setting.jobGroup,
    jobName: props.setting.jobName,
    jobUrl: props.setting.jobUrl,
    jobDescription: props.setting.jobDescription,
    jobStyle: props.setting.jobStyle,
    jobType: props.setting.jobType,
    jobCron: props.setting.jobCron,
    jobInterval: props.setting.jobInterval,
    jobInitialDelay: props.setting.jobInitialDelay,

    jobParameters: {} as any,
    jobParameterType: '',
    jobParameterCallback: 'http://',
    jobParameterShell: '',

    timestamp: 0
})

const jobTypes = ref(['cron', 'fixedDelay', 'fixedRate'])

const jobStyles = reactive([
    { label: '일반', value: 'normal' },
    { label: '병렬', value: 'parallel' },
    { label: '쉘', value: 'shell' },
    { label: 'OnD', value: 'ondemand' }
])

const updateJobParameters = (key: string, value: any) => {
    if (key === 'offsets') {
        delete watchTargets.jobParameters.shell
        delete watchTargets.jobParameters.callback
    } else if (key === 'shell' || key === 'callback') {
        delete watchTargets.jobParameters.offsets
    }
    watchTargets.timestamp = Date.now()
    watchTargets.jobParameters[key] = value
}

const emitSave = () => {
    const setting = {} as BatchJobOperation
    setting.jobId = props.setting.jobId
    setting.jobGroup = watchTargets.jobGroup
    setting.jobName = watchTargets.jobName
    setting.jobUrl = watchTargets.jobUrl
    setting.jobDescription = watchTargets.jobDescription
    setting.jobStyle = watchTargets.jobStyle
    setting.jobType = watchTargets.jobStyle === 'ondemand' ? 'ondemand' : watchTargets.jobType
    setting.jobCron = watchTargets.jobCron
    setting.jobInterval = watchTargets.jobInterval
    setting.jobInitialDelay = watchTargets.jobInitialDelay
    setting.jobParameters = watchTargets.jobParameters
    emit('save', setting)
}

const emitDelete = () => {
    emit('delete', props.setting)
}

watch(() => props.setting.jobParameters, (value) => {
    if (value) {
        watchTargets.jobParameters = JSON.parse(props.setting.jobParameters)
    }
})

onMounted(() => {
    if (props.setting.jobParameters) {
        watchTargets.jobParameters = JSON.parse(props.setting.jobParameters)
        watchTargets.jobParameterType = watchTargets.jobParameters.offsets ? 'offsets' : (watchTargets.jobParameters.shell ? 'shell' : '')
    }
})
</script>

<template>
    <div class="p-1 bg-primary-subtle">
        <InlineInput class="mb-1" label="작업 그룹" v-model="watchTargets.jobGroup" type="text" placeholder="Job Group" />
        <InlineInput class="mb-1" label="작업명" v-model="watchTargets.jobName" type="text" placeholder="Job Name"
            :append="true">
            <OptionRadio :options="jobStyles" v-model="watchTargets.jobStyle" />
        </InlineInput>
        <InlineInput class="mb-1" label="작업 URL" v-model="watchTargets.jobUrl" type="text" placeholder="Job URL" />
        <InlineInput class="mb-1" label="작업 설명" v-model="watchTargets.jobDescription" type="text"
            placeholder="Job Description" />
        <template v-if="watchTargets.jobStyle !== 'ondemand'">
            <OptionSelect class="mb-1" label="실행 방식" :values="jobTypes" v-model="watchTargets.jobType" />
            <template v-if="watchTargets.jobType === 'cron'">
                <InlineInput class="mb-1" label="Cron 표현식" v-model="watchTargets.jobCron" type="text"
                    placeholder="Cron Expression" :warning="!isValidCronExpression(watchTargets.jobCron)"
                    :append="true">
                    <button class="btn btn-sm btn-primary" @click="cronExpressionModal.show()">
                        Cron 표현식
                    </button>
                </InlineInput>
            </template>
            <template v-else>
                <InlineInput class="mb-1" label="반복주기(초)" v-model="watchTargets.jobInterval" type="number"
                    placeholder="Job Interval" />
                <InlineInput class="mb-1" label="최초실행지연(초)" v-model="watchTargets.jobInitialDelay" type="number"
                    placeholder="Initial Delay" />
            </template>
            <ParameterShell v-if="watchTargets.jobStyle === 'shell'" :parameters="watchTargets.jobParameters"
                @update="updateJobParameters" />
            <ParameterOffsets v-if="watchTargets.jobStyle === 'parallel'" :parameters="watchTargets.jobParameters"
                @update="updateJobParameters" />
        </template>
        <template v-else>
            <ParameterOndemand :parameters="watchTargets.jobParameters" @update="updateJobParameters" />
        </template>
        <ElementButtons v-if="isWriter(AUTH_MENU)" refTable="BatchSchedulers" @save="emitSave" @delete="emitDelete"
            :watchTargets="watchTargets" :disableDelete="props.setting.jobId === 0" />
    </div>
    <CronExpressionModal ref="cronExpressionModal" v-model="watchTargets.jobCron" />
</template>
