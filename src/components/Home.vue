<template>
<div v-if="currUser" class="ui stackable grid vertically padded container">

  <user-sidebar :curr-user="currUser" class="float"/>

  <div v-if="currUser" class="five wide column">

    <img class="ui fluid image" src="../assets/logo.png">

    <div class="ui fluid raised card"> <!-- authUser Card -->

      <div class="content">

        <img class="left floated mini ui image" src="https://www.gravatar.com/avatar/default?s=200&r=pg&d=mm">

        <div class="header"> <!-- name -->
          {{ `${currUser.name}` }}
        </div>

        <div class="meta"> <!-- email -->
          {{ `${currUser.email}` }}
        </div>

        <!-- <div class="statistic"> games -->
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

        <!-- <div class="item" v-show="currUser.created_at"> created at -->
        <div class="ui center aligned grid">
          <hr>
          <p class="content meta">Membro desde {{ currUser.created_at | joined }}</p>
          <br>
        </div>

      </div>
    </div>

  </div>

  <div class="eleven wide column">

    <div class="ui segment">
      <h2 class="ui medium header">Pr&oacute;ximos Jogos</h2>
      <Games :auth-user="currUser" />
      <div class="ui segment center aligned" v-if="currUser.games.length < 1">
        <h3 class="ui header">Voc&ecirc; n&atilde;o possui nenhum jogo agendado</h3>
      </div>
      <br>
    </div>

  </div>

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
      currUser: ''
    }
  },
  beforeRouteEnter (to, from, next) {
    const token = localStorage.getItem('padel-token')
    return token ? next() : next('/login')
  },
  mounted () {
    this.fetchAuthenticatedUser(this.userCallback)
  },
  methods: {
    userCallback (response) {
      this.currUser = response
    },
    fetchAuthenticatedUser (callback) {
      const token = localStorage.getItem('padel-token')

      axios
        .get('/account/me', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        .then(response => {
          callback(response.data.data)
          // console.log('2) response = ' + JSON.stringify(response.data.data, null, 2))
          // this.currUser = response.data.data
        })
    }
  //   displayUserGames (callback) {
  //     const token = localStorage.getItem('padel-token')
  //     axios
  //       .get('/users/games', {
  //         headers: {
  //           Authorization: `Bearer ${token}`
  //         }
  //       })
  //       .then(response => {
  //         callback(response.data.data)
  //       })
  //   }
  }
}
</script>
