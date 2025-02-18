import { reactive } from 'vue'

const map = reactive(new Map())

export const setNoticeModal = (component: any) => {
    map.set("NoticeModal", component);
}
export const notifySuccess = (message: string) => {
    map.get("NoticeModal")?.success(message);
}
export const notifyError = (message: any) => {
    map.get("NoticeModal")?.error(message);
}
export const notifyInfo = (message: string) => {
    map.get("NoticeModal")?.info(message);
}
export const notifyConfirm = (message: string, callback: Function) => {
    map.get("NoticeModal")?.confirm(message, callback);
}

export const setToastPopup = (component: any) => {
    map.set("ToastPopup", component);
}
export const popToast = (message: string) => {
    map.get("ToastPopup")?.show(message);
}

export const setSpinnerModal = (show: Function, hide: Function) => {
    map.set("SpinnerModal", { show: show, hide: hide });
}
export const showSpinner = () => {
    map.get("SpinnerModal")?.show()
}
export const hideSpinner = () => {
    map.get("SpinnerModal")?.hide()
}

export const setDropdownPanel = (component: any) => {
    map.set("DropdownPanel", component);
}
export const showDropdown = () => {
    map.get("DropdownPanel")?.show()
}
export const hideDropdown = () => {
    map.get("DropdownPanel")?.hide()
}
