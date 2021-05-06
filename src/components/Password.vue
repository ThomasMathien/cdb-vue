<template>
  <v-text-field
      v-model="userPassword"
      :value="userPassword"
      :label="label"
      :append-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
      @click:append="() => (visible = !visible)"
      :type="visible ? 'text' : 'password'"
      :rules="[rules.password, rules.required, newRules]"
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
      required: v => !!v || "Required.",
      password: v => (v && v.length >= 8) || 'Password must be more than 8 characters',
    }
  }),
  methods:{
    changePassword(){
      this.$emit("changePassword", this.userPassword);
    }
  }
};
</script>


<style scoped>

</style>
