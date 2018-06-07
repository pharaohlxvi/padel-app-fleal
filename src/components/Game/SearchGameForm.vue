<template v-if="allGames.length && user.length && allUserGames">
<div class="ui stackable grid vertically padded container">

  <div class="two wide column"></div>

  <div class="twelve wide column">

    <UserSidebar/>

    <div class="ui segment">
      <h2 class="ui medium dividing header">Buscar Jogos</h2>
      <form class="ui attached segment form">

        <div class="two fields"> <!-- DATE & TIME -->
          <!-- DATE SELECTOR -->
          <div class="ui field" :class="{ error: errors.has('date') }">
            <label><i class="calendar alternate outline icon"></i> Data (Clique para escolher)</label>
            <v-date-picker mode='single' v-model='searchTerm.date' :attributes='attrs'></v-date-picker>
            <!-- <input type="text" name="date" v-model="searchTerm.date" placeholder="Digite a data e o horário do jogo"> -->
            <!-- <span v-show="errors.has('date')" class="is-danger">{{ errors.first('date') }}</span> -->
          </div>

          <!-- TIME SELECTOR -->
          <div class="ui field" :class="{ error: errors.has('time') }">
            <label><i class="clock outline icon"></i> Hor&aacute;rio</label>
            <input type="text" name="time" :class="{'input': true, 'is-danger': errors.has('time') }" v-model="searchTerm.time" placeholder="Exemplo: 20h00">
            <span v-show="errors.has('time')" class="is-danger">{{ errors.first('time') }}</span>
          </div>
        </div>

        <div class="two fields"> <!-- VENUE & PRICE -->
          <!-- VENUE SELECTOR -->
          <div class="ui field" :class="{ error: errors.has('venue') }">
            <label><i class="compass outline icon"></i> Local</label>
            <input type="text" name="venue" :class="{'input': true, 'is-danger': errors.has('venue') }" v-model="searchTerm.venue" placeholder="Digite o local do jogo">
            <span v-show="errors.has('venue')" class="is-danger">{{ errors.first('venue') }}</span>
          </div>

          <!-- PRICE SELECTOR -->
          <div class="ui field" :class="{ error: errors.has('price') }">
            <label><i class="money bill alternate outline icon"></i> Pre&ccedil;o (sem centavos)</label>
            <input type="text" name="price" :class="{'input': true, 'is-danger': errors.has('price') }" v-model="searchTerm.price" placeholder="Exemplo: 20">
            <span v-show="errors.has('price')" class="is-danger">{{ errors.first('price') }}</span>
          </div>
        </div>

        <!-- AVAILABILITY CHECKBOX -->
        <div class="ui checkbox field" :class="{ error: errors.has('available') }">
          <input type="checkbox" tabindex="0" name="available" :class="{'input': true, 'is-danger': errors.has('available') }" v-model="searchTerm.available">
          <span v-show="errors.has('available')" class="is-danger">{{ errors.first('available') }}</span>
          <label>Mostrar Somente Jogos com Vagas Dispon&iacute;veis</label>
        </div>

        <!-- OWN GAME CHECKBOX -->
        <div class="ui checkbox field" :class="{ error: errors.has('ownGame') }">
          <input type="checkbox" tabindex="0" name="ownGame" :class="{'input': true, 'is-danger': errors.has('ownGame') }" v-model="searchTerm.ownGame">
          <span v-show="errors.has('ownGame')" class="is-danger">{{ errors.first('ownGame') }}</span>
          <label>Mostrar Somente Jogos os quais Administra</label>
        </div>

        <!-- <pre>{{ allGames }}</pre> -->

        <div class="results">
          <FilteredGames :filteredGames="filteredGames" :allUserGames="allUserGames" :authUser="user"/>
        </div>

      </form>
    </div>
  </div>
</div>
</template>

<script>
import UserSidebar from '@/components/User/UserSidebar'
import FilteredGames from '@/components/Game/FilteredGames'
import axios from '../../axios-instance'
import moment from 'moment'

export default {
  components: {
    FilteredGames,
    UserSidebar
  },
  props: {
    allGames: {
      type: Array,
      required: true
    },
    allUserGames: {
      type: Array,
      required: true
    }
  },
  data: function () {
    return {
      filteredGames: [],
      searchTerm: {
        venue: '',
        date: null,
        price: '',
        available: '',
        ownGame: ''
      },
      user: {},
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
  beforeRouteEnter (to, from, next) {
    const token = localStorage.getItem('padel-token')
    return token ? next() : next('/login')
  },
  created () {
    this.getUser()
  },
  watch: {
    searchTerm: {
      handler: function (val) {
        this.filterGames()
        this.$emit('input', val)
      },
      deep: true
    }
  },
  methods: {
    filterGames: function () {
      if (this.filteredGames.length === 0) { this.filteredGames = this.allGames }
      if (this.searchTerm.date) {
        var searchDate = moment(this.searchTerm.date).format('YYYY-MM-DD')
      }
      this.filteredGames = this.allGames.filter(game => {
        return (
          (game.venue.toLowerCase().search(this.searchTerm.venue.toLowerCase()) >= 0) &&
          (this.searchTerm.date === null || game.date.search(searchDate) >= 0) &&
          (!game.price || game.price.toString().search(this.searchTerm.price) >= 0) &&
          (!this.searchTerm.available || game.max_num - game.curr_num > 0) &&
          (!this.searchTerm.ownGame || (game.user_id === this.user.id))
        )
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
