<template>
  <div>
    jdjdjdjdj
    <!-- <UserProfileHeader
      :user="user"
      :auth-user="authUser"
    />
    <div class="ui stackable grid container">
      <div class="four wide column">
        <UserProfileSidebarDetails :user="user"/>
      </div>
      <div class="eight wide column">
        <div class="ui segment">
          <h2 class="ui medium dividing header">Eventos</h2>

          <Tweets
            :events.sync="events"
            :auth-user="authUser"
          />
        </div>

      </div>
      <div class="four wide column">
        <WhoToFollow v-if="isLoggedIn"/>
      </div>
    </div> -->
  </div>
</template>

<script>
// import UserProfileHeader from '@/components/User/Profile/UserProfileHeader'
// import UserProfileSidebarDetails from '@/components/User/Profile/UserProfileSidebarDetails'
// import WhoToFollow from '@/components/User/WhoToFollow'
// import Events from '@/components/Event/Events'

export default {
  // name: 'UserProfile',
  // components: {
  //   UserProfileSidebarDetails,
  //   UserProfileHeader,
  //   WhoToFollow,
  //   Events
  // },
  // data () {
  //   return {
  //     user: '',
  //     authUser: '',
  //     events: []
  //   }
  // },
  // beforeRouteUpdate (to, from, next) {
  //   this.fetchUser(to.params.email)

  //   next()
  // },
  // computed: {
  //   isLoggedIn () {
  //     return !!this.authUser
  //   }
  // },
  // created () {
  //   this.fetchUser(this.$route.params.email)

  //   const token = localStorage.getItem('padel-token')

  //   if (token) {
  //     this.fetchAuthenticatedUser(token)
  //   }
  // },
  // methods: {
  //   fetchUser (email) {
  //     axios.get(`/${email}`).then(response => {
  //       this.user = response.data.data
  //       this.events = response.data.data.events.reverse()
  //     })
  //   },
  //   fetchAuthenticatedUser (token) {
  //     axios
  //       .get('account/me', {
  //         headers: {
  //           Authorization: `Bearer ${token}`
  //         }
  //       })
  //       .then(response => {
  //         this.authUser = response.data.data
  //       })
  //   }
  // }
}
</script>
