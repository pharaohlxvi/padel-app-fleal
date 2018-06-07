<template>
<div class="ui stackable grid vertically padded container">

  <div class="two wide column"></div>

  <div class="twelve wide column">

    <UserSettingsMenu/>

    <div class="ui segment">
      <h2 class="ui medium dividing header">Editar Perfil</h2>

        <Notification :message="notification.message" :type="notification.type" v-if="notification.message" />

        <form class="ui form" @submit.prevent="updateProfile">
          <div class="field" :class="{ error: errors.has('name') }">
            <label>Nome</label>
            <input type="text" name="name" v-model="name" v-validate="'required'">
            <span v-show="errors.has('name')" class="is-danger">{{ errors.first('name') }}</span>
          </div>

          <div class="field" :class="{ error: errors.has('email') }">
            <label>Email</label>
            <input type="email" name="email" v-model="email" v-validate="'required|email'" placeholder="Email">
            <span v-show="errors.has('email')" class="is-danger">{{ errors.first('email') }}</span>
          </div>

          <div class="field" :class="{ error: errors.has('age') }">
            <label>Idade</label>
            <input type="text" name="age" v-model="age" v-validate="'required'" placeholder="Idade">
            <span v-show="errors.has('age')" class="is-danger">{{ errors.first('age') }}</span>
          </div>

          <div class="field" :class="{ error: errors.has('level') }">
            <label>N&iacute;vel de Habilidade</label>
            <select class="ui search dropdown" name="level" v-model="level" v-validate="'required'">
              <option value="">Selecione uma das op&ccedil;&otilde;es</option>
              <option value="1">Iniciante</option>
              <option value="2">Intemedi&aacute;rio</option>
              <option value="3">Semiprofissional</option>
              <option value="4">Profissional</option>
            </select>
            <span v-show="errors.has('level')" class="is-danger">{{ errors.first('level') }}</span>
          </div>

          <button class="ui button primary">Enviar</button>
        </form>
    </div>
  </div>
</div>
</template>

<script>
import Notification from '@/components/Notification'
import UserSettingsMenu from '@/components/User/Settings/UserSettingsMenu'
import axios from '../../../axios-instance'

export default {
  name: 'UserProfileSettings',
  components: {
    Notification,
    UserSettingsMenu
  },
  data () {
    return {
      name: '',
      email: '',
      age: '',
      level: '',
      notification: {
        message: '',
        type: ''
      }
    }
  },
  beforeRouteEnter (to, from, next) {
    const token = localStorage.getItem('padel-token')
    return token ? next() : next('/login')
  },
  created () {
    this.fetchAuthenticatedUser()
  },
  methods: {
    fetchAuthenticatedUser () {
      const token = localStorage.getItem('padel-token')
      axios
        .get('users/games', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        .then(response => {
          this.name = response.data.data.name
          this.email = response.data.data.email
          this.age = response.data.data.age
          this.level = response.data.data.level
        })
    },
    updateProfile () {
      const token = localStorage.getItem('padel-token')
      axios
        .put('/account/update_profile', {
          name: this.name,
          email: this.email,
          age: this.age,
          level: this.level
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        .then(response => {
          // display success notification
          this.notification = Object.assign({}, this.notification, {
            message: response.data.message,
            type: 'success'
          })
          this.$router.push('/')
        })
    }
  }
}
</script>
