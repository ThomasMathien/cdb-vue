<template>
  <div>
    <ComputerForm v-if="displayForm" />
    <v-main id="table">
      <v-toolbar fixed table>
        <v-text-field
          v-model="searchField"
          label="Search"
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
        <v-btn rounded icon @click="addComputer"
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
          @click:row="addComputer"
          class="elevation-4"
        >
        </v-data-table>
        <div>
          <v-row>
            <v-col cols="1">
              <v-btn icon v-if="canEdit">
                <v-icon large>mdi-delete</v-icon>
              </v-btn>
            </v-col>
            <v-spacer />
            <v-col>
              <v-select
                label="Computers per page"
                v-model="itemsPerPage"
                :items="itemsPerPageOptions"
                @input="getComputers"
              >
              </v-select>
            </v-col>
            <v-col>
              <v-pagination v-model="page" :length="pageCount" :total-visible="3" @input="getComputers"> </v-pagination>
            </v-col>
          </v-row>
        </div>
      </v-card>
    </v-main>
  </div>
</template>

<script>
import ComputerForm from "../components/ComputerForm";
import axios from "axios";

export default {
  name: "Dashboard",
  components: {
    ComputerForm,
  },
  props: {
    role: String,
  },
  computed: {
    canEdit() {
      return this.role === "ROLE_ADMIN";
    },
    displayClearSearch() {
      return this.searchField.length   != 0;
    }
  },
  methods: {
    search() {
      this.computers = [],
      this.getComputers()
    },

    addComputer() {
      this.displayForm = true;
    },

    clearSearch() {
      this.searchField = "";
      this.getComputers();
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
        this.pageCount = response.data;
      })
      .catch((err) => console.log(err));
  },
  data: function () {
    return {
      selectedComputers: [],
      page: 1,
      pageCount: 3,
      displayForm: false,
      searchField: "",
      itemsPerPage: 10,
      itemsPerPageOptions: [10, 50, 100],
      headers: [
        {
          text: "Computer name",
          align: "start",
          sortable: false,
          value: "name",
        },
        { text: "Introduced", value: "introduced" },
        { text: "Discontinued", value: "discontinued" },
        { text: "Company", value: "companyDTORest.name" },
      ],
      computers: [],
    };
  },
};
</script>
