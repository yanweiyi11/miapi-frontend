export default [
  { path: '/', redirect: '/welcome' },
  { path: '/welcome', name: '欢迎', icon: 'smile', component: './Welcome' },
  {
    path: '/user',
    layout: false,
    routes: [{ name: '登录', path: '/user/login', component: './User/Login' }],
  },
  {
    path: '/admin',
    name: '管理页',
    icon: 'setting',
    access: 'canAdmin',
    routes: [
      {
        name: '接口管理',
        icon: 'api',
        path: '/admin/interface_info',
        component: './Admin/InterfaceInfo',
      },
      {
        name: '接口分析',
        icon: 'analysis',
        path: '/admin/interface_analysis',
        component: './Admin/InterfaceAnalysis',
      },
    ],
  },
  {
    path: '/user/interface_info',
    name: '浏览接口',
    icon: 'user',
    access: 'canUser',
    component: './User/InterfaceInfo',
  },
  {
    path: '/user/interface_info/:id',
    name: '查看接口',
    access: 'canUser',
    component: './User/InterfaceInfo/Check',
    hideInMenu: true,
  },
  { path: '*', layout: false, component: './404' },
];
