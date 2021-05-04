<template>
  <div>
    <h1>ee</h1>
    <v-card>
      <form>
        <v-text-field
          v-model="email"
          :error-messages="emailErrors"
          label="E-mail"
          required
          @input="$v.email.$touch()"
          @blur="$v.email.$touch()">
        </v-text-field>
        <v-checkbox
          v-model="checkbox"
          :error-messages="checkboxErrors"
          label="Remember me"
          @change="$v.checkbox.$touch()"
          @blur="$v.checkbox.$touch()">
        </v-checkbox>
        <v-btn class="mr-4" @click="submit"> submit </v-btn>
        <v-btn @click="clear"> clear </v-btn>
      </form>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "Login",
};
</script>