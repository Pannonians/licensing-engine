<template>
  <v-container class="bg-surface-variant">
    <v-container>
      <v-row class="random">
        <v-card width="1575" outlined>
          <v-list-item three-line>
            <v-list-item-content>
              <div class="text-overline mb-4">Domain details</div>
              <v-list-item-title class="text-h5 mb-1 d-flex">
                <div>{{ singleDomain.name }}</div>
                <active-indicator
                  :model="singleDomain"
                  resource="domain"
                  :callback="bootstrap"
                />
              </v-list-item-title>
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
                    <th class="text-left">Connected Licenses</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="item in savedLicenses"
                    :key="item.name"
                    @click="removeLicense(item.id)"
                  >
                    <td>{{ item.name }}</td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </v-card>
        </v-col>
        <v-col cols="12" sm="6">
          <v-card class="pa-2" outlined tile>
            <v-data-table
              v-model="selectedRows"
              :headers="headers1"
              :items="nonActiveLicenses"
              :single-select="singleSelect"
              item-key="name"
              sort-by="name"
              class="elevation-1"
            >
              <template #item="{ item }">
                <tr
                  :class="selectedRows.indexOf(item.id) > -1 ? 'grey' : ''"
                  @click="connectDomainLicense(item.id)"
                >
                  <td>{{ item.name }}</td>
                </tr>
              </template>
            </v-data-table>
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
      singleSelect: true,
      headers1: [
        {
          text: 'Available Licenses',
          align: 'start',
          value: 'name',
          sortable: false,
        },
      ],
      domainList: [],
      licenseList: [],
      singleDomain: {},
      selectedRows: [],
      savedLicenses: [],
      licenseTokenList: [],
    }
  },
  computed: {
    updateLicenseList() {
      return [this.savedLicenses]
    },
    nonActiveLicenses() {
      return this.licenseList.filter(
        (license) => !this.savedLicenses.map((l) => l.id).includes(license.id)
      )
    },
  },

  beforeMount() {
    this.bootstrap()
  },

  methods: {
    bootstrap() {
      this.getLicenses()
      this.showDetails()
    },
    async createLicenseDomain(id) {
      if (this.savedLicenses.find((item) => item.id === id))
        alert('this license is already in use')
      else
        await this.$axios
          .post('/api/domain-license', {
            domainId: this.$route.params.id,
            licenseId: id,
          })
          .then((response) => {
            this.createResponse = response.data
            this.$axios.get('/api/license/' + id).then((response) => {
              this.bootstrap()
            })
          })
    },

    connectDomainLicense(id) {
      if (this.selectedRows.includes(id)) {
        this.selectedRows = this.selectedRows.filter(
          (selectedId) => selectedId !== id
        )
      } else this.selectedRows.push(id)
      this.createLicenseDomain(id)
    },

    async getSavedLicenses(id) {
      this.savedLicenses = []
      await this.$axios.get('/api/license/' + id).then((response) => {
        this.savedLicenses.push(response.data)
      })
    },
    removeLicense(id) {
      let tableId = ''

      this.licenseTokenList.filter((item) => {
        if (item.domainId === this.singleDomain.id && item.licenseId === id) {
          tableId = item.id
        }
        return tableId
      })
      this.$axios
        .delete('/api/domain-license/' + tableId, {
          body: {
            id: tableId,
          },
        })
        .then((response) => {
          const index = this.savedLicenses.findIndex((list) => list.id === id)
          if (~index) this.savedLicenses.splice(index, 1)
          this.createResponse = response.data
        })
    },
    async showDetails() {
      const { id } = this.$route.params
      await this.$axios.get('/api/domain/' + id).then((response) => {
        this.singleDomain = response.data
      })
      await this.$axios
        .get('api/domain-license', { domainId: id })
        .then((response) => {
          this.licenseTokenList = response.data.filter(
            (item) => item.domainId === id
          )
        })

      this.licenseTokenList.forEach((i) => this.getSavedLicenses(i.licenseId))
    },

    getLicenses() {
      this.$axios.get('/api/license').then((response) => {
        this.licenseList = response.data
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
