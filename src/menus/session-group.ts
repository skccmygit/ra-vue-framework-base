export default {
  groupId: "session-menus",
  groupName: "인증/세션/권한",
  menuList: [
    {
      menuId: "/main/session",
      menuName: "인증/세션/권한",
      hidden: true,
      path: "/main/session",
      component: () => import(`@/pages/domains/session/SessionMain.vue`),
      authLevel: -1
    },
    {
      menuId: "/main/menu",
      menuName: "메뉴관리",
      path: "/main/menu/MenuPane",
      component: () => import(`@/pages/domains/session/components/MenuPane.vue`)
    },
    {
      menuId: "/main/menu",
      menuName: "사용자그룹 메뉴관리",
      path: "/main/menu/UserGroupMenu",
      component: () => import(`@/pages/domains/session/components/UserGroupMenu.vue`)
    },
    {
      menuId: "/main/api",
      menuName: "API관리",
      path: "/main/api/ApiPane",
      component: () => import(`@/pages/domains/session/components/ApiPane.vue`)
    },
    {
      menuId: "/main/api",
      menuName: "사용자그룹 API관리",
      path: "/main/api/UserGroupApi",
      component: () => import(`@/pages/domains/session/components/UserGroupApi.vue`)
    },
    {
      menuId: "/main/code",
      menuName: "공통코드관리",
      path: "/main/code/CodeGroupPane",
      component: () => import(`@/pages/domains/session/components/CodeGroupPane.vue`)
    },
    {
      menuId: "/main/user",
      menuName: "사용자관리",
      path: "/main/user/UserPane",
      component: () => import(`@/pages/domains/session/components/UserPane.vue`)
    },
    {
      menuId: "/main/session",
      menuName: "세션 현황",
      path: "/main/session/SessionStatus",
      component: () => import(`@/pages/domains/session/components/SessionStatus.vue`)
    },
    {
      menuId: "/main/api-log",
      menuName: "API이력조회",
      path: "/main/api-log/ApiHistory",
      component: () => import(`@/pages/domains/session/components/ApiHistory.vue`)
    },
    {
      menuId: "/main/test",
      menuName: "컴포넌트(개발용)",
      path: "/main/test/TestMain",
      component: () => import(`@/pages/domains/test/TestMain.vue`),
      authLevel: -1
    },
  ]
}