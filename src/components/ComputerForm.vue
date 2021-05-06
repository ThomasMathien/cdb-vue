<template>
  <v-dialog v-model="show" persistent max-width="600px">
    <v-card>
      <v-card-title> Computer Form </v-card-title>
      <v-form ref="form" lazy-validation>
        <v-text-field label="Computer Name" v-model="computerName" 
            :rules="computerNameRules"> 
        </v-text-field>
        <v-menu
          ref="menuIntroduced"
          v-model="menuIntroduced"
          :close-on-content-click="false"
          :return-value.sync="introduced"
          transition="scale-transition"
          offset-y
          min-width="auto"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="introduced"
              label="Introduction date"
              prepend-icon="mdi-calendar"
              readonly
              clearable
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker v-model="introduced" no-title scrollable>
            <v-spacer></v-spacer>
            <v-btn text color="primary" @click="menuIntroduced = false">
              Cancel
            </v-btn>
            <v-btn
              text
              color="primary"
              @click="$refs.menuIntroduced.save(introduced)"
            >
              OK
            </v-btn>
          </v-date-picker>
        </v-menu>

        <v-menu
          ref="menuDiscontinued"
          v-model="menuDiscontinued"
          :close-on-content-click="false"
          :return-value.sync="discontinued"
          transition="scale-transition"
          offset-y
          min-width="auto"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="discontinued"
              label="Discontinuation date"
              prepend-icon="mdi-calendar"
              :rules="discontinuedRules"
              readonly
              clearable
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker v-model="discontinued" 
                no-title
                scrollable>
            <v-spacer></v-spacer>
            <v-btn text color="primary" @click="menuDiscontinued = false">
              Cancel
            </v-btn>
            <v-btn
              text
              color="primary"
              @click="$refs.menuDiscontinued.save(discontinued)"
            >
              OK
            </v-btn>
          </v-date-picker>
        </v-menu>

        <v-autocomplete v-model="selectedCompany"
          label= "Company"
          :items="companyOptions"
          item-text="name"
          item-value="id"
          clearable
        ></v-autocomplete>
      </v-form>
      <v-card-actions>
        <v-btn @click.stop="resetForm"> Cancel </v-btn>
        <v-btn type="submit" @click="validateForm"> Submit </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import axios from "axios";

export default {
  name: "ComputerForm",
  props: {
    value: Boolean,
    computer: Object,
  },
  data() {
    return {
      computerName: (this.computer ? this.computer.name : null) ,
      introduced: new Date().toISOString().substr(0, 10),
      discontinued: null,
      selectedCompany: (this.computer && this.computer.companyDTORest ? this.computer.companyDTORest.id : null),
      menuIntroduced: false,
      menuDiscontinued: false,
      companyOptions: [],
      computerNameRules: [
          v => (!!v && !!v.trim()) || 'Computer name is required',
      ],
      discontinuedRules: [
          v => (!v || v >= this.introduced) || "Discontinuation date must be after introduction date"
      ]
    };
  },
  computed: {
      show: {
          get () {
              return this.value;
          },
          set (value) {
              this.$emit('input', value);
          }
      }
  },
  mounted() {
    axios
      .get("http://localhost:8080/webapp/api/company")
      .then((response) => {
        this.companyOptions = response.data;
      })
      .catch((err) => console.log(err));
  },

  methods: {
      resetForm() {
            this.show = false;
            this.$refs.form.reset();
            this.introduced = new Date().toISOString().substr(0, 10);
      },
      validateForm() {
        if (this.$refs.form.validate()){
            if (!this.computerId) {
                this.createComputer();
            } else {
                this.updateComputer();
            }
         this.resetForm();
        }
      },
      createComputer() {
            let data = {name: this.computerName, 
                introduced: this.introduced, 
                discontinued: this.discontinued, 
                companyDTORest: {
                  id: this.selectedCompany,
                  name: null
                }
            }
            axios
                .post("http://localhost:8080/webapp/api/computer/create", data)
                .then((response) => {
                  console.log(response)
                  this.$emit("computerAdded")
                })
                .catch((err) => console.log(err));     
      },
      updateComputer() {
            let data = {name: this.computerName,
                 id: this.computerId,
                 introduced: this.introduced,
                 discontinued: this.discontinued,
                 companyId: this.selectedCompany}
            axios
                .post("http://localhost:8080/webapp/api/computer/update", data )
                .then((response) => {
                  console.log(response)
                  this.$emit("computerEdited");
                })
                .catch((err) => console.log(err));
            }
      }
};
</script>
