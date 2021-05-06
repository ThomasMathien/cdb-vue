<template>
  <v-text-field
      autocomplete="current-password"
      :value="userPassword"
      :label="$t('password')"
      :append-icon="value ? 'mdi-eye' : 'mdi-eye-off'"
      @click:append="() => (value = !value)"
      :type="value ? 'password' : 'text'"
      :rules="[rules.password, rules.required]"
      @input="_=>userPassword=_"
  ></v-text-field>
</template>


<script>
export default {
  data: () => ({
    userPassword: "",
    valid: true,
    value: true,
    rules: {
      required: v => !!v || this.$t('required'),
      password: v => (v && v.length >= 8) || this.$t('passwordMinimalLength'),
    }
  })
};
</script>


<style scoped>

</style>
