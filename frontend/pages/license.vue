<template>
  <v-data-table :headers="headers" :items="licenseList" class="elevation-1">
    <template #top>
      <v-toolbar flat>
        <v-toolbar-title>License List</v-toolbar-title>
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
                      label="license name"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-spacer></v-spacer>
                    <v-text-field
                      v-model="editedItem.description"
                      label="description"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close"> Cancel </v-btn>
              <v-btn color="blue darken-1" text @click="createLicense">
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
                      v-model="editedItem.name"
                      label="license name"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      v-model="editedItem.description"
                      label="description"
                    ></v-text-field>
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
                @click="updateLicense(editedItem.id)"
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
                @click="deleteLicense(editedItem.id)"
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
      <v-btn color="primary" @click="getLicenses"> Reset </v-btn>
    </template>
  </v-data-table>
</template>
<script>
export default {
  data() {
    return {
      dialog: false,
      dialogDelete: false,
      dialogUpdate: false,
      headers: [
        {
          text: 'Registered licenses',
          align: 'start',
          sortable: false,
          value: 'name',
        },
        { text: 'Description', value: 'description' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      licenseList: [],
      createResponse: {},
      editedIndex: -1,
      editedItem: {
        name: '',
        description: '',
      },
      defaultItem: {
        name: '',
        description: '',
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
    this.getLicenses()
  },
  methods: {
    getLicenses() {
      this.$axios.get('/api/license').then((response) => {
        this.licenseList = response.data
      })
    },
    createLicense() {
      this.$axios
        .post('/api/license', {
          name: this.$data.editedItem.name,
          description: this.$data.editedItem.description,
        })
        .then((response) => {
          this.licenseList.push(response.data)
          this.createResponse = response.data
        })
      this.close()
    },
    deleteLicense(id) {
      this.$axios.delete('/api/license/' + id).then((response) => {
        const index = this.licenseList.findIndex((list) => list.id === id)
        if (~index) this.licenseList.splice(index, 1)
        this.createResponse = response.data
      })
      this.dialogDelete = false
    },
    updateLicense(id) {
      this.$axios
        .put('/api/license/' + id, {
          name: this.$data.editedItem.name,
          description: this.$data.editedItem.description,
        })
        .then((response) => {
          this.getLicenses()
          this.createResponse = response.data
        })
      this.closeUpdate()
    },
    editItem(item) {
      this.editedIndex = this.licenseList.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogUpdate = true
    },
    deleteItem(item) {
      this.editedIndex = this.licenseList.indexOf(item)
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
