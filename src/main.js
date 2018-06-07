// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import Vue from 'vue'
import VeeValidate from 'vee-validate'
import App from './App'
import router from './router'
import axios from 'axios'
import moment from 'moment'
import VCalendar from 'v-calendar'
import 'v-calendar/lib/v-calendar.min.css'

// reference axios globally
window.axios = axios

// Global axios defaults
// axios.defaults.baseURL = 'http://127.0.0.1:3333'
axios.defaults.baseURL = 'https://padel-app-api-fleal.herokuapp.com/'

Vue.use(VeeValidate)

Vue.use(VCalendar, {
  firstDayOfWeek: 1, // Sunday
  popoverVisibility: 'focus',
  formats: {
    title: 'MMMM YYYY',
    weekdays: 'W',
    navMonths: 'MMM',
    input: ['L', 'DD-MM-YYYY', 'DD/MM/YYYY'], // Only for `v-date-picker`
    dayPopover: 'L' // Only for `v-date-picker`
  }
})

// Global filter to format dates with momentjs
Vue.filter('timeAgo', date => moment(date).fromNow())
Vue.filter('joined', date => moment(date).format('MMMM YYYY'))
Vue.filter('dob', date => moment(date).format('MMMM Do YYYY'))
Vue.filter('date', date => moment(date).format('YYYY-MM-DD'))

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
