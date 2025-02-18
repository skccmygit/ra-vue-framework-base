<script setup lang="ts">
import { reactive, ref } from 'vue'
import { isWriter } from '@/scripts/session';
import UserMaskingModal from './UserMaskingModal.vue';

const AUTH_MENU = '/main/user'

interface UserSetting {
    userId: string,
    userName: string,
    userEmail: string,
    userPhone: string,
    userGroupId: string
}

const props = defineProps<{
    setting: UserSetting
}>()

const emit = defineEmits(['save', 'delete'])

const watchTargets = reactive({
    userGroupId: props.setting.userGroupId,
})

const emitSave = () => {
    const setting = {} as UserSetting
    setting.userId = props.setting.userId
    setting.userName = props.setting.userName
    setting.userEmail = props.setting.userEmail
    setting.userPhone = props.setting.userPhone
    setting.userGroupId = watchTargets.userGroupId
    emit('save', setting)
}

const emitDelete = () => {
    emit('delete', props.setting)
}

const refUserMaskingModal = ref<any>(null)
const unlockMasking = () => {
    refUserMaskingModal.value.show(props.setting)

}
</script>

<template>
    <div class="p-1 bg-primary-subtle">
        <InlineInput class="mb-1" label="사용자명" v-model="props.setting.userName" type="text" :disabled="true" />
        <InlineInput class="mb-1" label="사용자ID" v-model="props.setting.userId" type="text" :disabled="true" />
        <InlineInput class="mb-1" label="이메일" v-model="props.setting.userEmail" type="text" :disabled="true" />
        <InlineInput class="mb-1" label="전화번호" v-model="props.setting.userPhone" type="text" :disabled="true" />
        <OptionSelectByCode label="그룹ID" codeGroupId="user_auth_group" v-model="watchTargets.userGroupId"
            :disabled="!isWriter(AUTH_MENU)" />
        <div class="row g-2">
            <div class="col-2">
            </div>
            <div class="col d-flex justify-content-start mt-2">
                <TooltipBox tips="마스킹 해제" :no-icon="true" class="mt-2">
                    <button class="btn btn-sm btn-primary" @click="unlockMasking">
                        <i class="bi bi-eye-fill"></i>
                    </button>
                </TooltipBox>
            </div>
            <div class="col">
                <ElementButtons v-if="isWriter(AUTH_MENU)" refTable="UserPane" @save="emitSave" @delete="emitDelete"
                    :watchTargets="watchTargets" :disableDelete="!props.setting.userId" />
            </div>
        </div>
    </div>
    <UserMaskingModal ref="refUserMaskingModal" />
</template>
