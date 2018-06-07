<template v-if="gameId.length">
<div class="ui stackable grid vertically padded container">

  <div class="two wide column"></div>

  <div class="twelve wide column">

    <UserSidebar />

    <div class="ui segment">
      <h2 class="ui medium dividing header">Modificar Jogo</h2>

        <Notification :message="notification.message" :type="notification.type" v-if="notification.message" />

        <form class="ui form" @submit.prevent="updateGame(gameId)">

          <!-- DATE SELECTOR -->
          <div class="field" :class="{ error: errors.has('date') }">
            <label><i class="calendar alternate outline icon"></i> Data</label>
            <v-date-picker name="date" mode='single' v-model='date' :attributes='attrs' v-validate="'required'"></v-date-picker>
          </div>

          <!-- TIME SELECTOR -->
          <div class="field" :class="{ error: errors.has('time') }">
            <label><i class="clock outline icon"></i> Hor&aacute;rio</label>
            <input type="text" name="time" :class="{'input': true, 'is-danger': errors.has('time') }" v-model="time" placeholder="Exemplo: 20h00" v-validate="'required'">
            <span v-show="errors.has('time')" class="is-danger">{{ errors.first('time') }}</span>
          </div>

          <!-- VENUE SELECTOR -->
          <div class="field" :class="{ error: errors.has('venue') }">
            <label><i class="compass outline icon"></i> Local</label>
            <input type="text" name="venue" :class="{'input': true, 'is-danger': errors.has('venue') }" v-model="venue" placeholder="Digite o local do jogo" v-validate="'required'">
            <span v-show="errors.has('venue')" class="is-danger">{{ errors.first('venue') }}</span>
          </div>

          <!-- DURATION SELECTOR -->
          <div class="field" :class="{ error: errors.has('duration') }">
            <label><i class="stopwatch icon"></i> Dura&ccedil;&atilde;o</label>
            <input type="text" name="duration" :class="{'input': true, 'is-danger': errors.has('duration') }" v-model="duration" v-validate="'required'" placeholder="Exemplo: 1h00">
            <span v-show="errors.has('duration')" class="is-danger">{{ errors.first('duration') }}</span>
          </div>

          <!-- PRICE SELECTOR -->
          <div class="field" :class="{ error: errors.has('price') }">
            <label><i class="money bill alternate outline icon"></i> Pre&ccedil;o (sem centavos)</label>
            <input type="text" name="price" :class="{'input': true, 'is-danger': errors.has('price') }" v-model="price" placeholder="Exemplo: 20">
            <span v-show="errors.has('price')" class="is-danger">{{ errors.first('price') }}</span>
          </div>

          <!-- MAXIMUM PLAYERS SELECTOR -->
          <div class="field" :class="{ error: errors.has('max_num') }">
            <label><i class="users icon"></i>Limite de Jogadores</label>
            <input type="text" name="max_num" :class="{'input': true, 'is-danger': errors.has('max_num') }" v-model="max_num" v-validate="'required'" placeholder="Exemplo: 6">
            <span v-show="errors.has('max_num')" class="is-danger">{{ errors.first('max_num') }}</span>
          </div>

          <button class="ui button primary">Enviar</button>
        </form>
    </div>
  </div>
</div>
</template>

<script>
import Notification from '@/components/Notification'
import UserSidebar from '@/components/User/UserSidebar'
import axios from '../../axios-instance'

export default {
  name: 'ModifyGame',
  components: {
    Notification,
    UserSidebar
  },
  data () {
    return {
      date: '',
      time: '',
      venue: '',
      duration: '',
      need_equip: false,
      price: '',
      avg_level: '',
      max_num: '',
      notification: {
        message: '',
        type: ''
      },
      game_id: '',
      attrs: [
        {
          key: 'today',
          highlight: {
            backgroundColor: '#ff8080'
            // Other properties are available too, like `height` & `borderRadius`
          },
          contentStyle: {
            color: '#fafafa'
          },
          dates: new Date(1, 0, 2018)
        }
      ]
    }
  },
  props: {
    gameId: {
      type: Number,
      required: true
    }
  },
  computed: {
    isFormValid () {
      return Object.keys(this.fields).every(key => this.fields[key].valid)
    }
  },
  beforeRouteEnter (to, from, next) {
    const token = localStorage.getItem('padel-token')
    return token ? next() : next('/login')
  },
  created () {
    this.game_id = parseInt(this.gameId)
    this.fetchGame(this.game_id)
  },
  methods: {
    fetchGame (gameId) {
      const token = localStorage.getItem('padel-token')
      axios
        .get(`/fetch_game/${gameId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        .then(response => {
          this.date = response.data.data.date
          this.time = response.data.data.time
          this.venue = response.data.data.venue
          this.duration = response.data.data.duration
          // this.need_equip = response.data.data.need_equip
          this.price = response.data.data.price
          // this.avg_level = response.data.data.avg_level
          this.max_num = response.data.data.max_num
        })
    },
    updateGame () {
      const token = localStorage.getItem('padel-token')
      console.log('1) token = ' + JSON.stringify(token, null, 2))
      axios
        .put(`/game/update/${this.gameId}`, {
          date: this.date,
          time: this.time,
          venue: this.venue,
          duration: this.duration,
          // need_equip: this.need_equip,
          price: this.price,
          // avg_level: this.avg_level,
          max_num: this.max_num
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        .then(response => {
          console.log('2) response = ' + JSON.stringify(response, null, 2))
          // display success notification
          this.notification = Object.assign({}, this.notification, {
            message: response.data.message,
            type: 'success'
          })
          this.$router.push('/')
        })
    }
  }
}
</script>
