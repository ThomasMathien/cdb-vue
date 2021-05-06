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
          <span class="headline">Choose a new email</span>
        </v-card-title>

        <v-card-text>
          <v-container>
            <v-row>

              <v-col cols="12">
                <v-text-field
                    v-model="email"
                    type="text"
                    label="New Email"
                    :value="email"
                    required
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
          <v-btn color="blue darken-1" text @click="changeEmail">
            Save
          </v-btn>
        </v-card-actions>

      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  props: ["user"],
  data: () => ({
    dialog: false,
    email: ""
  }),
  mounted: function () {
    this.email = this.user.email;
  },
  methods: {
    close() {
      this.dialog = false;
      this.email = this.user.email;
    },
    changeEmail() {
      this.dialog = false;
      this.$emit("changeEmail", this.email);
    },
  },
};
</script>
