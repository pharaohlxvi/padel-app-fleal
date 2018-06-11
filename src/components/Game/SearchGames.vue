<template v-if="allUserGames.length && currUser.length">
<div class="ui stackable grid vertically padded container">

  <user-sidebar :curr-user="currUser" class="float"/>

  <div class="five wide column">

    <img class="ui fluid image" src="../../assets/logo.png">

    <div class="ui fluid raised card"> <!-- authUser Card -->

      <div class="content">

        <img class="left floated mini ui image" src="https://www.gravatar.com/avatar/default?s=200&r=pg&d=mm">

        <div class="header"> <!-- name -->
          {{ `${currUser.name}` }}
        </div>

        <div class="meta"> <!-- email -->
          {{ `${currUser.email}` }}
        </div>

        <div class="ui center aligned grid container">
          <div class="center aligned statistic">
            <div class="label">
              Prticipando de
            </div>
          <div class="value">
            <i class="blue hand point right outline icon"></i> {{ `${currUser.games.length}` }}
          </div>
            <div class="label">
              Jogos
            </div>
          </div>
        </div>

        <br><hr><br>

        <div class="ui center aligned grid">
          <p class="content meta">Membro desde {{ currUser.created_at | joined }}</p>
          <br>
        </div>

      </div>
    </div>

  </div>

  <div class="eleven wide column">

    <SearchGameForm :all-user-games="allUserGames" :currUser="currUser" :from-search="true"/>

  </div>

</div>
</template>

<script>
import UserSidebar from '@/components/User/UserSidebar'
import SearchGamesMenu from '@/components/Game/SearchGamesMenu'
import axios from '../../axios-instance'
import SearchGameForm from '@/components/Game/SearchGameForm'

export default {
  name: 'SearchGames',
  components: {
    SearchGameForm,
    SearchGamesMenu,
    UserSidebar
  },
  data () {
    return {
      allUserGames: []
    }
  },
  props: {
    currUser: {
      type: Object,
      required: true
    }
  },
  beforeRouteEnter (to, from, next) {
    const token = localStorage.getItem('padel-token')
    return token ? next() : next('/login')
  },
  created () {
    this.getUser()
    this.fetchAllUserGames(this.allUserGamesCallback)
  },
  methods: {
    allUserGamesCallback (response) {
      for (let i = 0; i < response.length; i++) {
        this.allUserGames.push(response[i].id)
      }
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
