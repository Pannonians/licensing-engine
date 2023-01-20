<template>
  <v-container class="bg-surface-variant">
    <v-container>
      <v-row class="random">
        <v-card width="1575" outlined>
          <v-list-item three-line>
            <v-list-item-content>
              <div class="text-overline mb-4">Domain details</div>
              <v-list-item-title class="text-h5 mb-1">
                {{ singleDomain.name }}
              </v-list-item-title>
              <v-list-item-subtitle>{{
                singleDomain.active
              }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-card>
      </v-row>
    </v-container>
    <v-container>
      <v-row class="justify-start">
        <v-col cols="12" sm="6">
          <v-card class="pa-2" outlined tile>
            <v-simple-table>
              <template #default>
                <thead>
                  <tr>
                    <th class="text-left">License</th>
                    <th class="text-left">Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in selected" :key="item.name">
                    <td>{{ item.name }}</td>
                    <td>{{ item.description }}</td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </v-card>
        </v-col>
        <v-col cols="12" sm="6">
          <v-card class="pa-2" outlined tile>
            <v-data-table
              v-model="selected"
              :headers="headers"
              :items="licenseList"
              :single-select="singleSelect"
              item-key="name"
              sort-by="name"
              class="elevation-1"
              show-select
            ></v-data-table>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close"> Cancel </v-btn>
              <v-btn color="blue darken-1" text @click="Save"> Save </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>
<script>
export default {
  name: 'DomainDetails',
  data() {
    return {
      model: 'rounded-xl',
      singleSelect: false,
      headers: [
        {
          text: 'Registered Licenses',
          align: 'start',
          value: 'name',
          sortable: false,
        },
        { text: 'description', value: 'description' },
      ],
      domainList: [],
      licenseList: [],
      singleDomain: {},
      selected: [],
    }
  },

  beforeMount() {
    this.getLicenses()
    this.getSingleDomain()
  },

  methods: {
    getLicenses() {
      this.$axios.get('/api/license').then((response) => {
        this.licenseList = response.data
      })
    },

    getSingleDomain() {
      const { id } = this.$route.params
      this.$axios.get('/api/domain/' + id).then((response) => {
        this.singleDomain = response.data
      })
    },
  },
}
</script>

<style>
.random {
  margin-left: 1px;
}
</style>