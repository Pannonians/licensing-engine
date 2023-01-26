<template>
  <v-container class="bg-surface-variant">
    <v-container>
      <v-row class="random">
        <v-card width="1555" outlined>
          <v-list-item three-line>
            <v-list-item-content>
              <div class="text-overline mb-4">App details</div>
              <v-list-item-title class="text-h5 mb-2">
                {{ singleApp.name }}
              </v-list-item-title>
              <v-list-item-subtitle>{{
                singleApp.description
              }}</v-list-item-subtitle>
              <v-list-item-subtitle>{{
                singleApp.active
              }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-card>
      </v-row>
    </v-container>
    <v-container>
      <v-row class="justify-start">
        <v-col cols="12" sm="4">
          <v-sheet class="ma-2 pa-2">
            <v-card class="pa-2" outlined tile>
              <v-data-table
                :headers="headers"
                :items="tokenList"
                class="elevation-1"
              >
                <template #top>
                  <v-toolbar flat>
                    <v-toolbar-title>Token List</v-toolbar-title>
                    <v-divider class="mx-4" inset vertical></v-divider>
                    <v-spacer></v-spacer>
                    <v-dialog v-model="dialog" max-width="600px">
                      <template #activator="{ on, attrs }">
                        <v-btn
                          color="primary"
                          dark
                          class="mb-2"
                          v-bind="attrs"
                          v-on="on"
                        >
                          New
                        </v-btn>
                      </template>
                      <v-card>
                        <v-card-title>
                          <span class="text-h5">{{ formTitle }}</span>
                        </v-card-title>
                        <v-card-text>
                          <v-container>
                            <v-row justify="center">
                              <v-col cols="12">
                                <v-text-field
                                  v-model="editedItem.token"
                                  label="token name"
                                ></v-text-field>
                              </v-col>
                              <v-col cols="12">
                                <v-checkbox
                                  v-model="editedItem.active"
                                  label="active"
                                  color="primary"
                                  hide-details
                                ></v-checkbox>
                              </v-col>
                            </v-row>
                          </v-container>
                        </v-card-text>
                        <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn color="blue darken-1" text @click="close">
                            Cancel
                          </v-btn>
                          <v-btn
                            color="blue darken-1"
                            text
                            @click="createToken"
                          >
                            Save
                          </v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-dialog>
                    <v-dialog v-model="dialogUpdate" max-width="600px">
                      <v-card>
                        <v-card-title>
                          <span class="text-h5">{{ formTitle }}</span>
                        </v-card-title>
                        <v-card-text>
                          <v-container>
                            <v-row justify="center">
                              <v-col cols="12">
                                <v-text-field
                                  v-model="editedItem.token"
                                  label="domain name"
                                ></v-text-field>
                              </v-col>
                              <v-col cols="12">
                                <v-checkbox
                                  v-model="editedItem.active"
                                  label="active"
                                  color="primary"
                                  hide-details
                                ></v-checkbox>
                              </v-col>
                            </v-row>
                          </v-container>
                        </v-card-text>
                        <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn
                            color="blue darken-1"
                            text
                            @click="closeUpdate"
                          >
                            Cancel
                          </v-btn>
                          <v-btn
                            color="blue darken-1"
                            text
                            @click="updateToken(editedItem.id)"
                          >
                            Save
                          </v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-dialog>
                    <v-dialog v-model="dialogDelete" max-width="600px">
                      <v-card>
                        <v-card-title class="text-h5"
                          >Are you sure you want to delete this
                          item?</v-card-title
                        >
                        <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn color="blue darken-1" text @click="closeDelete"
                            >Cancel</v-btn
                          >
                          <v-btn
                            color="blue darken-1"
                            text
                            @click="deleteToken(editedItem.id)"
                            >OK</v-btn
                          >
                          <v-spacer></v-spacer>
                        </v-card-actions>
                      </v-card>
                    </v-dialog>
                  </v-toolbar>
                </template>
                <template #[`item.actions`]="{ item }">
                  <v-row align="center" justify="center">
                    <v-icon small @click="editItem(item)"> mdi-pencil </v-icon>
                    <div class="mx-2"></div>

                    <v-icon small @click="deleteItem(item)">
                      mdi-delete
                    </v-icon>
                    <div class="mx-2"></div>

                    <v-icon small @click="showDetails(item.id)">
                      mdi-application
                    </v-icon>
                    <div class="mx-2"></div>
                  </v-row>
                </template>
                <template #no-data>
                  <v-btn color="primary" @click="getTokens"> Reset </v-btn>
                </template>
              </v-data-table>
            </v-card>
          </v-sheet>
        </v-col>
        <v-col cols="12" sm="8">
          <v-sheet class="ma-2 pa-2">
            <v-card width="1010" outlined>
              <v-list-item three-line>
                <v-list-item-content>
                  <div class="text-overline mb-4">Token details</div>
                  <v-list-item-title class="text-h5 mb-1">
                    {{ singleToken.token }}
                  </v-list-item-title>
                  <v-list-item-subtitle>{{
                    singleToken.active
                  }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-card>
            <v-container></v-container>
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
                        <tr v-for="item in savedLicenses" :key="item.name">
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
                    v-model="selectedRows"
                    :headers="headers1"
                    :items="licenseList"
                    item-key="name"
                    sort-by="name"
                    class="elevation-1"
                  >
                    <template #item="{ item }">
                      <tr
                        :class="
                          selectedRows.indexOf(item.id) > -1 ? 'grey' : ''
                        "
                        @click="connectTokenLicense(item.id)"
                      >
                        <td>{{ item.name }}</td>
                        <td>{{ item.description }}</td>
                      </tr>
                    </template>
                  </v-data-table>
                </v-card>
              </v-col>
            </v-row>
          </v-sheet>
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>

<script>
import { uuid } from 'vue-uuid'
export default {
  name: 'AppDetails',
  data() {
    return {
      uuid: uuid.v4(),
      model: 'rounded-xl',
      singleSelect: false,
      dialog: false,
      dialogUpdate: false,
      dialogDelete: false,
      headers: [
        {
          text: 'Registered Tokens',
          align: 'start',
          value: 'token',
          sortable: false,
        },
        { text: 'Active', value: 'active' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      headers1: [
        {
          text: 'Registered Licenses',
          align: 'start',
          value: 'name',
          sortable: false,
        },
        { text: 'description', value: 'description' },
      ],
      tokenList: [],
      licenseList: [],
      createResponse: [],
      singleApp: {},
      singleToken: {},
      selectedRows: [],
      savedLicenses: [],
      editedIndex: -1,
      editedItem: {
        token: uuid.v4(),
        id: '',
        active: false,
      },
      defaultItem: {
        token: uuid.v4(),
        id: '',
        active: false,
      },
    }
  },

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
    },
    updateLicenseList() {
      return [this.savedLicenses]
    },
  },

  watch: {
    dialog(val) {
      val || close()
    },
    dialogDelete(val) {
      val || close()
    },
  },

  beforeMount() {
    this.getTokens()
    this.getSingleApp()
    this.getLicenses()
  },

  methods: {
    async createLicenseToken(id) {
      if (this.savedLicenses.find((item) => item.id === id))
        alert('this license is already in use')
      else
        await this.$axios
          .post('/api/token-license', {
            tokenId: this.singleToken.id,
            licenseId: id,
          })
          .then((response) => {
            this.createResponse = response.data
            this.$axios.get('/api/license/' + id).then((response) => {
              this.savedLicenses.push(response.data)
            })
          })
    },

    connectTokenLicense(id) {
      if (this.selectedRows.includes(id)) {
        this.selectedRows = this.selectedRows.filter(
          (selectedId) => selectedId !== id
        )
      } else this.selectedRows.push(id)
      this.createLicenseToken(id)
    },

    async getSavedLicenses(id) {
      this.savedLicenses = []
      await this.$axios.get('/api/license/' + id).then((response) => {
        this.savedLicenses.push(response.data)
      })
    },

    async showDetails(id) {
      await this.$axios.get('/api/token/' + id).then((response) => {
        this.singleToken = response.data
      })
      await this.$axios
        .get('api/token-license', { tokenId: this.singleToken.id })
        .then((response) => {
          this.createResponse = response.data.filter(
            (item) => item.tokenId === this.singleToken.id
          )
        })

      this.createResponse.forEach((i) => this.getSavedLicenses(i.licenseId))
    },

    getLicenses() {
      this.$axios.get('api/license').then((response) => {
        this.licenseList = response.data
      })
    },
    getTokens() {
      this.$axios
        .get('/api/app-token/' + this.$route.params.id)
        .then((response) => {
          this.tokenList = response.data
        })
    },
    createToken() {
      this.$axios
        .post('/api/app-token', {
          token: this.$data.editedItem.token,
          active: this.$data.editedItem.active,
          appId: this.$route.params.id,
        })
        .then((response) => {
          this.tokenList.push(response.data)
          this.createResponse = response.data
        })
      this.close()
    },
    deleteToken(id) {
      this.$axios.delete('/api/token/' + id).then((response) => {
        const index = this.tokenList.findIndex((list) => list.id === id)
        if (~index) this.tokenList.splice(index, 1)
        this.createResponse = response.data
      })
      this.closeDelete()
    },
    updateToken(id) {
      this.$axios
        .put('/api/token/' + id, {
          token: this.$data.editedItem.token,
          active: this.$data.editedItem.active,
        })
        .then((response) => {
          this.getTokens()
          this.createResponse = response.data
        })
      this.closeUpdate()
    },
    editItem(item) {
      this.editedIndex = this.tokenList.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogUpdate = true
    },
    deleteItem(item) {
      this.editedIndex = this.tokenList.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },
    close() {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    closeDelete() {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },
    closeUpdate() {
      this.dialogUpdate = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },
    getSingleApp() {
      const { id } = this.$route.params
      this.$axios.get('/api/app/' + id).then((response) => {
        this.singleApp = response.data
      })
    },
  },
}
</script>

<style>
.random {
  margin-left: 10px;
}
</style>
