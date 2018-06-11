<template v-if="player.length">
<div>

  <a class="ui label"><i class="user icon"></i> {{ player.name }} ({{ this.player.age }}) - Nível {{ this.playerLevel }}</a>

</div>
</template>

<script>
export default {
  name: 'Players',
  props: {
    player: {
      type: Object,
      required: true
    },
    currUser: {
      type: Object,
      required: true
    }
  },
  data: function () {
    return {
      playerLevel: ''
    }
  },
  beforeRouteEnter (to, from, next) {
    const token = localStorage.getItem('padel-token')
    return token ? next() : next('/login')
  },
  created () {
    this.formatLevel()
  },
  methods: {
    formatLevel: function () {
      if (this.player.level === 1) {
        this.playerLevel = 'Iniciante'
      } else if (this.player.level === 2) {
        this.playerLevel = 'Intermediário'
      } else if (this.player.level === 3) {
        this.playerLevel = 'Semiprofissional'
      } else {
        this.playerLevel = 'Profissional'
      }
    }
  }
}
</script>
