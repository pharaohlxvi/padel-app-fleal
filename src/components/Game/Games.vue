<template v-if="allUserGames.length && authUser.length">
    <div class="ui feed">
      <!-- <pre>{{ authUser.name }}</pre>
      <pre>{{ allUserGames[0] }}</pre> -->
        <filtered-games :authUser="authUser" :allUserGames.sync="allUserGames" :filteredGames.sync="allUserGames"
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
    },
    allUserGames: {
      type: Array,
      required: true
    }
  }
}
</script>
