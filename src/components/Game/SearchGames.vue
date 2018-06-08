<template v-if="allGames.length && allUserGames.length && user.length">
<div>
  <SearchGameForm :allGames="allGames" :allUserGames="allUserGames" :fromSearch="true"/>
</div>
</template>

<script>
import UserSidebar from '@/components/User/UserSidebar'
import axios from '../../axios-instance'
import SearchGameForm from '@/components/Game/SearchGameForm'

export default {
  name: 'SearchGames',
  components: {
    SearchGameForm,
    UserSidebar
  },
  data () {
    return {
      allGames: [],
      allUserGames: [],
      user: {}
    }
  },
  beforeRouteEnter (to, from, next) {
    const token = localStorage.getItem('padel-token')
    return token ? next() : next('/login')
  },
  created () {
    this.getUser()
    this.fetchAllGames(this.allGamesCallback)
    this.fetchAllUserGames(this.allUserGamesCallback)
  },
  methods: {
    allGamesCallback (response) {
      this.allGames = response
    },
    allUserGamesCallback (response) {
      for (let i = 0; i < response.length; i++) {
        this.allUserGames.push(response[i].id)
      }
    },
    fetchAllGames (callback) {
      axios
        .get('/fetch_games')
        .then(response => {
          callback(response.data.data)
        })
    },
    fetchAllUserGames (callback) {
      const token = localStorage.getItem('padel-token')
      axios
        .get('/fetch_user_games', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        .then(response => {
          callback(response.data.data)
        })
    },
    getUser () {
      const token = localStorage.getItem('padel-token')
      axios
        .get('/users/games', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        .then(response => {
          this.user = response.data.data
        })
    }
  }
}
</script>
