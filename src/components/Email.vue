<template>
  <v-text-field
      v-model="email"
      :rules="[rules.required, rules.regex]"
      :label="label"
      @input="changeEmail"
  />
</template>

<script>
export default {
  props: ["label", "value"],
  data: () => ({
        email: "",
        rules: [
          v => !!v || 'E-mail is required',
          v => /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v) || 'E-mail must be valid',
        ],
      }
  ),
  mounted: function () {
    this.email = this.value;
  }
  ,
  methods: {
    changeEmail() {
      this.$emit("changeEmail", this.email);
    }
  }
}
</script>

<style scoped>

</style>
