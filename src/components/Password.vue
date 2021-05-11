<template>
  <v-text-field
      v-model="userPassword"
      :value="userPassword"
      :label="$t('password')"
      :append-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
      @click:append="() => (visible = !visible)"
      :type="visible ? 'text' : 'password'"
      :rules="rules"
      @input="changePassword"
  />
</template>


<script>
export default {
  props: ["label", "newRules"],
  data: () => ({
    userPassword: "",
    visible: false,
    rules: []
  }),
  mounted: function(){
    this.rules.push(v => !!v || 'Password ' + this.$t('required'));
    this.rules.push(v => (v && v.length >= 8) || this.$t('passwordMinimalLength'));
    if(this.newRules){
      this.rules.push(this.newRules);
    }
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
