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
        <span class="headline">Choose a new email</span>
      </v-card-title>

      <v-card-text>
        <v-form
            ref="form"
            v-model="formValid"
        >
          <v-container>
            <v-row>

              <v-col cols="12">
                <Email
                    v-if="dialog"
                    label="New Email"
                    :value="email"
                    @changeEmail="updateEmail"
                />
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
            @click="changeEmail">
          Save
        </v-btn>
      </v-card-actions>

    </v-card>
  </v-dialog>

</template>

<script>
import Email from './Email'

export default {
  props: ["user"],

  components: {
    Email,
  },

  data: () => ({
    dialog: false,
    formValid: false,
    email: ""
  }),

  mounted: function () {
    this.email = this.user.email;
  },

  methods: {
    close() {
      this.dialog = false;
    },
    changeEmail() {
      this.dialog = false;
      this.$refs.form.validate();
      this.$emit("changeEmail", this.email);
    },
    updateEmail(email) {
      this.email = email;
    },
  },
};
</script>
