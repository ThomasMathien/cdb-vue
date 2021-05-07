<template>
  <v-dialog v-model="show" persistent max-width="600px">
    <v-card>
      <v-card-title> {{ $t('newCompany')}} </v-card-title>
      <v-form ref="form" lazy-validation>
        <v-text-field :label="$t('companyName')" v-model="companyName" 
            :rules="companyNameRules"> 
        </v-text-field>
      </v-form>
      <v-card-actions>
        <v-btn @click.stop="resetForm">  {{$t('cancel') }} </v-btn>
        <v-btn type="submit" @click="validateForm"> {{$t('submit') }} </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import axios from "axios";

export default {
  name: "CompanyForm",
  props: {
    value: Boolean,
    company: Object
  },
  data() {
    return {
        companyName: (this.company ? this.company.name : null),
        companyNameRules: [
          v => (!!v && !!v.trim()) || this.$root.$t('companyNameRequired'),
      ],
    }
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
    methods: {
      resetForm() {
            this.show = false;
            this.$refs.form.reset();
      },
      validateForm() {
        if (this.$refs.form.validate()){
            if (!this.company.id) {
                this.createCompany();
            } else {
                this.updateCompany();
            }
         this.resetForm();
        }
      },
      createCompany() {
          let data = {name: this.companyName}
            axios
                .post("http://localhost:8080/webapp/api/company/create", data )
                .then((response) => console.log(response))
                .catch((err) => console.log(err));     
      },
       updateCompany() {
          let data = {id:this.company.id, name: this.companyName}
            axios
                .post("http://localhost:8080/webapp/api/company/update", data )
                .then((response) => console.log(response))
                .catch((err) => console.log(err));     
      },
  },
}

</script>