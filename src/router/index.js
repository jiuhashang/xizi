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
    meta: { title: '??????' }
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
        meta: { title: '??????' }
      },

      // ????????????
      {
        path: '/launch',
        name: 'Launch',
        component: Launch,
        meta: { title: '????????????', menuId: '????????????' }
      },
      {
        path: '/launchDetail',
        name: 'LaunchDetail',
        component: LaunchDetail,
        meta: { title: '??????????????????' }
      },

      {
        path: '/material',
        name: 'Material',
        component: Material,
        meta: { title: '????????????', menuId: '????????????' }
      },
      {
        path: '/materialDetail',
        name: 'MaterialDetail',
        component: MaterialDetail,
        meta: { title: '??????????????????' }
      },

      {
        path: '/added',
        name: 'Added',
        component: Added,
        meta: { title: '????????????', menuId: '????????????' }
      },
      {
        path: '/addedDetail',
        name: 'AddedDetail',
        component: AddedDetail,
        meta: { title: '??????????????????' }
      },

      // ????????????
      {
        path: '/first',
        name: 'First',
        component: First,
        meta: { title: '????????????', menuId: '????????????' }
      },
      {
        path: '/firstDetail',
        name: 'FirstDetail',
        component: FirstDetail,
        meta: { title: '??????????????????' }
      },

      {
        path: '/review',
        name: 'Review',
        component: Review,
        meta: { title: '????????????', menuId: '????????????' }
      },
      {
        path: '/reviewDetail',
        name: 'ReviewDetail',
        component: ReviewDetail,
        meta: { title: '??????????????????' }
      },

      {
        path: '/final',
        name: 'Final',
        component: Final,
        meta: { title: '????????????', menuId: '????????????' }
      },
      {
        path: '/finalDetail',
        name: 'FinalDetail',
        component: FinalDetail,
        meta: { title: '??????????????????' }
      },

      {
        path: '/share',
        name: 'Share',
        component: Share,
        meta: { title: '????????????', menuId: '????????????' }
      },
      {
        path: '/shareDetail',
        name: 'ShareDetail',
        component: ShareDetail,
        meta: { title: '??????????????????' }
      },

      {
        path: '/overview',
        name: 'Overview',
        component: Overview,
        meta: { title: '????????????', menuId: '????????????' }
      },
      {
        path: '/overviewDetail',
        name: 'OverviewDetail',
        component: OverviewDetail,
        meta: { title: '??????????????????' }
      },

      {
        path: '/preview',
        name: 'Preview',
        component: Preview,
        meta: { title: '????????????', menuId: '????????????' }
      },
      {
        path: '/previewDetail',
        name: 'PreviewDetail',
        component: PreviewDetail,
        meta: { title: '??????????????????' }
      },

      {
        path: '/statist',
        name: 'Statist',
        component: Statist,
        meta: { title: '????????????', menuId: '????????????' }
      },
      {
        path: '/statistDetail',
        name: 'StatistDetail',
        component: StatistDetail,
        meta: { title: '????????????' }
      },

      // ????????????
      {
        path: '/account',
        name: 'Account',
        component: Account,
        meta: { title: '????????????', menuId: '????????????' }
      },

      {
        path: '/organization',
        name: 'Organization',
        component: Organization,
        meta: { title: '????????????', menuId: '????????????' }
      },

      {
        path: '/role',
        name: 'Role',
        component: Role,
        meta: { title: '????????????', menuId: '????????????' }
      },
      {
        path: '/roleDetail',
        name: 'RoleDetail',
        component: RoleDetail,
        meta: { title: '????????????' }
      },

      {
        path: '/download',
        name: 'Download',
        component: Download,
        meta: { title: '????????????', menuId: '????????????' }
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
//   document.title = to.meta.title || ????????????????????????
// })

export default router
