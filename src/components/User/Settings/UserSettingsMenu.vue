<template>
  <div>
    <div class="ui attached menu">
      <router-link class="item" to="/">
        <i class="home icon"></i>
      </router-link>
      <router-link class="item" to='/settings/profile'>Modificar Dados</router-link>
      <router-link class="item" to="/settings/password">Alterar Senha</router-link>
      <a class="item" @click="logout"><i class="sign out icon"></i></a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserSettingsMenu',
  methods: {
    logout () {
      localStorage.removeItem('padel-token')
      this.$router.push('/login')
    }
  }
}
</script>
