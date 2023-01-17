<template>
  <v-data-table
    ref="domainList"
    :headers="headers"
    :items="domainList"
    class="elevation-1"
  >
    <template #top>
      <v-toolbar flat>
        <v-toolbar-title>Domain List</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="600px">
          <template #activator="{ on, attrs }">
            <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
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
                      v-model="editedItem.name"
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
                  
                  <v-col cols="12">
                    <v-combobox
                      :value="licenseList"
                      label="Licenses"
                      multiple
                      chips
                    ></v-combobox>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close"> Cancel </v-btn>
              <v-btn color="blue darken-1" text @click="createDomain">
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogUpdate" max-width="600px">
          <v-card :key="componentKey">
            <v-card-title>
              <span class="text-h5">{{ formTitle }}</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row justify="center">
                  <v-col cols="12">
                    <v-text-field
                      v-model="editedItem.name"
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
              <v-btn color="blue darken-1" text @click="closeUpdate">
                Cancel
              </v-btn>
              <v-btn
                color="blue darken-1"
                text
                @click="updateDomain(editedItem.id)"
              >
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="600px">
          <v-card>
            <v-card-title class="text-h5"
              >Are you sure you want to delete this item?</v-card-title
            >
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete"
                >Cancel</v-btn
              >
              <v-btn
                color="blue darken-1"
                text
                @click="deleteDomain(editedItem.id)"
                >OK</v-btn
              >
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template #[`item.actions`]="{ item }">
      <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
      <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
    </template>
    <template #no-data>
      <v-btn color="primary" @click="getDomains"> Reset </v-btn>
    </template>
  </v-data-table>
</template>

<script>
export default {
  name: 'Domain',
  data() {
    return {
      componentKey: 0,
      dialog: false,
      dialogUpdate: false,
      dialogDelete: false,
      headers: [
        {
          text: 'Registered domains',
          align: 'start',
          sortable: false,
          value: 'name',
        },
        { text: 'Active', value: 'active' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      domainList: [],
      createResponse: {},
      editedIndex: -1,
      editedItem: {
        name: '',
        active: false,
      },
      defaultItem: {
        name: '',
        id: '',
        active: false,
      },
    }
  },

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
    },
  },

  watch: {
    dialog(val) {
      val || close()
    },
    dialogDelete(val) {
      val || this.closeDelete()
    },
    dialogUpdate(val) {
      val || this.closeUpdate()
    },
  },

  beforeMount() {
    this.getDomains()
  },

  methods: {
    getDomains() {
      this.$axios.get('/api/domain').then((response) => {
        this.domainList = response.data
      })
    },

    createDomain() {
      this.$axios
        .post('/api/domain', {
          name: this.$data.editedItem.name,
          active: this.$data.editedItem.active,
        })
        .then((response) => {
          this.domainList.push(response.data)
          this.createResponse = response.data
        })
      this.close()
    },
    deleteDomain(id) {
      this.$axios.delete('/api/domain/' + id).then((response) => {
        const index = this.domainList.findIndex((list) => list.id === id)
        if (~index) this.domainList.splice(index, 1)
        this.createResponse = response.data
      })
      this.closeDelete()
    },

    updateDomain(id) {
      this.$axios
        .put('/api/domain/' + id, {
          name: this.$data.editedItem.name,
          active: this.$data.editedItem.active,
        })
        .then((response) => {
          this.componentKey += 1
          this.createResponse = response.data
          this.getDomains()
        })
      this.closeUpdate()
    },
    editItem(item) {
      this.editedIndex = this.domainList.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogUpdate = true
    },
    deleteItem(item) {
      this.editedIndex = this.domainList.indexOf(item)
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
  },
}
</script>
