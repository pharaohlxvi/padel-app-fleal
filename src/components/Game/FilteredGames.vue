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

<style scoped>
  .tutorial-list {
    margin: 20px 0;
    display: flex;
    justify-content: space-between;
    flex-flow: wrap;
  }

  .tutorial {
    padding: 20px;
  }

  @media only screen and (min-width: 600px) {
    .tutorial {
      width: 50%;
    }
  }

  /* VUE TRANSITION */
  .swap-enter-active, .swap-leave-active {
    transition: all .25s ease-in-out;
  }
  .swap-enter, .swap-leave-active {
    opacity: 0;
  }
  .swap-enter {
    transform: translateX(75px);
  }
  .swap-leave-to {
    transform: translateX(-75px);
  }
</style>
