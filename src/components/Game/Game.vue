<template v-if="game.length && authUser.length && allUserGames.length && user.games.length">
  <div class="ui centered raised card">
    <div v-if="gameDeleted" class="content">
      <div class="ui bottom attached button">
        <i class="ban icon"></i> Jogo apagado!
      </div>
    </div>

    <div v-else class="content">
      <router-link :to="{ name: 'modifyGame', params: {gameId: game.id} }">
        <a v-if="isGameAdmin" class="ui grey right corner label">
          <i class="settings icon"></i>
        </a>
      </router-link>

      <!-- <pre>{{ game }}</pre> -->
      <!-- <pre>{{ allUserGames[0] }}</pre> -->
      <!-- <pre>{{ userGamesIds }}</pre> -->
      <!-- <pre>{{ userGamesApplied }}</pre> -->
      <!-- <pre>{{ gameHasApplications }}</pre> -->
      <!-- <pre>{{ gameApplications }}</pre> -->
      <!-- <p>isAdmin = {{ isGameAdmin }}</p> -->
      <!-- <p>users applied = {{ applic_user }}</p> -->

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
        <br v-if="!game.price"/><br v-if="!game.price"/>
        <span v-if="game.duration">{{ game.duration}}</span>
        <div class="center aligned description">
          <p v-if="game.price">R$ {{ game.price }},00/h</p>
        </div>
        <span>
          <i class="user icon"></i>
          {{ available }} vagas restantes<br>
          Nível {{ avgLevel }}
        </span>

      </div>

      <!-- APAGAR JOGO (isGameAdmin) -->
      <div v-if="isGameAdmin" class="ui bottom attached button" @click.prevent="deleteGame(game.id)">
        APAGAR JOGO
      </div>

      <!-- SAIR DO JOGO (isPlaying) -->
      <div v-if="isPlaying && !leftGame" class="ui bottom attached button" @click.prevent="leaveGame(game.id)">
        SAIR DO JOGO
      </div>

      <!-- PARTICIPAR DO JOGO (MODIFICAR FUNCAO PARA JOIN DIRETO) -->
      <div v-else-if="available && isGameAdmin && !joinedGame" class="ui bottom attached button" @click.prevent="joinGame(game.id)">
        PARTICIPAR DO JOGO
      </div>

      <!-- SOLICITAR PARTICIPAR (!hasApplied && available) -->
      <div v-else-if="!hasApplied && available && !madeRequest" class="ui bottom attached button" @click.prevent="requestToJoinGame(game.id)">
        SOLICITAR PARTICIPAR
      </div>

      <!-- NÃO HÁ MAIS VAGAS -->
      <div v-else-if="!hasApplied && !available" class="ui bottom attached button">
        NÃO HÁ MAIS VAGAS
      </div>

      <!-- <div v-if="!isGameAdmin && hasApplied" class="ui">
        <a class="ui red bottom right attached label">Solicitação realizada</a>
        <p></p>
      </div> -->

      <!-- <div v-if="!userGamesIds.includes(game.id) && !userGamesApplied.includes(game.id) && available && !requested" class="ui bottom attached button" @click.prevent="requestToJoinGame(game.id)">
      <div v-if="available && !requested" class="ui bottom attached button" @click.prevent="requestToJoinGame(game.id)">
        <i class="add icon"></i>
        Solicitar Participar
      </div>
      <div v-else-if="available === 0" class="ui bottom attached button" @click.prevent="leaveGame(game.id)">
        Não há mais vagas!<br>Clique para sair.
      </div>
      <div v-else-if="available === 0" class="ui bottom attached button">
        Não há mais vagas!
      </div>
      <div v-else-if="isGameAdmin" class="ui bottom attached button" @click.prevent="deleteGame(game.id)">
        Apagar Jogo
      </div>
      <div v-else-if="userGamesIds.includes(game.id)" class="ui bottom attached button" @click.prevent="leaveGame(game.id)">
      <div class="ui bottom attached button" @click.prevent="leaveGame(game.id)">
        Você já está nesse jogo! Clique para sair.
      </div> -->

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

export default {
  name: 'Game',
  components: {
    GameRequest
  },
  props: {
    game: {
      type: Object,
      required: true
    },
    allUserGames: {
      type: Array,
      required: true
    },
    fromSearch: {
      type: Boolean,
      required: false,
      default: false
    }
    // authUser: {
    //   type: Object,
    //   required: true
    // }
  },
  data: function () {
    return {
      user: {},
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
      madeRequest: false
    }
  },
  beforeRouteEnter (to, from, next) {
    const token = localStorage.getItem('padel-token')
    return token ? next() : next('/login')
  },
  created () {
    this.getUserGames(this.userCallback)
    this.getGamesWithApplication(this.appliedCallback)
    this.formatInfo()
  },
  computed: {
    isGameAdmin () {
      return this.game.user_id === this.user.id
    },
    isPlaying () {
      return this.userGamesIds.includes(this.game.id)
    },
    hasApplied () {
      return this.userGamesApplied.includes(this.game.id)
    }
  //   gameHasApplication () {
  //     // console.log('userGamesApplied = ' + JSON.stringify(this.userGamesApplied, null, 2))
  //     // console.log('game.id = ' + JSON.stringify(this.game.id, null, 2))
  //     // console.log('allUserGames = ' + JSON.stringify(this.allUserGames, null, 2))
  //     // console.log('userGamesApplied = ' + JSON.stringify(this.userGamesApplied, null, 2))
  //     console.log('gameApplications = ' + JSON.stringify(this.gameApplications, null, 2))
  //     console.log('gameHasApplications = ' + JSON.stringify(this.gameApplications, null, 2))
  //     // console.log('user.games = ' + JSON.stringify(this.user.games, null, 2))
  //     if (this.gameApplications.length) {
  //       return this.gameHasApplications === true
  //     }
  //   }
  },
  methods: {
    userCallback (response) {
      this.user = response
      // Stores the IDs of all games the user is applied and accepted in var userGamesIds
      for (let i = 0; i < this.user.games.length; i++) {
        this.userGamesIds.push(this.user.games[i].id)
      }
      // Stores all ids of games the current user has applied and not been accepted yet in userGamesApplied
      for (let i = 0; i < this.user.applications.length; i++) {
        this.userGamesApplied.push(this.user.applications[i].id)
      }
    },
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

    getUserGames (callback) {
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

    // MAN AT WORK
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
      console.log('1) gameId = ' + JSON.stringify(gameId, null, 2))
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
