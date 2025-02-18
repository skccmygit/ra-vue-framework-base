export default {
  groupId: "batch-menus",
  groupName: "배치(Batch)",
  menuList: [
    {
      menuId: "/main/batch",
      menuName: "배치(Batch)",
      hidden: true,
      path: "/main/batch",
      component: () => import(`@/pages/domains/batch/BatchMain.vue`)
    },
    {
      menuId: "/main/batch",
      menuName: "배치작업관리",
      path: "/main/batch/BatchSchedules",
      component: () => import(`@/pages/domains/batch/components/BatchSchedules.vue`)
    },
    {
      menuId: "/main/batch",
      menuName: "On-demand배치",
      path: "/main/batch/OndemandBatch",
      component: () => import(`@/pages/domains/batch/components/OndemandBatch.vue`),
    },
    {
      menuId: "/main/batch",
      menuName: "화면없는 메뉴",
      path: "/main/batch/Empty",
      component: null
    }
  ]
}