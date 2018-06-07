<template>
    <div>
        <div class="ui attached menu">
            <router-link class="item" to="/">
                <i class="home icon">
                  <!-- <div class="tiny inverted outlined circular floating ui red label"></div> -->
                </i>
            </router-link>
            <!-- <router-link class="item" to="/">
              <i class="inbox icon"><div class="mini inverted circular floating ui red label">3</div></i>
            </router-link> -->
            <!-- <router-link class="item" :to="`/${user.email}`">Perfil</router-link> -->
            <router-link class="item" to="/create/game"><i class="baseball ball icon"></i>Criar Jogo</router-link>
            <router-link class="item" to="/search/games"><i class="search icon"></i>Buscar Jogos</router-link>
            <router-link class="item" to='/settings/profile'><i class="settings icon"></i>Configura&ccedil;&otilde;es</router-link>
            <a class="item float right" @click="logout"><i class="sign out icon"></i></a>
        </div>
    </div>
</template>

<script>
export default {
  name: 'UserSidebar',
  methods: {
    logout () {
      localStorage.removeItem('padel-token')
      this.$router.push('/login')
    }
  }
}
</script>
