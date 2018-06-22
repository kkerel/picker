import Vue from 'vue'
import Router from 'vue-router'
import Sign from '@/components/sign/Sign'
import SignFail from '@/components/sign/SignFail'
import SignIn from '@/components/sign/SignIn'
import SignUp from '@/components/sign/SignUp'
import SignUpComplete from '@/components/sign/SignUpComplete'
import ChangeInfo from '@/components/sign/ChangeInfo'
import ChangePassword from '@/components/sign/ChangePassword'
import MyInfo from '@/components/sign/MyInfo'
import FindPassword from '@/components/sign/FindPassword'
import FindPasswordComplete from '@/components/sign/FindPasswordComplete'
import UserManagement from '@/components/menu/UserManagement'
import Drawlots from '@/components/menu/Drawlots'
import DrawlotsDetail from '@/components/menu/DrawlotsDetail'
import Post from '@/components/menu/Post'
import Account from '@/components/menu/Account'
import PostDetail from '@/components/menu/PostDetail'
import SignInFacebook from '@/components/sign/SignInFacebook'
import Reservation from '@/components/menu/Reservation'
import ReservationUpload from '@/components/menu/ReservationUpload'
import ReservationScheduler from '@/components/menu/ReservationScheduler'
import Winnerlist from '@/components/ui/Winnerlist'
import Blacklist from '@/components/ui/Blacklist'
import Main from '@/components/Main'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: {
        name: 'Sign'
      }
    },
    {
      path: '/sign',
      name: 'Sign',
      component: Sign,
      children: [
        {
          path: '/signin',
          name: 'SignIn',
          component: SignIn
        },
        {
          path: '/signup',
          name: 'SignUp',
          component: SignUp
        },
        {
          path: '/signup/complete',
          name: 'SignUpComplete',
          component: SignUpComplete
        },
        {
          path: '/find_password',
          name: 'FindPassword',
          component: FindPassword
        },
        {
          path: '/find_password/complete',
          name: 'FindPasswordComplete',
          component: FindPasswordComplete
        },
        {
          path: '/sign_fail',
          name: 'SignFail',
          component: SignFail
        },
        {
          path: '/signin_facebook',
          name: 'SignInFacebook',
          component: SignInFacebook
        }
      ]
    },
    {
      path: '/main',
      name: 'Main',
      component: Main,
      children: [
        {
          path: 'my_info',
          name: 'MyInfo',
          component: MyInfo,
          children: [
            {
              path: 'change_info',
              name: 'ChangeInfo',
              component: ChangeInfo
            },
            {
              path: 'change_password',
              name: 'ChangePassword',
              component: ChangePassword
            }
          ]
        },
        {
          path: 'account',
          name: 'Account',
          component: Account
        },
        {
          path: 'user_management',
          name: 'UserManagement',
          component: UserManagement,
          children: [
            {
              path: 'winnerlist',
              name: 'Winnerlist',
              component: Winnerlist
            },
            {
              path: 'blacklist',
              name: 'Blacklist',
              component: Blacklist
            }
          ]
        },
        {
          path: 'drawlots',
          name: 'Drawlots',
          component: Drawlots
        },
        {
          path: 'drawlots/:id',
          name: 'DrawlotsDetail',
          component: DrawlotsDetail
        },
        {
          path: 'post',
          name: 'Post',
          component: Post
        },
        {
          path: 'post/:id',
          name: 'PostDetail',
          component: PostDetail
        },
        {
          path: 'reservation',
          name: 'Reservation',
          component: Reservation,
          children: [
            {
              path: 'scheduler',
              name: 'ReservationScheduler',
              component: ReservationScheduler
            },
            {
              path: 'upload/:id',
              name: 'ReservationUploadModify',
              component: ReservationUpload
            },
            {
              path: 'upload',
              name: 'ReservationUpload',
              component: ReservationUpload
            }
          ]
        }
      ]
    }
  ]
})
