import Vue from 'vue'
import VueRouter from 'vue-router'

// import Login from '@/views/login'
const Login = () => import('../views/login')
const NotFound = () => import('../views/404.vue')
// import Home from '@/views/home'
const Home = () => import('../views/home')
// import Dashboard from '@/views/dashboard'
const Dashboard = () => import('../views/dashboard')
// import Launch from '@/views/data/launch'
const Launch = () => import('../views/data/launch')
// import LaunchDetail from '@/views/data/launch/launchDetail'
const LaunchDetail = () => import('../views/data/launch/launchDetail')
// import Material from '@/views/data/material'
const Material = () => import('../views/data/material')
// import MaterialDetail from '@/views/data/material/materialDetail'
const MaterialDetail = () => import('../views/data/material/materialDetail')
// import Added from '@/views/data/added'
const Added = () => import('../views/data/added')
// import AddedDetail from '@/views/data/added/addedDetail'
const AddedDetail = () => import('../views/data/added/addedDetail')

// import First from '@/views/center/first'
const First = () => import('../views/center/first')
// import FirstDetail from '@/views/center/first/firstDetail'
const FirstDetail = () => import('../views/center/first/firstDetail')
// import Review from '@/views/center/review'
const Review = () => import('../views/center/review')
// import ReviewDetail from '@/views/center/review/reviewDetail'
const ReviewDetail = () => import('../views/center/review/reviewDetail')
// import Final from '@/views/center/final'
const Final = () => import('../views/center/final')
// import FinalDetail from '@/views/center/final/finalDetail'
const FinalDetail = () => import('../views/center/final/finalDetail')
// import Share from '@/views/center/share'
const Share = () => import('../views/center/share')
// import ShareDetail from '@/views/center/share/shareDetail'
const ShareDetail = () => import('../views/center/share/shareDetail')
// import Overview from '@/views/center/overview'
const Overview = () => import('../views/center/overview')
// import OverviewDetail from '@/views/center/overview/overviewDetail'
const OverviewDetail = () => import('../views/center/overview/overviewDetail')
// import Preview from '@/views/center/preview'
const Preview = () => import('../views/center/preview')
// import PreviewDetail from '@/views/center/preview/previewDetail'
const PreviewDetail = () => import('../views/center/preview/previewDetail')
const Statist = () => import('../views/center/statist')
const StatistDetail = () => import('../views/center/statist/statistDetail')

// import Account from '@/views/integrated/account'
const Account = () => import('../views/integrated/account')
// import Organization from '@/views/integrated/organization'
const Organization = () => import('../views/integrated/organization')
// import Role from '@/views/integrated/role'
const Role = () => import('../views/integrated/role')
// import RoleDetail from '@/views/integrated/role/roleDetail'
const RoleDetail = () => import('../views/integrated/role/roleDetail')
// import Download from '@/views/integrated/download'
const Download = () => import('../views/integrated/download')

Vue.use(VueRouter)

const routes = [
  { 
    path: '/',
    redirect: '/home' 
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: { title: '登录' }
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    redirect: '/dashboard',
    children: [
      {
        path: '/dashboard',
        name: 'Dashboard',
        component: Dashboard,
        meta: { title: '首页' }
      },

      // 资料收集
      {
        path: '/launch',
        name: 'Launch',
        component: Launch,
        meta: { title: '项目发起', menuId: '项目发起' }
      },
      {
        path: '/launchDetail',
        name: 'LaunchDetail',
        component: LaunchDetail,
        meta: { title: '项目发起详情' }
      },

      {
        path: '/material',
        name: 'Material',
        component: Material,
        meta: { title: '材料补充', menuId: '材料补充' }
      },
      {
        path: '/materialDetail',
        name: 'MaterialDetail',
        component: MaterialDetail,
        meta: { title: '材料补充详情' }
      },

      {
        path: '/added',
        name: 'Added',
        component: Added,
        meta: { title: '立项补充', menuId: '立项补充' }
      },
      {
        path: '/addedDetail',
        name: 'AddedDetail',
        component: AddedDetail,
        meta: { title: '立项补充详情' }
      },

      // 审批中心
      {
        path: '/first',
        name: 'First',
        component: First,
        meta: { title: '项目初审', menuId: '项目初审' }
      },
      {
        path: '/firstDetail',
        name: 'FirstDetail',
        component: FirstDetail,
        meta: { title: '项目初审详情' }
      },

      {
        path: '/review',
        name: 'Review',
        component: Review,
        meta: { title: '图纸复核', menuId: '图纸复核' }
      },
      {
        path: '/reviewDetail',
        name: 'ReviewDetail',
        component: ReviewDetail,
        meta: { title: '图纸复核详情' }
      },

      {
        path: '/final',
        name: 'Final',
        component: Final,
        meta: { title: '项目终审', menuId: '项目终审' }
      },
      {
        path: '/finalDetail',
        name: 'FinalDetail',
        component: FinalDetail,
        meta: { title: '项目终审详情' }
      },

      {
        path: '/share',
        name: 'Share',
        component: Share,
        meta: { title: '项目分享', menuId: '项目分享' }
      },
      {
        path: '/shareDetail',
        name: 'ShareDetail',
        component: ShareDetail,
        meta: { title: '项目分享详情' }
      },

      {
        path: '/overview',
        name: 'Overview',
        component: Overview,
        meta: { title: '项目总览', menuId: '项目总览' }
      },
      {
        path: '/overviewDetail',
        name: 'OverviewDetail',
        component: OverviewDetail,
        meta: { title: '项目总览详情' }
      },

      {
        path: '/preview',
        name: 'Preview',
        component: Preview,
        meta: { title: '项目预览', menuId: '项目预览' }
      },
      {
        path: '/previewDetail',
        name: 'PreviewDetail',
        component: PreviewDetail,
        meta: { title: '项目预览详情' }
      },

      {
        path: '/statist',
        name: 'Statist',
        component: Statist,
        meta: { title: '项目统计', menuId: '项目统计' }
      },
      {
        path: '/statistDetail',
        name: 'StatistDetail',
        component: StatistDetail,
        meta: { title: '项目明细' }
      },

      // 综合管理
      {
        path: '/account',
        name: 'Account',
        component: Account,
        meta: { title: '账号管理', menuId: '账号管理' }
      },

      {
        path: '/organization',
        name: 'Organization',
        component: Organization,
        meta: { title: '机构管理', menuId: '机构管理' }
      },

      {
        path: '/role',
        name: 'Role',
        component: Role,
        meta: { title: '角色管理', menuId: '角色管理' }
      },
      {
        path: '/roleDetail',
        name: 'RoleDetail',
        component: RoleDetail,
        meta: { title: '编辑角色' }
      },

      {
        path: '/download',
        name: 'Download',
        component: Download,
        meta: { title: '下载管理', menuId: '下载管理' }
      },
    ]
  },
  {
    path: '*',
    name: '404',
    component: NotFound,
    meta: { title: '404' }
  },
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '@/views/About.vue')
  // }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    next()
  } else {
    const token = sessionStorage.getItem('token')
    if(!token) {
      next('/login')
    } else {
      next()
    }
  }
})

// router.afterEach((to, from) => {
//   document.title = to.meta.title || 智慧能源管理平台
// })

export default router
