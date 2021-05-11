<template>
  <div
      class="loginForm"
  >
    <h2>
      {{ $t('login') }}
    </h2>

    <v-form
        ref="form"
        v-model="formValid"
    >
      <Email
          :label="$t('email')"
          @changeEmail="changeEmail"
      />

      <Password
          label="Enter Password"
          @changePassword="changePassword"
      />

      <v-checkbox
          v-model="checkbox"
          :label="$t('rememberMe')"
          required
      ></v-checkbox>

      <v-btn
          :disabled="!formValid"
          color="success"
          class="mr-4"
          @click="validate({email, password})"
      >
        {{ $t('login') }}
      </v-btn>

      <v-btn
          color="error"
          class="mr-4"
          @click="resetForm"
      >
        {{ $t('resetFields') }}
      </v-btn>
    </v-form>
  </div>
</template>

<script>
import Password from '../components/Password.vue'
import Email from '../components/Email.vue'

export default {
  components: {
    Password,
    Email,
  },

  data() {
    return {
      formValid: false,
      email: "",
      password: "",
      checkbox: false,
    }
  },

  methods: {
    changeEmail(email) {
      this.email = email;
    },
    changePassword(password) {
      this.password = password;
    },
    validate(user) {
      this.$refs.form.validate()
      this.$emit("connect", user);
      this.$router.push("/dashboard/computer");
    },
    resetForm() {
      this.$refs.form.reset()
    }
  }
}
</script>

<style scoped>

.loginForm {
  padding-top: 5%;
  padding-left: 25%;
  padding-right: 25%;
  text-align: center;
}


</style>

