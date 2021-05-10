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
          :items="computerss"
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
// import axios from "axios";

export default {  
  name: "MyComputers",

  props: ['user'],
  // methods: {
  //   getComputers() {
  //     axios
  //       .get("http://localhost:8086/webapp/api/computers")
  //       .then((response) => {
  //         this.computers = response.data;
  //         this.totalItems = response.data;
  //       })
  //       .catch((err) => console.log(err));
  //   },
  // },
  // mounted() {
  //   axios
  //     .get(
  //       "http://localhost:8086/webapp/api/computers"
  //     )
  //     .then((response) => {
  //       this.computers = response.data;
  //     })
  //     .catch((err) => console.log(err));
  // },
  data: function () {
    return {
      search: this.user.username,
      // search:'john',
      totalItems: 0,
      selectedComputers: [],
      editedComputer: null,
      page: 1,
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

        { text: "Username", value: "username"},
        { text: "Introduced", value: "introduced" },
        { text: "Discontinued", value: "discontinued" },
        { text: "Company", value: "companyDTORest.name" },
      ],
      // computers: [],
      computerss: [
        {id: 1, name: 'MacBook Pro 15.4 inch', username: "John Leider", introduced: null, discontinued: null, company: 1},
        {id: 2, name: 'CM-2a', username: "John Leider",introduced: null, discontinued: null, company:2},
        {id: 3, name: 'CM-200', username: "Alex Leider",introduced: null, discontinued: null, company:2},
        {id: 4, name: 'CM-5e', username: "Alex Leider",introduced: null, discontinued: null, company:2},
        {id: 5, name: 'CM-5', username: "Alex Leider",introduced: '1991-01-01', discontinued: null, company: 2},
        {id: 6, name: 'MacBook Pro', username: "Alex Leider",introduced: '2006-01-10', discontinued: null, company: 1},
        {id: 7, name: 'Apple IIe', username: "Alex Leider",introduced: null, discontinued: null, company:null},
        {id: 8, name: 'Apple IIc', username: "Alex Leider",introduced: null, discontinued: null, company:null},
        {id: 9, name: 'Apple IIGS', username: "Alex Leider",introduced: null, discontinued: null, company:null},
        {id: 10, name: 'Apple IIc Plus', username: "Alex Leider",introduced: null, discontinued: null, company:null},
        {id: 11, name: 'Apple II Plus', username: "Alex Leider",introduced: null, discontinued: null, company:null},
        {id: 12, name: 'Apple III', username: "Alex Leider",introduced: '1980-05-01',discontinued: '1984-04-01', company: 1},
        {id: 13, name: 'Apple Lisa', username: "Alex Leider",introduced: null, discontinued: null, company:1},
        {id: 14, name: 'CM-2', username: "Alex Leider",introduced: null, discontinued: null, company:2},
        {id: 15, name: 'Connection Machine', username: "Alex Leider",introduced: '1987-01-01', discontinued: null, company: 2},
        {id: 16, name: 'Apple II', username: "Alex Leider",introduced: '1977-04-01',discontinued:'1993-10-01', company:1},
        {id: 17, name: 'Apple III Plus', username: "Alex Leider",introduced: '1983-12-01',discontinued:'1984-04-01', company: 1},
        {id: 18, name: 'COSMAC ELF', username: "Alex Leider",introduced: null, discontinued: null, company:3},
        {id: 19, name: 'COSMAC VIP', username: "Alex Leider",introduced: '1977-01-01', discontinued: null, company: 3},
        {id: 20, name: 'ELF II', username: "Alex Leider",introduced: '1977-01-01', discontinued: null, company: 4},
        {id: 21, name: 'Macintosh', username: "Alex Leider",introduced: '1984-01-24', discontinued: null, company: 1},
        {id: 22, name: 'Macintosh II', username: "Alex Leider",introduced: null, discontinued: null, company:null},
        {id: 23, name: 'Macintosh Plus', username: "Alex Leider",introduced: '1986-01-16',discontinued:'1990-10-15', company: 1},
        {id: 24, name: 'Macintosh IIfx', username: "Alex Leider",introduced: null, discontinued: null, company:null},
        {id: 25, name: 'iMac', username: "Alex Leider",introduced: '1998-01-01', discontinued: null, company: 1},
        {id: 26, name: 'Mac Mini', username: "Alex Leider",introduced: '2005-01-22', discontinued: null, company: 1},
        {id: 27, name: 'Mac Pro', username: "Alex Leider",introduced: '2006-08-07',discontinued: null, company: 1},
        {id: 28, name: 'Power Macintosh', username: "Alex Leider",introduced: '1994-03-01',discontinued:'2006-08-01', company:1},
        {id: 29, name: 'PowerBook', username: "Alex Leider",introduced: '1991-01-01',discontinued:'2006-01-01', company: 1},
        {id: 30, name: 'Xserve', username: "Alex Leider",introduced: null, discontinued: null, company:null}
    ],
    };
  },
  methods: {
    filterPerfectMatch(value, search) {
      return value != null &&
        search != null &&
        typeof value === 'string' &&
      //  value.match(search) === true &&  <== doesn't work T T
        value.toString().indexOf(search) !== -1
    },
  }
  // computed: {

  // }
};
</script>

<style scoped>
</style>
