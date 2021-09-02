import { createRouter, createWebHashHistory } from "vue-router";
const routes = [
  {
    path: "/",
    name: "homePage",
    metaL: {
      title: '首页'
    },
    component: () => import("@/views/homePage")
  },
  {
    path: '/home',
    component: () =>
      import('@/layout'),
    meta: {
      title: '自助服务系统',
    },
    children: [
      {
        path: "/outpatientRegistration",
        name: "outpatientRegistration",
        metaL: {
          title: '门诊挂号'
        },
        component: () => import("@/views/outpatientRegistration")
      },
      {
        path: "/cardType",
        name: "cardType",
        metaL: {
          title: '卡类型'
        },
        component: () => import("@/views/cardType")
      },
      {
        path: "/doctorChoice",
        name: "doctorChoice",
        metaL: {
          title: '卡类型'
        },
        component: () => import("@/views/doctorChoice")
      },
      {
        path: "/successfulRegistration",
        name: "successfulRegistration",
        metaL: {
          title: '挂号成功'
        },
        component: () => import("@/views/successfulRegistration")
      },
      {
        path: "/informationService",
        name: "informationService",
        metaL: {
          title: '项目查询'
        },
        component: () => import("@/views/informationService")
      },
      {
        path: "/outpatientPayment",
        name: "outpatientPayment",
        metaL: {
          title: '门诊缴费'
        },
        component: () => import("@/views/outpatientPayment")
      },
      {
        path: "/projectQuery",
        name: "projectQuery",
        metaL: {
          title: '项目查询'
        },
        component: () => import("@/views/projectQuery")
      },
      {
        path: "/about",
        name: "about",
        metaL: {
          title: '项目查询'
        },
        component: () => import("@/views/about")
      },
      {
        path: "/setUp",
        name: "setUp",
        metaL: {
          title: '本机设置'
        },
        component: () => import("@/views/setUp")
      },
      {
        path: "/registeredPayment",
        name: "registeredPayment",
        metaL: {
          title: '挂号收费'
        },
        component: () => import("@/views/registeredPayment")
      },
      {
        path: "/appointmentDepartment",
        name: "appointmentDepartment",
        metaL: {
          title: '预约科室'
        },
        component: () => import("@/views/appointmentDepartment")
      },
      {
        path: "/appointmentDoctor",
        name: "appointmentDoctor",
        metaL: {
          title: '预约医生'
        },
        component: () => import("@/views/appointmentDoctor")
      },
      {
        path: "/appointmentTime",
        name: "appointmentTime",
        metaL: {
          title: '预约时间'
        },
        component: () => import("@/views/appointmentTime")
      },
      {
        path: "/appointmentSuccessful",
        name: "appointmentSuccessful",
        metaL: {
          title: '预约成功'
        },
        component: () => import("@/views/appointmentSuccessful")
      },
      {
        path: "/appointmentNumber",
        name: "appointmentNumber",
        metaL: {
          title: '预约取号'
        },
        component: () => import("@/views/appointmentNumber")
      },
      {
        path: "/outPayment",
        name: "outPayment",
        metaL: {
          title: '缴费'
        },
        component: () => import("@/views/outPayment")
      },
      {
        path: "/ipInfo",
        name: "ipInfo",
        metaL: {
          title: 'ip设置'
        },
        component: () => import("@/views/ipInfo")
      },
    ]
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
