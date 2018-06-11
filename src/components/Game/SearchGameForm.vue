<template v-if="allUserGames.length">
<div class="ui segment">
  <h2 class="ui medium dividing header">Buscar Jogos</h2>
  <form class="ui attached segment form">

    <div class="two fields"> <!-- DATE & TIME -->
      <!-- DATE SELECTOR -->
      <div class="ui field" :class="{ error: errors.has('date') }">
        <label><i class="calendar alternate outline icon"></i> Data (Clique para escolher)</label>
        <v-date-picker mode='single' v-model='searchTerm.date' :attributes='attrs' show-caps></v-date-picker>
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

    <div class="ui fields">
        <div class="ui grouped">
          <h5 class="ui header center aligned">Selecione conforme desejado:</h5>
          <!-- AVAILABILITY CHECKBOX -->
          <div class="two fields">
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
          </div>
        </div>

    </div>
  </form>
  <div class="results">
    <br>
    <div class="ui container right aligned">{{ this.filteredGames.length }} jogos encontrados</div>
    <FilteredGames :filteredGames="filteredGames" :authUser="currUser" :fromSearch="fromSearch"/>
    <div v-if="!filteredGames.length">
      <h3 class="ui segment center aligned header">Selecione acima seus crit&eacute;rios de busca</h3>
      <br>
    </div>
  </div>
</div>
</template>

<script>
import FilteredGames from '@/components/Game/FilteredGames'
import axios from '../../axios-instance'
import moment from 'moment'

export default {
  components: {
    FilteredGames
  },
  props: {
    currUser: {
      type: Object,
      required: true
    },
    allUserGames: {
      type: Array,
      required: true
    },
    fromSearch: {
      type: Boolean,
      required: true
    }
  },
  data: function () {
    return {
      filteredGames: [],
      searchTerm: {
        venue: '',
        date: '',
        price: '',
        available: '',
        ownGame: ''
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
  beforeRouteEnter (to, from, next) {
    const token = localStorage.getItem('padel-token')
    return token ? next() : next('/login')
  },
  watch: {
    searchTerm: {
      handler: function (val) {
        // console.log('val = ' + JSON.stringify(val, null, 2))
        // setTimeout(() => {
        this.filterGames(val, this.filterGamesCallback)
        // setTimeout(() => {
        this.$emit('input', val)
        // }, 1000)
        // this.$emit('input', val)
      },
      deep: true
    }
  },
  methods: {
    filterGamesCallback (response, val) {
      this.filteredGames = response.filter(game => {
        return (
          (!val.available || game.max_num - game.curr_num > 0) &&
          (!val.ownGame || (game.user_id === this.currUser.id))
        )
      })
    },

    filterGames: function (val, callback) {
      const token = localStorage.getItem('padel-token')
      if (this.filteredGames.length === 0) { this.filteredGames = this.allUserGames }
      if (val.date) {
        val.date = moment(val.date).format('YYYY-MM-DD')
      }
      axios
        .post('/games/searched', val, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        .then(response => {
          callback(response.data.data, val)
        })
    }
  }
}
</script>
