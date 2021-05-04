<template>
  <div>
    <ComputerForm v-if="displayForm"/>
    <v-main id="table">
        <v-toolbar fixed table>
          <v-text-field
            v-model="searchField"
            label="Search"
            single-line
            clearable
            hide-details>
              <template v-slot:append>
                <v-btn icon @click="search">
                  <v-icon>
                    mdi-magnify
                  </v-icon>
                </v-btn>
              </template>
          </v-text-field>
          <v-btn rounded icon @click="addComputer"><v-icon large>mdi-plus-circle</v-icon></v-btn>
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
              :items-per-page="10"
              @click:row="addComputer"
              class="elevation-4">
          </v-data-table>
          <div>
            <v-row>
              <v-col cols="1">
                <v-btn icon v-if="canEdit">
                  <v-icon large>mdi-delete</v-icon>
                </v-btn>
              </v-col>
              <v-spacer/>
              <v-col>
                <v-select
                  label="Computers per page"
                  v-model="itemsPerPage"
                  :items="itemsPerPageOptions">
                </v-select>
              </v-col>
              <v-col>
                <v-pagination 
                  v-model="page"
                  :length="pageCount">
                </v-pagination>
              </v-col>
            </v-row>
          </div>
        </v-card>
    </v-main>
  </div>
</template>

<script>

import ComputerForm from '../components/ComputerForm'

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
    selectAll: {
      get: function () {
        return this.computers
          ? this.selectedComputers.length === this.computers.length
          : false;
      },
      set: function (value) {
        var selection = [];

        if (value) {
          this.computers.forEach((computer) =>
            selection.push(computer.id.toString())
          );
        }

        this.selectedComputers = selection;
      },
    },
  },
  methods: {
    search() {
      this.searchField="Searched!";
      alert("Search!");
    },

    addComputer(){
      this.displayForm = true;
    }

  },
  data: function () {
    return {
      selectedComputers: [],
      page:1,
      pageCount:3,
      displayForm: false,
      searchField: "",
      itemsPerPage:10,
      itemsPerPageOptions: [10,50,100],
      headers: [
        {
            text: 'Computer name',
            align: 'start',
            sortable: false,
            value: 'name',
          },
          { text: 'Introduced', value: 'introduced' },
          { text: 'Discontinued', value: 'discontinued' },
          { text: 'Company', value: 'company' },
      ],
      computers: [
        {
          id: 1,
          name: "MacBook Pro 15.4 inch",
          introduced: null,
          discontinued: null,
          company: 1,
        },
        {
          id: 2,
          name: "CM-2a",
          introduced: null,
          discontinued: null,
          company: 2,
        },
        {
          id: 3,
          name: "CM-200",
          introduced: null,
          discontinued: null,
          company: 2,
        },
        {
          id: 4,
          name: "CM-5e",
          introduced: null,
          discontinued: null,
          company: 2,
        },
        {
          id: 5,
          name: "CM-5",
          introduced: "1991-01-01",
          discontinued: null,
          company: 2,
        },
        {
          id: 6,
          name: "MacBook Pro",
          introduced: "2006-01-10",
          discontinued: null,
          company: 1,
        },
        {
          id: 7,
          name: "Apple IIe",
          introduced: null,
          discontinued: null,
          company: null,
        },
        {
          id: 8,
          name: "Apple IIc",
          introduced: null,
          discontinued: null,
          company: null,
        },
        {
          id: 9,
          name: "Apple IIGS",
          introduced: null,
          discontinued: null,
          company: null,
        },
        {
          id: 10,
          name: "Apple IIc Plus",
          introduced: null,
          discontinued: null,
          company: null,
        },
        {
          id: 11,
          name: "Apple II Plus",
          introduced: null,
          discontinued: null,
          company: null,
        },
        {
          id: 12,
          name: "Apple III",
          introduced: "1980-05-01",
          discontinued: "1984-04-01",
          company: 1,
        },
        {
          id: 13,
          name: "Apple Lisa",
          introduced: null,
          discontinued: null,
          company: 1,
        },
        {
          id: 14,
          name: "CM-2",
          introduced: null,
          discontinued: null,
          company: 2,
        },
        {
          id: 15,
          name: "Connection Machine",
          introduced: "1987-01-01",
          discontinued: null,
          company: 2,
        },
        {
          id: 16,
          name: "Apple II",
          introduced: "1977-04-01",
          discontinued: "1993-10-01",
          company: 1,
        },
        {
          id: 17,
          name: "Apple III Plus",
          introduced: "1983-12-01",
          discontinued: "1984-04-01",
          company: 1,
        },
        {
          id: 18,
          name: "COSMAC ELF",
          introduced: null,
          discontinued: null,
          company: 3,
        },
        {
          id: 19,
          name: "COSMAC VIP",
          introduced: "1977-01-01",
          discontinued: null,
          company: 3,
        },
        {
          id: 20,
          name: "ELF II",
          introduced: "1977-01-01",
          discontinued: null,
          company: 4,
        },
        {
          id: 21,
          name: "Macintosh",
          introduced: "1984-01-24",
          discontinued: null,
          company: 1,
        },
        {
          id: 22,
          name: "Macintosh II",
          introduced: null,
          discontinued: null,
          company: null,
        },
        {
          id: 23,
          name: "Macintosh Plus",
          introduced: "1986-01-16",
          discontinued: "1990-10-15",
          company: 1,
        },
        {
          id: 24,
          name: "Macintosh IIfx",
          introduced: null,
          discontinued: null,
          company: null,
        },
        {
          id: 25,
          name: "iMac",
          introduced: "1998-01-01",
          discontinued: null,
          company: 1,
        },
        {
          id: 26,
          name: "Mac Mini",
          introduced: "2005-01-22",
          discontinued: null,
          company: 1,
        },
        {
          id: 27,
          name: "Mac Pro",
          introduced: "2006-08-07",
          discontinued: null,
          company: 1,
        },
        {
          id: 28,
          name: "Power Macintosh",
          introduced: "1994-03-01",
          discontinued: "2006-08-01",
          company: 1,
        },
        {
          id: 29,
          name: "PowerBook",
          introduced: "1991-01-01",
          discontinued: "2006-01-01",
          company: 1,
        },
        {
          id: 30,
          name: "Xserve",
          introduced: null,
          discontinued: null,
          company: null,
        },
      ],
    };
  },
};
</script>
