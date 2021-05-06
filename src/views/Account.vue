<template>
  <div class="account">

    <h1>
      Your Account
    </h1>

    <v-card class="accountCard">
      <v-card-text>
        Username : {{ user.username }}
        <UsernameModal
            @changeUsername="changeUsername"
            :user="user"
        />
      </v-card-text>
      <v-card-text>
        Email : {{ user.email }}
        <EmailModal
            @changeEmail="changeEmail"
            :user="user"
        />
      </v-card-text>
      <v-card-text>
        Birthday : TODO...
      </v-card-text>
      <v-card-text>
        Password :
        <PasswordModal
            @changeUsername="changeUsername"
            :user="user"
        />
      </v-card-text>
    </v-card>

  </div>

</template>

<script>
import UsernameModal from '../components/UsernameModal'
import EmailModal from '../components/EmailModal'
import PasswordModal from '../components/PasswordModal'

export default {
  name: "Account",
  props: ['user'],
  components: {
    UsernameModal,
    EmailModal,
    PasswordModal
  },
  data() {
    return {}
  },
  methods: {
    changeUsername(username) {
      this.$emit("changeUsername", username);
    },
    changeEmail(email) {
      this.$emit("changeEmail", email);
    }
  }
}
</script>

<style scoped>

.accountCard {
  margin-top: 5%;
  margin-left: 15%;
  margin-right: 15%;
}

</style>
