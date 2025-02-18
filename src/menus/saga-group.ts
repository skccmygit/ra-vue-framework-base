export default {
  groupId: "saga-menus",
  groupName: "분산트랜잭션",
  menuList: [
    {
      menuId: "/main/saga",
      menuName: "분산트랜잭션관리(캐시삭제)",
      path: "/main/saga",
      component: () => import(`@/pages/domains/saga/SagaMain.vue`)
    },
  ]
}