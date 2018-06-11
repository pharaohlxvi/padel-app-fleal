<template v-if="authUser.length">
  <div class="ui feed">

    <hr><br>

      <Game
        v-for="game in filteredGames"
        :key="game.id"
        :game="game"
        :auth-user="authUser"
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
    fromSearch: {
      type: Boolean,
      required: false
    }
  }
}
</script>
