<template v-if="currUser.length">
    <div>
      <div class="ui container">
        <div class="ui attached menu">
            <router-link class="item" to="/">
                <i class="home icon">
                </i>
            </router-link>
            <router-link class="item" :to="{ name: 'createGame', params: {currUser: currUser} }"><i class="baseball ball icon"></i>Criar Jogo</router-link>
            <router-link class="item" :to="{ name: 'searchGames', params: {currUser: currUser} }"><i class="search icon"></i>Buscar Jogos</router-link>
            <router-link class="item" :to="{ name: 'userProfileSettings', params: {currUser: currUser} }"><i class="settings icon"></i>Configura&ccedil;&otilde;es</router-link>
            <a class="item float right" @click="logout"><i class="sign out icon"></i></a>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'UserSidebar',
  props: {
    currUser: {
      type: Object,
      required: true
    }
  },

  methods: {
    logout () {
      localStorage.removeItem('padel-token')
      this.$router.push('/login')
    }
  }
}
</script>
