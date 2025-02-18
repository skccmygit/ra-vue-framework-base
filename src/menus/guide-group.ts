export default {
  groupId: "component-guide",
  groupName: "♣ 컴포넌트 개발가이드",
  menuList: [
    {
      menuId: "/guide/components",
      menuName: "PanelCollapse",
      path: "/guide/components/PanelCollapse",
      component: () => import('@/pages/guides/PanelCollapseGuide.vue'),
      authLevel: -1
    },
    {
      menuId: "/guide/components",
      menuName: "OptionSelect",
      path: "/guide/components/OptionSelect",
      component: () => import('@/pages/guides/OptionSelectGuide.vue'),
      authLevel: -1
    },
    {
      menuId: "/guide/components",
      menuName: "OptionSelectByCode",
      path: "/guide/components/OptionSelectByCode",
      component: () => import('@/pages/guides/OptionSelectByCodeGuide.vue'),
      authLevel: -1
    },
    {
      menuId: "/guide/components",
      menuName: "OptionRadio",
      path: "/guide/components/OptionRadio",
      component: () => import(`@/pages/guides/OptionRadioGuide.vue`),
      authLevel: -1
    },
    {
      menuId: "/guide/components",
      menuName: "ItemsTable",
      path: "/guide/components/ItemsTable",
      component: () => import(`@/pages/guides/ItemsTableGuide.vue`),
      authLevel: -1
    },
  ]
}