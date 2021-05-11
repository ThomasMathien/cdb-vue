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
        <span class="headline">Choose a new birthday</span>
      </v-card-title>

      <v-card-text>
        <v-form
            ref="form"
            v-model="formValid"
        >
          <v-container>
            <v-row justify="center">
                <Birthday
                    v-if="dialog"
                    label="New Birthday"
                    :value="birthday"
                    @changeBirthday="updateBirthday"/>
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
            @click="changeBirthday">
          Save
        </v-btn>
      </v-card-actions>

    </v-card>
  </v-dialog>
</template>

<script>
import Birthday from "./Birthday";

export default {
  props: ["user"],

  components: {
    Birthday,
  },

  data: () => ({
    dialog: false,
    formValid: false,
    birthday: ""
  }),
  mounted: function () {
    this.birthday = this.user.birthday;
  },
  methods: {
    close() {
      this.dialog = false;
      this.birthday = this.user.birthday;
    },
    changeBirthday() {
      this.dialog = false;
      this.$refs.form.validate();
      this.$emit("changeBirthday", this.birthday);
    },
    updateBirthday(birthday) {
      this.birthday = birthday;
    }
  },
};
</script>

