<template>
<div class="ui stackable grid vertically padded container">

  <div class="two wide column"></div>

  <div class="twelve wide column">

    <UserSidebar/>

    <div class="ui segment">
      <h2 class="ui medium dividing header">Criar Jogo</h2>

    <Notification :message="notification.message" :type="notification.type" v-if="notification.message" />

    <form class="ui attached segment form" @submit.prevent="addGame">

      <!-- DATE SELECTOR -->
      <div class="field" :class="{ error: errors.has('date') }">
        <label><i class="calendar alternate outline icon"></i> Data (Clique para escolher)</label>
        <v-date-picker name="date" mode='single' v-model='date' :attributes='attrs' v-validate="'required'"></v-date-picker>
      </div>

      <!-- TIME SELECTOR -->
      <div class="ui field" :class="{ error: errors.has('time') }">
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

      <button class="fluid ui primary button" :disabled="!isFormValid">CRIAR JOGO</button>

    </form>
    </div>
  </div>

  <div class="two wide column"></div>

</div>
</template>

<script>
import UserSidebar from '@/components/User/UserSidebar'
import Notification from '@/components/Notification'
import axios from '../../axios-instance'
import moment from 'moment'

export default {
  name: 'CreateGame',
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
      need_equip: '',
      price: '',
      max_num: '',
      notification: {
        message: '',
        type: ''
      },
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
  computed: {
    isFormValid () {
      return Object.keys(this.fields).every(key => this.fields[key].valid)
    }
    // canDeleteTweet () {
    //     return this.game.user_id === this.authUser.id
    // }
  },
  beforeRouteEnter (to, from, next) {
    const token = localStorage.getItem('padel-token')
    return token ? next() : next('/login')
  },
  methods: {
    addGame () {
      const token = localStorage.getItem('padel-token')
      if (this.date) {
        var searchDate = moment(this.date).format('YYYY-MM-DD')
      }
      var gameData = {
        date: searchDate,
        time: this.time,
        venue: this.venue,
        duration: this.duration,
        price: this.price,
        max_num: this.max_num
      }
      axios
        .post('/create_game', gameData, { headers: { Authorization: `Bearer ${token}` } })
        .then(response => {
          this.game = {}
          this.$router.push('/')
        })
    }
  }
}
</script>
