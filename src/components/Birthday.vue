<template>
  <v-date-picker
      v-model="birthday"
      :label="label"
      :rules="rules"
      @input="changeBirthday"
      elevation="2"
  />
</template>

<script>
export default {
  props: ["label", "value"],
  data: () => ({
        birthday: "",
        rules: [
          v => !!v || 'Birthday is required',
        ],
      }
  ),
  mounted: function () {
    this.birthday = this.value;
  },
  methods: {
    changeBirthday() {
      this.$emit("changeBirthday", this.birthday);
    }
  }
}
</script>

<style scoped>

</style>
