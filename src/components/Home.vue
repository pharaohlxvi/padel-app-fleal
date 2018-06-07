<template v-if="allUserGames.length && user.length">
<div class="ui stackable grid vertically padded container">

  <div class="two wide column"></div>

  <div class="twelve wide column">

    <UserSidebar/>

    <div class="ui segment">
      <h2 class="ui medium header">Pr&oacute;ximos Jogos</h2>
      <Games :authUser="user" :allUserGames.sync="allUserGames" />
    </div>

  </div>

  <div class="two wide column"></div>

</div>
</template>

<script>
import UserSidebar from '@/components/User/UserSidebar'
import Games from '@/components/Game/Games'
import axios from '../axios-instance'

export default {
  name: 'Home',
  components: {
    UserSidebar,
    Games
  },
  data () {
    return {
      user: {},
      allUserGames: []
    }
  },
  beforeRouteEnter (to, from, next) {
    const token = localStorage.getItem('padel-token')
    return token ? next() : next('/login')
  },
  created () {
    this.displayUserGames(this.userCallback)
    this.fetchAllUserGames(this.allUserGamesCallback)
  },
  methods: {
    userCallback (response) {
      this.user = response
    },
    allUserGamesCallback (response) {
      this.allUserGames = response
    },
    displayUserGames (callback) {
      const token = localStorage.getItem('padel-token')
      axios
        .get('/users/games', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
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
    }
  }
}
</script>
