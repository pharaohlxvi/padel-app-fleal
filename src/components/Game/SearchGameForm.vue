<template v-if="allUserGames.length">
<div class="ui segment">
  <h2 class="ui medium dividing header">Buscar Jogos</h2>
  <form class="ui attached segment form">

    <div class="two fields"> <!-- DATE & TIME -->
      <!-- DATE SELECTOR -->
      <div class="ui field" :class="{ error: errors.has('date') }">
        <label><i class="calendar alternate outline icon"></i> Data (Clique para escolher)</label>
        <v-date-picker mode='single' v-model='searchTerm.date' :attributes='attrs' show-caps></v-date-picker>
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

    <div class="ui fields">
      <!-- LEVEL SELECTOR -->
      <!-- <div class="six wide field" :class="{ error: errors.has('avg_level') }">
        <label>Escolha o n&iacute;vel do jogo:</label>
        <select class="ui search dropdown" name="avg_level" :class="{'input': true, 'is-danger': errors.has('avg_level') }" v-model="searchTerm.avg_level">
          <option value="">Selecione uma das op&ccedil;&otilde;es</option>
          <option value="1">Iniciante</option>
          <option value="2">Intemedi&aacute;rio</option>
          <option value="3">Semiprofissional</option>
          <option value="4">Profissional</option>
        </select>
        <span v-show="errors.has('avg_level')" class="is-danger">{{ errors.first('avg_level') }}</span>
      </div> -->

      <!-- <div class="ten wide field"> -->
        <div class="ui grouped">
          <h5 class="ui header center aligned">Selecione conforme desejado:</h5>
          <!-- <div class="grouped"> -->
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
          <!-- </div> -->

      <!-- <div class="results"> -->

        <!-- {{ searchTerm }}
        {{ currUser.games }} -->

        <!-- <div v-if="!filteredGames">
          <br>
          <h3 class="ui header">Selecione acima seus crit&eacute;rios de busca</h3>
        </div> -->

        <!-- <div v-else> -->
          <!-- <FilteredGames :filteredGames="filteredGames" :authUser="currUser" :fromSearch="fromSearch"/> -->
        <!-- </div> -->

      <!-- </div> -->
    </div>
  </form>

  <div class="results">

    <Pagination v-if="filteredGames.length" v-model="page" :items="filteredGames.length" :perPage="10" />

    <FilteredGames :filteredGames="pageOfGames" :authUser="currUser" :fromSearch="fromSearch"/>

    <Pagination v-if="filteredGames.length" v-model="page" :items="filteredGames.length" :perPage="10" />

    <div v-if="!filteredGames.length">
      <h3 class="ui segment center aligned header">Selecione acima seus crit&eacute;rios de busca</h3>
      <br>
    </div>
  </div>
</div>
</template>

<script>
import Pagination from '@/components/Pagination'
import getArraySection from '@/get-array-section'
import FilteredGames from '@/components/Game/FilteredGames'
import axios from '../../axios-instance'
import moment from 'moment'

export default {
  components: {
    FilteredGames,
    Pagination
  },
  computed: {
    pageOfGames: function () {
      return getArraySection(this.filteredGames, this.page, 10)
    }
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
      ],
      page: 1
    }
  },
  beforeRouteEnter (to, from, next) {
    const token = localStorage.getItem('padel-token')
    return token ? next() : next('/login')
  },
  watch: {
    searchTerm: {
      handler: function (val) {
        setTimeout(() => {
          this.filterGames(val, this.filterGamesCallback)
          this.$emit('input', val)
        }, 1000)
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
