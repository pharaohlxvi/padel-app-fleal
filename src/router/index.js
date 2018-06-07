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
      path: '/:username',
      component: UserProfile,
      props: true
    },
    {
      path: '/create/game',
      component: CreateGame
    },
    {
      path: '/game/modify/:gameId',
      name: 'modifyGame',
      props: true,
      component: ModifyGame
    },
    {
      path: '/search/games',
      component: SearchGames
    },
    {
      path: '/settings/profile',
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
