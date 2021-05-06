<template>
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
                    label="Old Password"
                    :newRules=newRules.same
                />
              </v-col>
              <v-col cols="12">
                <Password
                  label="New Password"
                  />
              </v-col>
              <v-col cols="12">
                <Password
                    label="Confirm new Password"
                />
              </v-col>

            </v-row>
          </v-container>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="close">
            Close
          </v-btn>
          <v-btn color="blue darken-1" text @click="changePassword">
            Save
          </v-btn>
        </v-card-actions>

      </v-card>
    </v-dialog>
  </v-row>
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
    password: "",
    newRules: {
      same: v => v === this.password || "Password don't match.",
    }
  }),
  methods: {
    close(){
      this.dialog = false;
      this.password = "";
    },
    changePassword() {
      this.dialog = false;
      this.$emit("changePassword", this.password);
    },
  },
};
</script>
