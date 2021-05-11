<template>
  <v-dialog v-model="dialog" persistent max-width="600px">

    <template v-slot:activator="{ on, attrs }">
      <v-btn
          color="button"
          dark
          fab
          small
          v-bind="attrs"
          v-on="on">
        <v-icon>mdi-circle-edit-outline</v-icon>
      </v-btn>
    </template>

    <v-card>

      <v-card-title>
        <span class="headline">Choose a new username</span>
      </v-card-title>

      <v-card-text>
        <v-form
            ref="form"
            v-model="formValid"
        >
          <v-container>
            <v-row>

              <v-col cols="12">
                <Username
                    v-if="dialog"
                    label="New Username"
                    :value="username"
                    @changeUsername="updateUsername"/>
              </v-col>

            </v-row>
          </v-container>
        </v-form>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
            color="blue darken-1"
            text
            @click="close">
          Close
        </v-btn>
        <v-btn
            :disabled="!formValid"
            color="blue darken-1"
            text
            @click="changeUsername">
          Save
        </v-btn>
      </v-card-actions>

    </v-card>
  </v-dialog>
</template>

<script>
import Username from "./Username";

export default {
  props: ["user"],

  components: {
    Username,
  },

  data: () => ({
    dialog: false,
    formValid: false,
    username: ""
  }),
  mounted: function () {
    this.username = this.user.username;
  },
  methods: {
    close() {
      this.dialog = false;
      this.username = this.user.username;
    },
    changeUsername() {
      this.dialog = false;
      this.$refs.form.validate();
      this.$emit("changeUsername", this.username);
    },
    updateUsername(username) {
      this.username = username;
    }
  },
};
</script>
