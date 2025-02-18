<script setup lang="ts">
import { ref } from 'vue'
import apiCall from '@/scripts/api-call'
import { useUserSession } from '@/scripts/session';
import { popToast } from '@/scripts/store-popups';
import { isEmpty } from '@/scripts/validater';

const AUTH_TIMEOUT = 60
const userMaskingButton = ref<HTMLButtonElement | null>(null)

interface UserSetting {
  userId: string,
  userName: string,
  userEmail: string,
  userPhone: string,
  userGroupId: string
}

const userSetting = ref<UserSetting>({} as UserSetting)

const show = async (setting: UserSetting) => {
  const element = document.getElementById('userMasking')
  if (element && !element.classList.contains('show')) {
    userSetting.value = setting
    userMaskingButton.value?.click()
  }
}

const userSession = useUserSession()

const authCode = ref('')

const intervalId = ref(0)

const clearAuthCode = () => {
  if (intervalId.value > 0) {
    clearInterval(intervalId.value)
    remainedSeconds.value = AUTH_TIMEOUT
    intervalId.value = 0
  }
}
const remainedSeconds = ref(AUTH_TIMEOUT)

const requestAuthCode = async () => {
  if (intervalId.value > 0) {
    clearAuthCode()
  }

  if (isEmpty(userSetting.value.userPhone)) {
    popToast('인증코드를 전송할 전화번호가 없습니다.')
    return
  }

  const url = '/api/auth/code/send'
  const requestBody = {
    userId: userSetting.value.userId,
    customerId: userSetting.value.userId,
    customerPhone: userSetting.value.userPhone
  }
  const { body: authResponse } = await apiCall.post(url, null, requestBody)

  popToast(`[${userSetting.value.userPhone}]번호로 인증코드가 전송되었습니다.`)

  intervalId.value = setInterval(() => {
    remainedSeconds.value -= 1
    if (remainedSeconds.value <= 0) {
      clearAuthCode()
    }
  }, 1000)

  if (authResponse) {
    setTimeout(() => {
      popToast(`고객이 인증코드를 알려 주었습니다.`)
      authCode.value = authResponse.authCode
    }, 3000)
  }
}

const unlockMasking = async () => {
  clearAuthCode()

  const url = '/api/auth/masking/unlock'
  const requestBody = {
    userId: userSession.value?.userId,
    customerId: userSetting.value.userId,
    authCode: authCode.value
  }
  await apiCall.post(url, null, requestBody)
}

defineExpose({
  show
})
</script>

<template>
  <button v-show="false" ref="userMaskingButton" type="button" class="btn btn-primary" data-bs-toggle="modal"
    data-bs-target="#userMasking">
    Launch modal
  </button>
  <div class="modal fade" id="userMasking" tabindex="-1" data-bs-backdrop="static" data-bs-keyboard="false">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header  bg-success-subtle">
          <h1 class="modal-title fs-5" id="userMaskingLabel">고객정보 마스킹 해제</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"
            @click="clearAuthCode"></button>
        </div>
        <div class="modal-body row">
          <InlineInput class="mb-0" label="사용자ID" v-model="userSetting.userId" type="text" :disabled="true" />
          <InlineInput class="mb-0" label="사용자명" v-model="userSetting.userName" type="text" :disabled="true" />
          <InlineInput class="mb-0" label="전화번호" v-model="userSetting.userPhone" type="text" :disabled="true" />
          <InlineInput class="mb-0" label="인증번호" v-model="authCode" type="text" placeholder="인증번호 6자리" :append="true">
            <button type="button" class="btn btn-primary btn-sm" @click="requestAuthCode"
              :disabled="remainedSeconds < AUTH_TIMEOUT">
              <span v-if="remainedSeconds === AUTH_TIMEOUT"> 인증번호전송</span>
              <span v-else> 남은시간: {{ remainedSeconds }} </span>
            </button>
          </InlineInput>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary btn-sm" data-bs-dismiss="modal" @click="unlockMasking"
            :disabled="isEmpty(authCode)">확인</button>
          <button type="button" class="btn btn-secondary btn-sm" data-bs-dismiss="modal"
            @click="clearAuthCode">취소</button>
        </div>
      </div>
    </div>
  </div>
</template>
