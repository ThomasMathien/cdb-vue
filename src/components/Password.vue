<template>
  <v-text-field
      v-model="userPassword"
      :value="userPassword"
      :label="$t('password')"
      :append-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
      @click:append="() => (visible = !visible)"
      :type="visible ? 'text' : 'password'"
      :rules="[rules.required, rules.password, newRules]"
      @input="changePassword"
  />
</template>


<script>
export default {
  props: ["label", "newRules"],
  data: () => ({
    userPassword: "",
    visible: false,
    rules: {
      required: "",
      password: "",
    }
  }),
  mounted: function(){
    this.rules.required = v => !!v || this.$t('required')
    this.rules.password = v => (v && v.length >= 8) || this.$t('passwordMinimalLength')
  },
  methods:{
    changePassword(){
      this.$emit("changePassword", this.userPassword);
    }
  }
};
</script>


<style scoped>

</style>
