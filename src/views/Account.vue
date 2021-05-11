<template>
  <div class="account">

    <h2>
      Your Account
    </h2>

    <v-card class="accountCard">
      <v-card-text>
        <v-timeline
            align-top
            dense
        >
          <v-timeline-item
              color="title"
              small
          >
            <div class="accountItem">
                <UsernameModal
                    @changeUsername="changeUsername"
                    :user="user"
                />
              <strong> Username : </strong> {{ user.username }}
            </div>
          </v-timeline-item>
          <v-timeline-item
              color="title"
              small
          >
            <div class="accountItem">
              <EmailModal
                  @changeEmail="changeEmail"
                  :user="user"
              />
              <strong> Email :</strong> {{ user.email }}
            </div>
          </v-timeline-item>
          <v-timeline-item
              color="title"
              small
          >
            <div class="accountItem">
              <BirthdayModal
                  @changeBirthday="changeBirthday"
                  :user="user"
              />
              <strong> Birthday :</strong> {{ user.birthday }}
            </div>
          </v-timeline-item>
          <v-timeline-item
              color="title"
              small
          >
            <div class="accountItem">
              <PasswordModal
                  @changePassword="changePassword"
                  :user="user"
              />
              <strong> Edit Password </strong>
            </div>
          </v-timeline-item>
        </v-timeline>
      </v-card-text>
    </v-card>

  </div>

</template>

<script>
import UsernameModal from '../components/UsernameModal'
import EmailModal from '../components/EmailModal'
import PasswordModal from '../components/PasswordModal'
import BirthdayModal from '../components/BirthdayModal'


export default {
  name: "Account",
  props: ['user'],
  components: {
    UsernameModal,
    EmailModal,
    PasswordModal,
    BirthdayModal,
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
    },
    changePassword(password) {
      this.$emit("changePassword", password);
    },
    changeBirthday(birthday) {
      this.$emit("changeBirthday", birthday);
    }
  }
}
</script>

<style scoped>

.accountCard {
  margin-top: 2%;
  margin-left: 15%;
  margin-right: 15%;
}

.accountItem {
  font-size: 20px;
}

.accountItemButton{
  text-align: right;
}

</style>
