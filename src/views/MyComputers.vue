<template>
  
<div>
  <div>My Computers Page</div>
<v-main id="table">
      <h2>
        Total Computers found: {{totalItems}}
      </h2>
      <v-data-table

          height="400px"
          v-model="selectedComputers"
          :headers="headers"
          fixed-header
          hide-default-footer
          :items="computers"
          :items-per-page="itemsPerPage"
          :search= "search"
          :custom-filter="filterPerfectMatch"
          class="elevation-4"
        >
        </v-data-table>

</v-main>
</div>
</template>

<script>
import axios from "axios";

export default {  
  name: "MyComputers",

  props: ['user'],
  methods: {
    getComputers() {
      axios
        .get("http://localhost:8086/webapp/api/computers")
        .then((response) => {
          this.computers = response.data;
          this.totalItems = response.data;
        })
        .catch((err) => console.log(err));
    },
    getTotalItems() {
      axios
        .get(
          "http://localhost:8086/webapp/api/computer/count/"
        )
        .then((response) => {
            this.totalItems = response.data;
        })
        .catch((err) => console.log(err));
    },
    filterPerfectMatch(value, search) {
      return value != null &&
        search != null &&
        typeof value === 'string' &&
        value.toString().indexOf(search) !== -1
    },
  },
  mounted() {
    axios
      .get(
        "http://localhost:8086/webapp/api/computers"
      )
      .then((response) => {
        this.computers = response.data;
      })
      .catch((err) => console.log(err));
  },
  data: function () {
    return {
      search: this.user.username,
      // search:'john',
      totalItems: 0,
      selectedComputers: [],
      // editedComputer: null,
      // page: 1,
      displayForm: false,
      searchField: "",
      // itemsPerPage: 10,
      // itemsPerPageOptions: [10, 50, 100],
      headers: [
        {
          text: "Computer name",
          align: "start",
          sortable: false,
          value: "name",
        },

        { text: this.$t("username"), value: "username"},
        { text: this.$t("introducedDate"), value: "introduced" },
        { text: this.$t("discontinuedDate"), value: "discontinued" },
        { text: this.$t("companyName"), value: "companyDTORest.name" },
      ],
      computers: [],
    };
  },
 
};
</script>

<style scoped>
</style>
