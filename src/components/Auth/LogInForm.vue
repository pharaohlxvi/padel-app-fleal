<template>
<div class="ui stackable grid vertically padded container">

  <auth-header class="float" />

  <div class="five wide column">
    <div class="ui segment header">
      <h1 class="ui center aligned icon header">
        <i class="circular blue address card icon"></i>
        Universidade Luterana do Brasil<br>
        <h2 class="ui center aligned">Junho/2018<br>Porto Alegre</h2>
        <h3 class="ui center aligned">Aluno:<br>Fabr&iacute;cio Bertol Leal</h3>
        <h4 class="ui center aligned">Contatos:</h4>
      </h1>
        <div class="ui two column grid raised segment">
          <div class="ui center aligned column">
            <a href="https://www.linkedin.com/in/fabricioleal/">
              <i class="big linkedin icon"></i>
              <p class="center aligned meta">LinkedIN</p>
            </a>
          </div>
          <div class="ui center aligned column">
            <a href="https://github.com/pharaohlxvi/">
              <i class="big github icon"></i>
              <p class="center aligned meta">GitHub</p>
            </a>
          </div>
        </div>
    </div>
  </div>

  <div class="eleven wide column">

      <div class="ui segment">
      <h2 class="ui medium dividing header">Entre na sua conta</h2>

      <Notification :message="notification.message" :type="notification.type" v-if="notification.message"/>

      <form class="ui form" @submit.prevent="login">
        <div class="field">
          <label>Email</label>
          <input type="email" name="email" v-model="email" placeholder="Email" required>
        </div>

        <div class="field">
          <label>Senha</label>
          <input type="password" name="password" v-model="password" placeholder="Password" required>
        </div>

        <button class="fluid ui primary button">ENTRAR</button>

      </form>
  </div>

      <div class="ui positive message">
        <i class="close icon"></i>
        <div class="header">
          Ainda n&atilde;o possui conta?
        </div>
        <p><b><router-link to="/signup">Cadastre-se</router-link></b> agora mesmo e encontre seus parceiros de Padel!</p>
      </div>

    </div>
  </div>
</template>

<script>
import Notification from '@/components/Notification'
import axios from '../../axios-instance'
import AuthHeader from '@/components/Auth/AuthHeader'

export default {
  name: 'LogInForm',
  components: {
    Notification,
    AuthHeader
  },
  data () {
    return {
      email: '',
      password: '',
      notification: {
        message: '',
        type: ''
      }
    }
  },
  beforeRouteEnter (to, from, next) {
    const token = localStorage.getItem('padel-token')
    return token ? next('/') : next()
  },
  methods: {
    login () {
      axios
        .post('/login', {
          email: this.email,
          password: this.password
        })
        .then(response => {
          // save token in localstorage
          localStorage.setItem('padel-token', response.data.data.token)
          // redirect to user home
          this.$router.push('/')
        })
        .catch(error => {
          // clear form inputs
          this.email = this.password = ''
          // display error notification
          this.notification = Object.assign({}, this.notification, {
            message: error.response.data.message,
            type: error.response.data.status
          })
        })
    }
  }
}
</script>
