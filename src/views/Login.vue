<template>
  <div class="loginForm">
    <h1>Login</h1>
    <v-form
        ref="form"
        v-model="formValid"
        lazy-validation
    >

      <v-text-field
          v-model="email"
          :rules="emailRules"
          label="E-mail"
          required
      ></v-text-field>

      <Password/>

      <v-checkbox
          v-model="checkbox"
          label="Remember me"
          required
      ></v-checkbox>

      <router-link to="/dashboard/computer">
        <v-btn
            :disabled="!formValid"
            color="success"
            class="mr-4"
            @click="validate({email, password})"
        >
          Connect
        </v-btn>
      </router-link>

      <v-btn
          color="error"
          class="mr-4"
          @click="resetForm"
      >
        Reset Fields
      </v-btn>
    </v-form>
  </div>
</template>

<script>
import Password from '../components/Password.vue'
export default {
  name: 'Login',

  components: {
    Password,
  },

  data() {
    return {
      formValid: false,
      email: "",
      password: "",
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v) || 'E-mail must be valid',
      ],
      checkbox: false,
    }
  },

  methods: {
    validate(user) {
      this.$refs.form.validate()
      this.$emit("connect", user);
    },
    resetForm() {
      this.$refs.form.reset()
    }
  }
}
</script>

<style scoped>

h1 {
  font-size: 35px;
  color: darkcyan;
}

.loginForm {
  padding-top: 5%;
  padding-left: 25%;
  padding-right: 25%;
}

</style>

