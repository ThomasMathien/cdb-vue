<template>
  <div>

    <ComputerForm  v-if="displayForm" v-model="displayForm" v-bind:computer="editedComputer"
      @computerAdded="showSnackbar($t('snackbarComputerAdded'))"
      @computerEdited="showSnackbar($t('snackbarComputerEdited'))"
     />
    <Snackbar v-bind:display="displaySnackbar"  v-bind:message="snackbarMessage" @input="displaySnackbar = false" />
    <v-dialog v-model="showConfirm" persistent max-width="600px">
      <v-card>
        <v-card-title> {{$t( 'deletionConfirmation')}} </v-card-title>
        <v-card-subtitle> {{$t( 'deletionConfirmationMessage')}} </v-card-subtitle>
        <v-card-actions>
          <v-btn @click.stop="showConfirm=false"> {{$t( 'cancel')}} </v-btn>
          <v-btn type="submit" @click="showConfirm = false; deleteComputer()"> {{$t('confirm')}} </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-main id="table">
      <h2>
        {{$t( 'totalComputersFound' )}} : {{totalItems}}
      </h2>
      <v-toolbar fixed table>
        <v-text-field
          v-model="searchField"
          :label=  "$t('search')"
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
        <v-btn rounded icon @click.stop="addComputer"
          ><v-icon large>mdi-plus-circle</v-icon></v-btn
        >
      </v-toolbar>
      <v-card>
        <v-data-table
          :show-select="canEdit ? true : false"
          height="400px"
          v-model="selectedComputers"
          :headers="headers"
          fixed-header
          hide-default-footer
          :items="computers"
          :items-per-page="itemsPerPage"
          @click:row="editComputer"
          class="elevation-4"
        >
        </v-data-table>
        <div>
          <v-row>
            <v-col cols="1">
              <v-btn 
                icon 
                v-if="canEdit"
                @click="showConfirm=true"
                :disabled="!hasSelectedComputer"
               >
                <v-icon large>mdi-delete</v-icon>
              </v-btn>
            </v-col>
            <v-spacer />
            <v-col>
              <v-select
                :label= "$t('computersPerPage')"
                v-model="itemsPerPage"
                :items="itemsPerPageOptions"
                @input="changeItemsPerPage"
              >
              </v-select>
            </v-col>
            <v-col>
              <v-pagination v-model="page" :length="pageCount" :total-visible="10" @input="getComputers"> </v-pagination>
            </v-col>
          </v-row>
        </div>
      </v-card>
    </v-main>
  </div>
</template>

<script>
import ComputerForm from "../components/ComputerForm";
import Snackbar from "../components/Snackbar";
import axios from "axios";
export default {
  name: "DashboardComputer",
  components: {
    ComputerForm,
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
    pageCount(){
      return Math.ceil( this.totalItems  / this.itemsPerPage ) ;
    },
    hasSelectedComputer(){
      return this.selectedComputers.length > 0;
    },
    headers() {
      return [
          {
            text: this.$t("computerName"),
            align: "start",
            sortable: false,
            value: "name",
          },
          { text: this.$t("introducedDate"), value: "introduced" },
          { text: this.$t("discontinuedDate"), value: "discontinued" },
          { text: this.$t("companyName"), value: "companyDTORest.name" },
        ]
    },
  },
  methods: {
    reset(){
      this.computers = [];
      this.selectedComputers = [];
    },
    search() {
      this.reset();
      this.getComputers();
      this.getTotalItems();
    },
    addComputer() {
      this.editedComputer = null;
      this.displayForm = true;
    },
    editComputer(value){
      this.editedComputer = value;
      this.displayForm = true;
    },
    clearSearch() {
      this.searchField = "";
      this.getComputers();
    },
    changeItemsPerPage() {
      this.page = 1;
      this.getComputers();
    },
    showSnackbar(message){
      this.snackbarMessage = message;
      this.displaySnackbar = true;
    },
    deleteComputer() {
      let promises = [];
      for (let computer of this.selectedComputers){
        promises.push(
          axios.post("http://localhost:8080/webapp/api/computer/delete?id="+computer.id)
        );
      }
      Promise.all(promises)
        .then( (response) => {
          console.log(response);
          this.getComputers();
          this.reset();
          this.showSnackbar(response.length+ " "+ this.$t('snackbarComputersDeleted'));
          })
        .catch((err) => {
          console.log(err)
          this.showSnackbar(this.$t('snackbarComputersNotDeleted'));
        }); 
    },
    getTotalItems() {
      axios
        .get(
          "http://localhost:8080/webapp/api/computer/count/"+this.searchField
        )
        .then((response) => {
            this.totalItems = response.data;
        })
        .catch((err) => console.log(err));
    },
    getComputers() {
      axios
        .get(
          "http://localhost:8080/webapp/api/computer/page?nbObject=" +
            this.itemsPerPage +
            "&numPage=" +
            this.page +"&name="+this.searchField
        )
        .then((response) => {
          this.computers = response.data;
        })
        .catch((err) => console.log(err));
    },
  },
  mounted() {
    axios
      .get(
        "http://localhost:8080/webapp/api/computer/page"
      )
      .then((response) => {
        this.computers = response.data;
      })
      .catch((err) => console.log(err));
      axios
      .get(
        "http://localhost:8080/webapp/api/computer/count"
      )
      .then((response) => {
          this.totalItems = response.data;
      })
      .catch((err) => console.log(err));
  },
  data: function () {
    return {
      totalItems: 0,
      selectedComputers: [],
      editedComputer: null,
      page: 1,
      displayForm: false,
      displaySnackbar: false,
      showConfirm: false,
      searchField: "",
      snackbarMessage: "",
      itemsPerPage: 10,
      itemsPerPageOptions: [10, 50, 100],
      
      computers: [],
    };
  },
};
</script>
