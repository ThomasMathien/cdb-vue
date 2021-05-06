<template>
  <v-form
      ref="form"
      v-model="formValid"
  >
    <v-row justify="center">
      <v-dialog v-model="dialog" persistent max-width="600px">

        <template v-slot:activator="{ on, attrs }">
          <v-btn
              color="primary"
              dark
              fab
              v-bind="attrs"
              v-on="on">
            <v-icon>mdi-circle-edit-outline</v-icon>
          </v-btn>
        </template>

        <v-card>

          <v-card-title>
            <span class="headline">Choose a new password</span>
          </v-card-title>

          <v-card-text>
            <v-container>
              <v-row>

                <v-col cols="12">
                  <Password
                      v-if="dialog"
                      label="Old Password"
                      :newRules=newRules.sameOld

                  />
                </v-col>
                <v-col cols="12">
                  <Password
                      v-if="dialog"
                      label="New Password"
                      @changePassword="updatePassword"
                  />
                </v-col>
                <v-col cols="12">
                  <Password
                      v-if="dialog"
                      label="Confirm new Password"
                      :newRules=newRules.sameNew
                  />
                </v-col>

              </v-row>
            </v-container>
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
                @click="changePassword">
              Save
            </v-btn>
          </v-card-actions>

        </v-card>
      </v-dialog>
    </v-row>
  </v-form>
</template>

<script>
import Password from "./Password";

export default {
  components: {
    Password
  },
  props: ["user"],
  data: () => ({
    dialog: false,
    formValid: false,
    password: "",
    newRules: {
      sameOld: "",
      sameNew: ""
    }
  }),
  mounted: function () {
    this.newRules.sameOld = v => v === this.user.password || "Password doesn't match with the current one."
    this.newRules.sameNew = v => v === this.password || "Passwords don't match."
  },
  methods: {
    close() {
      this.dialog = false;
      this.password = "";
    },
    changePassword() {
      this.dialog = false;
      this.$refs.form.validate();
      this.$emit("changePassword", this.password);
      this.password = "";
    },
    updatePassword(password) {
      this.password = password;
    }
  },
};
</script>
