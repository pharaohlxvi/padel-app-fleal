<template>
<div class="ui stackable grid vertically padded container">

  <div class="two wide column"></div>

  <div class="twelve wide column">

    <UserSettingsMenu/>

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
import Notification from '@/components/Notification'
import UserSettingsMenu from '@/components/User/Settings/UserSettingsMenu'
import axios from '../../../axios-instance'

export default {
  name: 'UserProfileEditForm',
  components: {
    Notification,
    UserSettingsMenu
  },
  data () {
    return {
      password: '',
      newPassword: '',
      confirmPassword: '',
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
    return token ? next() : next('/login')
  },
  methods: {
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