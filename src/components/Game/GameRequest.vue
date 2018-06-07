<template v-if="user.length && (level = !undefined) && game.length">
  <div class="ui raised segment yellow">
    <div class="card">
      <div class="content">
        <div><h3>{{ name }}</h3></div>
        <div class="right floated meta">
          {{ age }} anos
        </div>
        <div class="description">
          Nível {{ level }}
        </div>

      </div>
      <div class="extra content center aligned">
        <div class="ui mini buttons">
          <button class="ui red button">Rejeitar</button>
          <div class="or" data-text="ou"></div>
          <button class="ui green button" @click="acceptRequest(game, user)">Aceitar</button>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
// import Notification from '@/components/Notification'
import axios from '../../axios-instance'

export default {
  name: 'GameRequest',
  data () {
    return {
      name: '',
      age: '',
      level: '',
      qty_rates: '',
      total_rates: ''
    }
  },
  props: {
    user: {
      type: Number,
      required: true
    },
    game: {
      type: Number,
      required: true
    }
  },
  created () {
    this.getUserInfo(this.user, this.userInfoCallback)
  },
  methods: {
    userInfoCallback (response) {
      this.name = response.name
      this.age = response.age
      if (response.level === 1) {
        this.level = 'Iniciante'
      } else if (response.level === 2) {
        this.level = 'Intermediário'
      } else if (response.level === 3) {
        this.level = 'Semiprofissional'
      } else if (response.level === 4) {
        this.level = 'Profissional'
      }
      this.qty_rates = response.qty_rates
      this.total_rates = response.total_rates
    },
    getUserInfo (userId, callback) {
      const token = localStorage.getItem('padel-token')
      axios
        .get(`/info/user/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        .then(response => {
          callback(response.data.data)
        })
    },
    acceptRequest (gameId, userId) {
      console.log('1) gameId = ' + JSON.stringify(gameId, null, 2))
      const token = localStorage.getItem('padel-token')
      axios
        .post(
          '/game/accept',
          { game_id: gameId, user_id: userId },
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        )
        // .then(response => {

        // })
    }
  }
}
</script>
