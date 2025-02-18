<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import apiCall from '@/scripts/api-call'
import { isEmpty } from '@/scripts/validater'
import { useUserSession, updateUserSession } from '@/scripts/session'
import { notifyError } from '@/scripts/store-popups';

const emit = defineEmits(['close'])

const userSession = useUserSession()

const account = reactive({
  userName: userSession.value?.userName,
  userId: userSession.value?.userId,
  userGroupId: userSession.value?.userGroupId,
  userPassword: '',
  passwordConfirm: '',
  userEmail: userSession.value?.userEmail,
  userPhone: userSession.value?.userPhone
})

const updateProfile = async () => {
  if (!isEmpty(account.userPassword) && (account.userPassword !== account.passwordConfirm)) {
    notifyError('비밀번호를 확인하세요.')
    return
  }

  const url = '/api/account/profile'
  const { body: session } = await apiCall.put(url, null, account)
  if (session) {
    updateUserSession(session)
    emitClose()
  }
}

const emitClose = () => {
  emit('close')
}
</script>

<template>
  <div class="container-sm mt-1 p-2" style="width: 480px">
    <InlineInput class="mb-1" label="사용자명" v-model="account.userName" type="text" :disabled="true" />
    <InlineInput class="mb-1" label="사용자ID" v-model="account.userId" type="text" :disabled="true" />
    <InlineInput class="mb-1" label="그룹ID" v-model="account.userGroupId" type="text" :disabled="true" />
    <div class="row mb-1">
      <div class="col-2 p-0 d-flex justify-content-end">
        <label class="col-form-label form-control-sm p-1">비밀번호</label>
      </div>
      <div class="col ps-2">
        <InlineInput v-model="account.userPassword" type="password" placeholder="비밀번호" />
      </div>
      <div class="col ps-2">
        <InlineInput v-model="account.passwordConfirm" type="password" placeholder="비밀번호 확인" />
      </div>
    </div>
    <InlineInput class="mb-1" label="이메일" v-model="account.userEmail" type="text" placeholder="이메일" />
    <InlineInput class="mb-1" label="전화번호" v-model="account.userPhone" type="text" placeholder="전화번호" />
    <div class="d-flex justify-content-end">
      <button class="btn btn-primary btn-sm me-1" @keydown.enter="updateProfile" @click="updateProfile">수정</button>
      <button class="btn btn-secondary btn-sm" @keydown.enter="updateProfile" @click="emitClose">취소</button>
    </div>
  </div>
</template>