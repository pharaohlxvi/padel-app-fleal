<template>
<div class="ui stackable grid vertically padded container">

  <div class="two wide column"></div>

  <div class="twelve wide column">

      <AuthMenu/>

      <div class="ui segment">
      <h2 class="ui medium dividing header">Crie sua conta</h2>

      <Notification :message="notification.message" :type="notification.type" v-if="notification.message" />

      <form class="ui form" @submit.prevent="signup">
        <div class="field" :class="{ error: errors.has('name') }">
          <label>Nome</label>
          <input type="text" name="name" v-model="name" v-validate="'required'" placeholder="Digite seu Nome">
          <span v-show="errors.has('name')" class="is-danger">{{ errors.first('name') }}</span>
        </div>

        <div class="field" :class="{ error: errors.has('email') }">
          <label>Email</label>
          <input type="email" name="email" :class="{'input': true, 'is-danger': errors.has('email') }" v-model="email" v-validate="'required|email'" placeholder="Email">
          <span v-show="errors.has('email')" class="is-danger">{{ errors.first('email') }}</span>
        </div>

        <div class="field" :class="{ error: errors.has('password') }">
          <label>Senha</label>
          <input type="password" name="password" :class="{'input': true, 'is-danger': errors.has('password') }" v-model="password" v-validate="'required'" placeholder="Senha">
          <span v-show="errors.has('password')" class="is-danger">{{ errors.first('password') }}</span>
        </div>

        <div class="two fields"> <!-- AGE $ LEVEL -->
          <div class="field" :class="{ error: errors.has('age') }">
            <label>Idade</label>
            <input type="text" name="age" :class="{'input': true, 'is-danger': errors.has('age') }" v-model="age" v-validate="'required'" placeholder="Idade">
            <span v-show="errors.has('age')" class="is-danger">{{ errors.first('age') }}</span>
          </div>

            <!-- <div class="ui form"> -->
          <div class="field" :class="{ error: errors.has('level') }">
              <label>N&iacute;vel de Habilidade</label>
              <select class="ui search dropdown" name="level" :class="{'input': true, 'is-danger': errors.has('level') }" v-model="level" v-validate="'required'">
                <option value="">Selecione uma das op&ccedil;&otilde;es</option>
                <option value="1">Iniciante</option>
                <option value="2">Intemedi&aacute;rio</option>
                <option value="3">Semiprofissional</option>
                <option value="4">Profissional</option>
              </select>
            <!-- </div> -->
            <span v-show="errors.has('level')" class="is-danger">{{ errors.first('level') }}</span>
          </div>
        </div>

        <button class="fluid ui primary button" :disabled="!isFormValid">ENVIAR</button>

      </form>

    </div>
      <div class="ui column grid">
        <div class="center aligned column">
          <p>
            J&aacute; possui uma conta? <router-link to="/login">Fa&ccedil;a seu login</router-link>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Notification from '@/components/Notification'
import axios from '../../axios-instance'
import AuthMenu from '@/components/Auth/AuthMenu'

export default {
  name: 'SignUpForm',
  components: {
    Notification,
    AuthMenu
  },
  data () {
    return {
      name: '',
      email: '',
      password: '',
      age: '',
      level: '',
      notification: {
        message: '',
        type: ''
      }
    }
  },
  computed: {
    isFormValid () {
      return Object.keys(this.fields).every(key => this.fields[key].valid)
    }
  },
  beforeRouteEnter (to, from, next) {
    const token = localStorage.getItem('padel-token')
    return token ? next('/') : next()
  },
  methods: {
    signup () {
      var userData = {
        name: this.name,
        email: this.email,
        password: this.password,
        age: this.age,
        level: this.level
      }
      axios
        .post('/signup', userData)
        .then(response => {
          console.log('signup 5) ' + JSON.stringify(response.data.data.token, null, 2))
          // save token in localstorage
          localStorage.setItem('padel-token', response.data.data.token)
          // redirect to user home
          this.$router.push('/')
        })
        .catch(error => {
          console.log(error)
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
