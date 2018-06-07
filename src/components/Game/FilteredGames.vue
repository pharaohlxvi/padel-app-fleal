<template v-if="authUser.length && filteredGames.length && allUserGames.length">
    <div class="ui feed">
      <!-- <pre>{{ filteredGames }}</pre> -->
      <!-- <pre>{{ authUser.name }}</pre> -->
      <!-- <pre>{{ allUserGames[0] }}</pre> -->
      <!-- <pre>{{ game[0] }}</pre> -->
      <hr>
        <!-- <pre>{{ authUser }}</pre> -->
        <Game
            v-for="game in filteredGames"
            :key="game.id"
            :game="game"
            :allUserGames="allUserGames"
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
    }
  }
}
</script>
