<template v-if="authUser.length && filteredGames.length && allUserGames.length">
  <div class="ui feed">

    <hr>

    <Game
      v-for="game in filteredGames"
      :key="game.id"
      :game="game"
      :allUserGames="allUserGames"
      :fromSearch="fromSearch"
    />

  </div>
</template>

<script>
import Game from '@/components/Game/Game'

export default {
  name: 'FilteredGames',
  components: {
    Game
  },
  props: {
    filteredGames: {
      type: Array,
      required: true
    },
    authUser: {
      type: Object,
      required: true
    },
    allUserGames: {
      type: Array,
      required: true
    },
    fromSearch: {
      type: Boolean,
      required: false
    }
  }
}
</script>
