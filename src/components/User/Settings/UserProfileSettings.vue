<template>
<div class="ui stackable grid vertically padded container">

  <user-sidebar :curr-user="currUser" class="float"/>

  <div v-if="currUser" class="five wide column">

    <img class="ui fluid image" src="../../../assets/logo.png">

    <div class="ui fluid raised card"> <!-- authUser Card -->

      <div class="content">

        <img class="left floated mini ui image" src="https://www.gravatar.com/avatar/default?s=200&r=pg&d=mm">

        <div class="header"> <!-- name -->
          {{ `${currUser.name}` }}
        </div>

        <div class="meta"> <!-- email -->
          {{ `${currUser.email}` }}
        </div>

        <!-- <div class="statistic"> games -->
        <div class="ui center aligned grid container">
          <div class="center aligned statistic">
            <div class="label">
              Prticipando de
            </div>
          <div class="value">
            <i class="blue hand point right outline icon"></i> {{ `${currUser.games.length}` }}
          </div>
            <div class="label">
              Jogos
            </div>
          </div>
        </div>

        <div class="ui center aligned grid">
          <hr>
          <p class="content meta">Membro desde {{ currUser.created_at | joined }}</p>
          <br>
        </div>

      </div>
    </div>

  </div>

  <div class="eleven wide column">

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

    <div class="ui segment">
        <h2 class="ui dividing header">Modificar Senha</h2>

        <Notification :message="notification.message" :type="notification.type" v-if="notification.message" />

        <form class="ui form" @submit.prevent="changePassword">
          <div class="field" :class="{ error: errors.has('password') }">
            <label>Senha Atual</label>
            <input type="password" name="password" v-model="password" data-vv-as="current password" v-validate="'required'">
            <span v-show="errors.has('password')" class="is-danger">{{ errors.first('password') }}</span>
          </div>

          <div class="field" :class="{ error: errors.has('newPassword') }">
            <label>Nova Senha</label>
            <input type="password" name="newPassword" v-model="newPassword" data-vv-as="new password" v-validate="'required'">
            <span v-show="errors.has('newPassword')" class="is-danger">{{ errors.first('newPassword') }}</span>
          </div>

          <div class="field" :class="{ error: errors.has('confirmPassword') }">
            <label>Confirmar Nova Senha</label>
            <input type="password" name="confirmPassword" v-model="confirmPassword" data-vv-as="confirm password" v-validate="'required|confirmed:newPassword'">
            <span v-show="errors.has('confirmPassword')" class="is-danger">{{ errors.first('confirmPassword') }}</span>
          </div>

          <button type="submit" class="ui button primary" :disabled="!isFormValid">Modificar Senha</button>
        </form>
      </div>

  </div>
</div>
</template>

<script>
import UserCard from '@/components/User/Profile/UserCard'
import Notification from '@/components/Notification'
import UserSidebar from '@/components/User/UserSidebar'
import axios from '../../../axios-instance'

export default {
  name: 'UserProfileSettings',
  components: {
    Notification,
    UserSidebar,
    UserCard
  },
  props: {
    currUser: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      name: '',
      email: '',
      age: '',
      level: '',
      password: '',
      newPassword: '',
      confirmPassword: '',
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
  computed: {
    isFormValid () {
      return Object.keys(this.fields).every(key => this.fields[key].valid)
    }
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
    },

    changePassword () {
      const token = localStorage.getItem('padel-token')
      axios
        .put('/account/change_password', {
          password: this.password,
          newPassword: this.newPassword
        }, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        .then(response => {
          // clear form inputs
          this.password = this.newPassword = this.confirmPassword = ''
          // display success notification
          this.notification = Object.assign({}, this.notification, {
            message: response.data.message,
            type: 'success'
          })
          this.$router.push('/')
        })
        .catch(error => {
          // clear form inputs
          this.password = this.newPassword = this.confirmPassword = ''
          // clear form error messages
          this.$nextTick(() => {
            this.$validator.reset()
          })
          // display error notification
          this.notification = Object.assign({}, this.notification, {
            message: error.response.data.message,
            type: 'danger'
          })
        })
    }
  }
}
</script>
