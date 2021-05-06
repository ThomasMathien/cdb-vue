<template>
  <div>
    <CompanyForm  v-if="displayForm" v-model="displayForm" v-bind:company="editedCompany" />
    <Snackbar v-bind:display="displaySnackbar"  v-bind:message="snackbarMessage" @input="displaySnackbar = false" />
    <v-dialog v-model="showConfirm" persistent max-width="600px">
      <v-card>
        <v-card-title> {{$t("deletionConfirmation")}} </v-card-title>
        <v-card-subtitle> {{$t("deletionConfirmationMessage")}} </v-card-subtitle>
        <v-card-actions>
          <v-btn @click.stop="showConfirm=false">  {{$t("cancel")}} </v-btn>
          <v-btn type="submit" @click="showConfirm = false; deleteCompany()">  {{$t("confirm")}} </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-main id="table">
      <h2> {{$t("totalCompaniesFound")}} : {{totalItems}}</h2>
      <v-toolbar fixed table>
          <!-- TODO remove or handle disabled -->
        <v-text-field
          disabled 
          v-model="searchField"
          :label= "$t('search')"
          single-line
          hide-details
          @keyup.enter.native="search"
        >
          <template v-slot:append>
            <v-btn v-if="displayClearSearch" icon @click="clearSearch">
              <v-icon> mdi-close </v-icon>
            </v-btn>
            <v-btn icon @click="search">
              <v-icon> mdi-magnify </v-icon>
            </v-btn>
          </template>
        </v-text-field>
        <v-btn rounded icon @click.stop="addCompany"
          ><v-icon large>mdi-plus-circle</v-icon></v-btn
        >
      </v-toolbar>
      <v-card>
        <v-data-table
          :show-select="canEdit ? true : false"
          height="400px"
          v-model="selectedCompanies"
          :headers="headers"
          fixed-header
          hide-default-footer
          :items="companies"
          :items-per-page="itemsPerPage"
          @click:row="editCompany"
          class="elevation-4"
        >
        </v-data-table>
        <div>
          <v-row>
            <v-col cols="1">
              <v-btn icon 
                v-if="canEdit" 
                @click="showConfirm=true"
                :disabled="!hasSelectedCompanies"
                >
                <v-icon large>mdi-delete</v-icon>
              </v-btn>
            </v-col>
            <v-spacer />
            <v-col>
              <!-- TODO remove or handle disabled -->
              <v-select
                :label= "$t('companiesPerPage')"
                v-model="itemsPerPage"
                :items="itemsPerPageOptions"
                @input="getCompanies"
                disabled
              >
              </v-select>
            </v-col>
            <v-col>
              <v-pagination v-model="page" :length="pageCount" :total-visible="pageCount" @input="getCompanies"> </v-pagination>
            </v-col>
          </v-row>
        </div>
      </v-card>
    </v-main>
  </div>
</template>

<script>
import CompanyForm from "../components/CompanyForm";
import Snackbar from "../components/Snackbar";
import axios from "axios";

export default {
  name: "DashboardCompany",
  components: {
    CompanyForm,
    Snackbar
  },
  props: {
    role: String,
  },
  computed: {
    canEdit() {
      return this.role === "ROLE_ADMIN";
    },
    displayClearSearch() {
      return this.searchField.length != 0;
    },
    pageCount() {
        return Math.ceil(this.totalItems / this.itemsPerPage);
    },
    hasSelectedCompanies() {
      return this.selectedCompanies.length > 0;
    }
  },
  methods: {
    search() {
      this.companies = [],
      this.getCompanies()
    },
    addCompany() {
      this.editedCompany = null;
      this.displayForm = true;
    },
    editCompany(value){
      this.editedCompany = value;
      this.displayForm = true;
    },
    clearSearch() {
      this.searchField = "";
      this.getCompanies();
    },

    getCompanies() {
      axios
        .get(
          "http://localhost:8080/webapp/api/company/page/"+(this.page-1)
        )
        .then((response) => {
          this.companies = response.data;
        })
        .catch((err) => console.log(err));
    },
    // deleteCompany() {
    //   axios
    //     .get(
    //       "http://localhost:8080/webapp/api/company/delete/"+
    //     )
    //     .then((response) => {
    //       this.companies = response.data;
    //     })
    //     .catch((err) => console.log(err));
    // },
    getTotalItems() {
        axios
            .get(
            "http://localhost:8080/webapp/api/company"
            )
            .then((response) => {
            this.totalItems = response.data.length;

            })
            .catch((err) => console.log(err));
    },
  },
  mounted() {
    axios
      .get(
        "http://localhost:8080/webapp/api/company/page/"+(this.page-1)
      )
      .then((response) => {
        this.companies = response.data;
        this.getTotalItems();
      })
      .catch((err) => console.log(err));



    //   axios
    //   .get(
    //     "http://localhost:8080/webapp/api/computer/count"
    //   )
    //   .then((response) => {
    //     this.pageCount = response.data;
    //   })
    //   .catch((err) => console.log(err));
  },
  data: function () {
    return {
      totalItems: 0,
      selectedCompanies: [],
      editedCompany: null,
      page: 1,
      displayForm: false,
      showConfirm: false,
      searchField: "",
      itemsPerPage: 10,
      itemsPerPageOptions: [10, 50, 100],
      displaySnackbar: false,
      snackbarMessage: "",
      headers: [
        {
          text: this.$t("companyName"),
          align: "start",
          sortable: false,
          value: "name",
        },
      ],
      companies: [],
    };
  },
};
</script>
