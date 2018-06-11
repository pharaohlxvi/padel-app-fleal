import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import SignUpForm from '@/components/Auth/SignUpForm'
import LogInForm from '@/components/Auth/LogInForm'
import UserProfile from '@/components/User/Profile/UserProfile'
import UserProfileSettings from '@/components/User/Settings/UserProfileSettings'
import UserPasswordSettings from '@/components/User/Settings/UserPasswordSettings'
import CreateGame from '@/components/Game/CreateGame'
import SearchGames from '@/components/Game/SearchGames'
import ModifyGame from '@/components/Game/ModifyGame'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Home
    },
    {
      path: '/signup',
      component: SignUpForm
    },
    {
      path: '/login',
      component: LogInForm
    },
    {
      path: '/:email',
      component: UserProfile,
      props: true
    },
    {
      path: '/create/game',
      name: 'createGame',
      props: true,
      component: CreateGame
    },
    {
      path: '/game/update/:id',
      name: 'modifyGame',
      props: true,
      component: ModifyGame
    },
    {
      path: '/search/games',
      name: 'searchGames',
      props: true,
      component: SearchGames
    },
    {
      path: '/settings/profile',
      name: 'userProfileSettings',
      props: true,
      component: UserProfileSettings
    },
    {
      path: '/game/settings',
      component: ModifyGame
    },
    {
      path: '/settings/password',
      component: UserPasswordSettings
    }
  ]
})
