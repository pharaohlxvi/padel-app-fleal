<template v-if="game.length && authUser.length">
  <div class="ui centered raised card">
    <div v-if="gameDeleted" class="content">
      <div class="ui bottom attached button">
        <i class="ban icon"></i> Jogo apagado!
      </div>
    </div>

    <div v-else class="content">
      <router-link :to="{ name: 'modifyGame', params: {id: game.id, currUser: authUser} }">
        <a v-if="isGameAdmin" class="ui grey right corner label">
          <i class="settings icon"></i>
        </a>
      </router-link>

      <div class="center aligned">
        <div v-if="(!isGameAdmin && hasApplied) || madeRequest" class="ui">
          <span class="ui red bottom right attached tiny label">Solicitação<br>realizada</span>
        </div>
        <div v-if="game.need_equip===1">
          <span class="ui teal top left attached tiny label">Levar<br>raquete</span>
        </div>
        <span class="ui header">{{ game.venue }}</span>
      </div>

      <div class="center aligned meta">
        <span><i class="calendar icon"></i> {{ game.date | date('DD/MM/YYYY') }} às {{ game.time }}</span>

        <br v-if="!game.price"/><br v-if="!game.price"/><br>

        <span v-if="game.duration">Duração: {{ game.duration}}</span>

        <span v-if="game.price">R$ {{ game.price }},00/h</span>

        <br>

        <span>
          <i class="user icon"></i>
          {{ available }} vagas restantes<br>
          Nível {{ avgLevel }}
        </span>

        <div class="ui blue basic tiny labels">

          <span class="class ui header">Jogadores Inscritos</span><br>
          <Players
            v-for="player in gamePlayers"
            :key="player.id"
            :player="player"
            :currUser="authUser"
          />
          <br>

        </div>

      </div>

      <!-- APAGAR JOGO (isGameAdmin) -->
      <div v-if="isGameAdmin && !fromSearch" class="ui bottom attached button" @click.prevent="deleteGame(game.id)">
        APAGAR JOGO
      </div>

      <!-- SAIR DO JOGO (isPlaying) -->
      <div v-if="isPlaying && !leftGame" class="ui bottom attached button" @click.prevent="leaveGame(game.id)">
        SAIR DO JOGO
      </div>

      <!-- PARTICIPAR DO JOGO (MODIFICAR FUNCAO PARA JOIN DIRETO) -->
      <div v-else-if="available && isGameAdmin && !joinedGame && !isPlaying" class="ui bottom attached button" @click.prevent="joinGame(game.id)">
        PARTICIPAR DO JOGO
      </div>

      <!-- SOLICITAR PARTICIPAR (!hasApplied && available) -->
      <div v-else-if="!hasApplied && available && !madeRequest" class="ui bottom attached button" @click.prevent="requestToJoinGame(game.id)">
        SOLICITAR PARTICIPAR
      </div>

      <!-- NÃO HÁ MAIS VAGAS (!hasApplied && !available) -->
      <div v-else-if="!hasApplied && !available" class="ui bottom attached button">
        NÃO HÁ MAIS VAGAS
      </div>

      <game-request
        v-if="isGameAdmin && applic_user.length && !fromSearch"
        v-for="user in applic_user"
        :key="user"
        :user="user"
        :game="game.id"
      />

    </div>
  </div>
</template>

<script>
import axios from '../../axios-instance'
import GameRequest from '@/components/Game/GameRequest'
import Players from '@/components/Game/Players'

