<template v-if="authUser.length">
  <div class="ui feed">

    <filtered-games
      :auth-user="authUser"
      :filtered-games="authUser.games"
    />

  </div>
</template>

<script>
import FilteredGames from '@/components/Game/FilteredGames'

export default {
  name: 'Games',
  components: {
    FilteredGames
  },
  props: {
    authUser: {
      type: Object,
      required: true
    }
  }
}
</script>
