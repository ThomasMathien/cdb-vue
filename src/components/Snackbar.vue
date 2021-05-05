<template>
    <v-snackbar
      v-model="display"
      :timeout="timeout"
    >
      {{ message }}

      <template v-slot:action="{ attrs }">
        <v-btn
          color="blue"
          text
          v-bind="attrs"
          @click="display = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
</template>

<script>
export default {
    props: {
        message: String,
        display: Boolean
    },
    data() {
      return {
        timeout: 2000,
      }
    }
};
</script>


<style scoped>

</style>