export default {
  name: 'Game',
  components: {
    GameRequest,
    Players
  },
  props: {
    game: {
      type: Object,
      required: true
    },
    // allUserGames: {
    //   type: Array,
    //   required: true
    // },
    fromSearch: {
      type: Boolean,
      required: false,
      default: false
    },
    authUser: {
      type: Object,
      required: true
    }
  },
  data: function () {
    return {
      // user: {},
      userGamesIds: [],
      userGamesApplied: [],
      // gameApplications: [],
      // gameHasApplications: false,
      gameDeleted: false,
      applic_user: [],
      avgLevel: '',
      available: '',
      requested: false,
      leftGame: false,
      joinedGame: false,
      madeRequest: false,
      gamePlayers: []
    }
  },
  beforeRouteEnter (to, from, next) {
    const token = localStorage.getItem('padel-token')
    return token ? next() : next('/login')
  },
  created () {
    // this.getUserGames(this.userCallback)
    this.getGamesWithApplication(this.appliedCallback)
    this.fetchGamePlayers(this.game.id)
    this.formatInfo()
  },
  computed: {
    isGameAdmin () {
      return this.game.user_id === this.authUser.id
    },
    isPlaying () {
      return this.userGamesIds.includes(this.game.id)
      // return this.authUser.games.includes(this.game)
    },
    hasApplied () {
      return this.userGamesApplied.includes(this.game.id)
      // return this.authUser.applications.includes(this.game)
    }
  },
  methods: {
    // userCallback (response) {
    //   this.user = response
    //   // Stores the IDs of all games the user is applied and accepted in var userGamesIds
    //   for (let i = 0; i < this.user.games.length; i++) {
    //     this.userGamesIds.push(this.user.games[i].id)
    //   }
    //   // Stores all ids of games the current user has applied and not been accepted yet in userGamesApplied
    //   for (let i = 0; i < this.user.applications.length; i++) {
    //     this.userGamesApplied.push(this.user.applications[i].id)
    //   }
    // },

    appliedCallback (response) {
      var gameApplications = []
      for (let i = 0; i < response.length; i++) {
        var applics = [response[i].applicant_id, response[i].game_id]
        gameApplications.push(applics)
      }
      for (let i = 0; i < gameApplications.length; i++) {
        if (gameApplications[i][1] === this.game.id) {
          this.applic_user.push(gameApplications[i][0])
        }
      }
    },

    formatInfo () {
      // console.log('this.user.length = ' + JSON.stringify(this.authUser.length, null, 2))
      for (let i = 0; i < this.authUser.games.length; i++) {
        this.userGamesIds.push(this.authUser.games[i].id)
      }
      // console.log('userGamesIds = ' + JSON.stringify(this.authUserGamesIds, null, 2))
      for (let i = 0; i < this.authUser.applications.length; i++) {
        this.userGamesApplied.push(this.authUser.applications[i].id)
      }
      // console.log('userGamesApplied = ' + JSON.stringify(this.userGamesApplied, null, 2))
      if (this.game.avg_level <= 2) {
        this.avgLevel = 'Iniciante'
      } else if (this.game.avg_level <= 3) {
        this.avgLevel = 'Intermediário'
      } else if (this.game.avg_level <= 3.75) {
        this.avgLevel = 'Semiprofissional'
      } else {
        this.avgLevel = 'Profissional'
      }
      this.available = this.game.max_num - this.game.curr_num
    },

    // getUserGames (callback) {
    //   const token = localStorage.getItem('padel-token')
    //   axios
    //     .get('/users/games', {
    //       headers: {
    //         Authorization: `Bearer ${token}`
    //       }
    //     })
    //     .then(response => {
    //       callback(response.data.data)
    //     })
    // },

    fetchGamePlayers (gameId) {
      const token = localStorage.getItem('padel-token')
      axios
        .get(`/fetch_game/${gameId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        .then(response => {
          // for (let i = 0; i < response.data.data.users.length; i++) {
          //   this.gamePlayersIds.push(response.data.data.users[i].id)
          // }
          this.gamePlayers = response.data.data.users
        })
    },

    getGamesWithApplication (callback) {
      const token = localStorage.getItem('padel-token')
      axios
        .get('/games/applications', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        .then(response => {
          callback(response.data.data)
        })
    },

    requestToJoinGame (gameId) {
      const token = localStorage.getItem('padel-token')
      axios
        .post(
          '/game/request_join',
          { game_id: gameId },
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        )
        .then(response => {
          this.available--
          this.requested = true
          this.madeRequest = true
          this.joinedGame = true
          this.leftGame = true
        })
    },

    joinGame (gameId) {
      const token = localStorage.getItem('padel-token')
      axios
        .post(
          '/game/join',
          { game_id: gameId },
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        )
        .then(response => {
          this.userGamesIds.push(gameId)
          this.available--
          this.joinedGame = true
          this.leftGame = false
        })
    },

    leaveGame (gameId) {
      const token = localStorage.getItem('padel-token')
      axios
        .post(
          '/game/leave',
          { game_id: gameId },
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        )
        .then(response => {
          var index = this.userGamesIds.indexOf(gameId)
          if (index !== -1) {
            this.userGamesIds.splice(index, 1)
          }
          this.available++
          this.leftGame = true
          this.joinedGame = false
        })
    },

    deleteGame (gameId) {
      const token = localStorage.getItem('padel-token')
      const deleteConfirmed = confirm('Confirma?')
      if (deleteConfirmed) {
        axios
          .delete(`/game/delete/${gameId}`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          })
          .then(response => {
            var index = this.userGamesIds.indexOf(gameId)
            if (index !== -1) {
              this.userGamesIds.splice(index, 1)
              this.gameDeleted = true
            }
          })
      }
    }
  }
}
</script>
