
import { ref, toRaw, toRef } from 'vue'
import { encodeToBase64, decodeFromBase64 } from '@/scripts/utils'
import { useRouter } from 'vue-router'
import { buildAuthMenuGroups, getAllAuthMenus } from './store-menus'

const SESSION_USER = 'vue-base-ui'

interface AuthMenu {
    systemId: string,
    systemName: string,
    menuId: string,
    menuName: string,
    authLevel: number
}
interface UserSession {
    userId: string,
    userGroupId: string,
    userName: string,
    userEmail: string,
    userPhone: string,
    sessionId: string,
    authMenus: AuthMenu[]
}

const userSession = ref<UserSession | null>(null)

const getCookie = (name: string): string | null => {
    // not accessible if cookie is 'HttpOnly' or 'Secure'
    const value = `; ${document.cookie}`
    const parts = value.split(`; ${name}=`)
    if (parts.length === 2) {
        return parts.pop()?.split(';').shift() || null
    }
    return null
}

export const authLevel = { none: 0, reader: 1, writer: 2, admin: 3 }

export const useUserSession = () => {
    if (!userSession.value) {
        const storedSession = getStoredUserSession()
        if (storedSession) {
            const bffSession = getCookie('Bff-Session')
            if (storedSession.sessionId === bffSession) {
                userSession.value = storedSession
                buildAuthMenuGroups(storedSession.authMenus)
                console.log('Stored-session reused by valid Bff-Session')
            }
        }
    }
    return toRef(userSession)
}

export const setUserSession = (session: UserSession | any) => {
    userSession.value = session
    localStorage.setItem(SESSION_USER, encodeToBase64(toRaw(userSession.value)))
    buildAuthMenuGroups(session.authMenus)
}

export const updateUserSession = (session: UserSession | any) => {
    if (userSession.value) {
        userSession.value.userEmail = session.userEmail
        userSession.value.userPhone = session.userPhone
        userSession.value.authMenus = session.authMenus
    }
}
export const getStoredUserSession = () => {
    const item = localStorage.getItem(SESSION_USER)
    return item ? decodeFromBase64(item) : null
}

export const clearUserSession = () => {
    userSession.value = null
}

export const getAuthMenuLevel = (menuId?: string): number => {
    if (!menuId) {
        const router = useRouter()
        menuId = router.currentRoute.value.path
    }
    if (userSession.value && userSession.value.authMenus) {
        const authMenu = userSession.value.authMenus.find(menu => menu.menuId === menuId);
        return authMenu ? authMenu.authLevel : 0;
    }
    return 0;
}

export const hasAuthMenu = (menuId?: string): boolean => {
    if (!menuId) {
        const router = useRouter()
        menuId = router.currentRoute.value.path
    }
    if (userSession.value && userSession.value.authMenus) {
        return userSession.value.authMenus.find(menu => menu.menuId === menuId) ? true : false
    }
    return false;
}

export const isReader = (menuId: string) => {
    return getAuthMenuLevel(menuId) > authLevel.none ? true : false
}

export const isWriter = (menuId: string) => {
    return getAuthMenuLevel(menuId) > authLevel.reader ? true : false
}

export const isAdmin = (menuId: string) => {
    return getAuthMenuLevel(menuId) > authLevel.writer ? true : false
}

export const useLocalSession = () => {
    return {
        userId: 'no-session',
        userGroupId: '',
        userName: "노세션",
        userEmail: 'no-session@localhost',
        userPhone: '01099990000',
        sessionId: '',
        authMenus: getAllAuthMenus()
    }
}
