<template>
  <v-text-field
      v-model="username"
      :label="label"
      :rules="rules"
      @input="changeUsername"
  />
</template>

<script>
export default {
  props: ["label", "value"],
  data: () => ({
        username: "",
        rules: [
          v => !!v || 'Username is required',
        ],
      }
  ),
  mounted: function () {
    this.username = this.value;
  },
  methods: {
    changeUsername() {
      this.$emit("changeUsername", this.username);
    }
  }
}
</script>

<style scoped>

</style>
