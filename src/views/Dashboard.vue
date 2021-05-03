<template>
  <div>
    <h1>Computer Database</h1>
      <div>
        <div>
        <span>
          <input placeholder="Search" v-model="search"/>
          <button/>
        </span>
        <button>Add</button>
        </div>
        <table>
          <thead>
            <tr>
              <th v-if="canEdit"><input type="checkbox" v-model="selectAll">Select all</th>
              <th>Computer Name</th>
              <th>Introduced</th>
              <th>Discontinued</th>
              <th>Company Name</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="computer in computers" v-bind:key="computer.id">
              <td v-if="canEdit">
                <input type="checkbox" v-model="selectedComputers" :value="computer.id">
                </td>
              <td>{{computer.name}}</td>
              <td>{{computer.introduced}}</td>
              <td>{{computer.discontinued}}</td>
              <td>{{computer.company}}</td>
            </tr> 
          </tbody>
        </table>
      </div>


  </div>
</template>

<script>
export default {
  name: 'Dashboard',
  props: {
          role: String,

  },
  computed: {
    canEdit() {
      return this.role==="ROLE_ADMIN"
    },
    selectAll: {
        get: function () {
            return this.computers ? this.selectedComputers.length === this.computers.length : false;
        },
        set: function (value) {
            var selection = [];

            if (value) {
                this.computers.forEach( (computer) => selection.push(computer.id.toString()));
            }

            this.selectedComputers = selection;
        }
    }
  },
  methods: {

  },
  data: function () {
    return {
      selectedComputers: [],
      search: "",
      computers: [
        {id: 1, name: 'MacBook Pro 15.4 inch',introduced: null, discontinued: null, company: 1},
        {id: 2, name: 'CM-2a',introduced: null, discontinued: null, company:2},
        {id: 3, name: 'CM-200',introduced: null, discontinued: null, company:2},
        {id: 4, name: 'CM-5e',introduced: null, discontinued: null, company:2},
        {id: 5, name: 'CM-5',introduced: '1991-01-01', discontinued: null, company: 2},
        {id: 6, name: 'MacBook Pro',introduced: '2006-01-10', discontinued: null, company: 1},
        {id: 7, name: 'Apple IIe',introduced: null, discontinued: null, company:null},
        {id: 8, name: 'Apple IIc',introduced: null, discontinued: null, company:null},
        {id: 9, name: 'Apple IIGS',introduced: null, discontinued: null, company:null},
        {id: 10, name: 'Apple IIc Plus',introduced: null, discontinued: null, company:null},
        {id: 11, name: 'Apple II Plus',introduced: null, discontinued: null, company:null},
        {id: 12, name: 'Apple III',introduced: '1980-05-01',discontinued: '1984-04-01', company: 1},
        {id: 13, name: 'Apple Lisa',introduced: null, discontinued: null, company:1},
        {id: 14, name: 'CM-2',introduced: null, discontinued: null, company:2},
        {id: 15, name: 'Connection Machine',introduced: '1987-01-01', discontinued: null, company: 2},
        {id: 16, name: 'Apple II',introduced: '1977-04-01',discontinued:'1993-10-01', company:1},
        {id: 17, name: 'Apple III Plus',introduced: '1983-12-01',discontinued:'1984-04-01', company: 1},
        {id: 18, name: 'COSMAC ELF',introduced: null, discontinued: null, company:3},
        {id: 19, name: 'COSMAC VIP',introduced: '1977-01-01', discontinued: null, company: 3},
        {id: 20, name: 'ELF II',introduced: '1977-01-01', discontinued: null, company: 4},
        {id: 21, name: 'Macintosh',introduced: '1984-01-24', discontinued: null, company: 1},
        {id: 22, name: 'Macintosh II',introduced: null, discontinued: null, company:null},
        {id: 23, name: 'Macintosh Plus',introduced: '1986-01-16',discontinued:'1990-10-15', company: 1},
        {id: 24, name: 'Macintosh IIfx',introduced: null, discontinued: null, company:null},
        {id: 25, name: 'iMac',introduced: '1998-01-01', discontinued: null, company: 1},
        {id: 26, name: 'Mac Mini',introduced: '2005-01-22', discontinued: null, company: 1},
        {id: 27, name: 'Mac Pro',introduced: '2006-08-07',discontinued: null, company: 1},
        {id: 28, name: 'Power Macintosh',introduced: '1994-03-01',discontinued:'2006-08-01', company:1},
        {id: 29, name: 'PowerBook',introduced: '1991-01-01',discontinued:'2006-01-01', company: 1},
        {id: 30, name: 'Xserve',introduced: null, discontinued: null, company:null}
    ]
    }
  }
}
</script>
