<template>
<div class="ui stackable grid vertically padded container">

  <div class="two wide column"></div>

  <div class="twelve wide column">

    <UserSidebar/>

    <div class="ui segment">
      <h2 class="ui medium dividing header">Criar Jogo</h2>

    <Notification :message="notification.message" :type="notification.type" v-if="notification.message" />

    <form class="ui attached segment form" @submit.prevent="addGame">

      <div class="two fields"> <!-- DATE & TIME -->

        <!-- DATE SELECTOR -->
        <div class="field" :class="{ error: errors.has('date') }">
          <label><i class="calendar alternate outline icon"></i> Data (Clique para escolher)</label>
          <v-date-picker name="date" mode='single' v-model='date' :attributes='attrs' v-validate="'required'"></v-date-picker>
        </div>

        <!-- TIME SELECTOR -->
        <!-- <div class="ui form"> -->
        <div class="field" :class="{ error: errors.has('time') }">
          <label><i class="clock outline icon"></i> Hor&aacute;rio</label>
          <select class="ui fluid search dropdown" name="time" :class="{'input': true, 'is-danger': errors.has('time') }" v-model="time" v-validate="'required'">
            <option value="">Selecione o hor&aacute;rio do jogo</option>
            <option value="8h00">8h00</option>
            <option value="8h30">8h30</option>
            <option value="9h00">9h00</option>
            <option value="9h30">9h30</option>
            <option value="10h00">10h00</option>
            <option value="10h30">10h30</option>
            <option value="11h00">11h00</option>
            <option value="11h30">11h30</option>
            <option value="12h00">12h00</option>
            <option value="12h30">12h30</option>
            <option value="13h00">13h00</option>
            <option value="13h30">13h30</option>
            <option value="14h00">14h00</option>
            <option value="14h30">14h30</option>
            <option value="15h00">15h00</option>
            <option value="15h30">15h30</option>
            <option value="16h00">16h00</option>
            <option value="16h30">16h30</option>
            <option value="17h00">17h00</option>
            <option value="17h30">17h30</option>
            <option value="18h00">18h00</option>
            <option value="18h30">18h30</option>
            <option value="19h00">19h00</option>
            <option value="19h30">19h30</option>
            <option value="20h00">20h00</option>
            <option value="20h30">20h30</option>
            <option value="21h00">21h00</option>
            <option value="21h30">21h30</option>
            <option value="22h00">22h00</option>
            <option value="22h30">22h30</option>
          </select>
          <!-- </div> -->
          <span v-show="errors.has('level')" class="is-danger">{{ errors.first('level') }}</span>
        </div>

        <!-- <div class="ui field" :class="{ error: errors.has('time') }">
          <label><i class="clock outline icon"></i> Hor&aacute;rio</label>
          <input type="text" name="time" :class="{'input': true, 'is-danger': errors.has('time') }" v-model="time" placeholder="Exemplo: 20h00" v-validate="'required'">
          <span v-show="errors.has('time')" class="is-danger">{{ errors.first('time') }}</span>
        </div> -->
      </div>

      <div class="two fields"> <!-- VENUE & DURATION -->
        <!-- VENUE SELECTOR -->
        <div class="field" :class="{ error: errors.has('venue') }">
          <label><i class="compass outline icon"></i> Local</label>
          <input type="text" name="venue" :class="{'input': true, 'is-danger': errors.has('venue') }" v-model="venue" placeholder="Digite o local do jogo" v-validate="'required'">
          <span v-show="errors.has('venue')" class="is-danger">{{ errors.first('venue') }}</span>
        </div>

        <!-- DURATION SELECTOR -->
        <!-- <div class="ui form"> -->
        <div class="field" :class="{ error: errors.has('duration') }">
          <label><i class="stopwatch icon"></i> Dura&ccedil;&atilde;o</label>
          <select class="ui search dropdown" name="duration" :class="{'input': true, 'is-danger': errors.has('duration') }" v-model="duration" v-validate="'required'">
            <option value="">Selecione a dura&ccedil;&atilde;o do jogo</option>
            <option value="30min">30min</option>
            <option value="1h">1h</option>
            <option value="1h30">1h30</option>
            <option value="2h">2h</option>
            <option value="2h30">2h30</option>
            <option value="3h">3h</option>
            <option value="3h30">3h30</option>
            <option value="4h">4h</option>
          </select>
          <!-- </div> -->
          <span v-show="errors.has('duration')" class="is-danger">{{ errors.first('duration') }}</span>
        </div>
      </div>

      <!-- <div class="field" :class="{ error: errors.has('duration') }">
        <label><i class="stopwatch icon"></i> Dura&ccedil;&atilde;o</label>
        <input type="text" name="duration" :class="{'input': true, 'is-danger': errors.has('duration') }" v-model="duration" v-validate="'required'" placeholder="Exemplo: 1h00">
        <span v-show="errors.has('duration')" class="is-danger">{{ errors.first('duration') }}</span>
      </div> -->

      <div class="two fields"> <!-- PRICE & MAXIMUM PLAYERS -->
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
      </div>

      <!-- NEED EQUIPMENT? -->
        <div class="ui checkbox field" :class="{ error: errors.has('need_equip') }">
          <input type="checkbox" tabindex="0" name="need_equip" :class="{'input': true, 'is-danger': errors.has('need_equip') }" v-model="need_equip">
          <span v-show="errors.has('available')" class="is-danger">{{ errors.first('need_equip') }}</span>
          <label>Jogador Deve Levar Sua Própria Raquete (marque para 'sim')</label>
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
      need_equip: false,
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
        max_num: this.max_num,
        need_equip: this.need_equip
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
