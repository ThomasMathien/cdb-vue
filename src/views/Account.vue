<template>
  <div class="account">

    <h1>
      Your Account
    </h1>

    <v-card class="accountCard">
      <v-card-title>
        Username
      </v-card-title>
      <v-card-text>
        {{ this.user.username }}
      </v-card-text>
      <v-card-title>
        Email
      </v-card-title>
      <v-card-text>
        {{ this.user.email }}
      </v-card-text>
      <v-card-title>
        Birthday
      </v-card-title>
      <v-card-text>
        TODO...
      </v-card-text>
      <v-card-title>
        Password
      </v-card-title>
      <v-card-text>
        {{ this.user.password }}
      </v-card-text>
    </v-card>

  </div>

</template>

<script>
export default {
  name: "Account",
  props: ['user'],
  data() {
    return {}
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
