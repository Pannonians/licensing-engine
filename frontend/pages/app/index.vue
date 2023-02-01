<template>
  <v-data-table :headers="headers" :items="appList" class="elevation-1">
    <template #top>
      <v-toolbar flat>
        <v-toolbar-title>App List</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="800px">
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
              <v-row justify="center">
                <v-container>
                  <v-col cols="12">
                    <v-text-field
                      v-model="editedItem.name"
                      label="app name"
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
                </v-container>
                <v-container>
                  <v-col cols="12">
                    <v-spacer></v-spacer>
                    <h4 class="white--text">description</h4>
                    <quill-editor
                      id="app"
                      ref="quillEditor"
                      v-model="editedItem.description"
                      class="editor"
                      :options="editorOption"
                      @blur="onEditorBlur($event)"
                      @focus="onEditorFocus($event)"
                      @ready="onEditorReady($event)"
                    />
                  </v-col>
                </v-container>
              </v-row>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close"> Cancel </v-btn>
              <v-btn color="blue darken-1" text @click="createApp">
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogUpdate" max-width="800px">
          <v-card>
            <v-card-title>
              <span class="text-h5">{{ formTitle }}</span>
            </v-card-title>
            <v-card-text>
              <v-row justify="center">
                <v-container>
                  <v-col cols="12">
                    <v-text-field
                      v-model="editedItem.name"
                      label="app name"
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
                </v-container>
                <v-container>
                  <v-col cols="12">
                    <v-spacer></v-spacer>
                    <h4 class="white--text">description</h4>
                    <quill-editor
                      id="app"
                      ref="quillEditor"
                      v-model="editedItem.description"
                      class="editor"
                      :options="editorOption"
                      @blur="onEditorBlur($event)"
                      @focus="onEditorFocus($event)"
                      @ready="onEditorReady($event)"
                    />
                  </v-col>
                </v-container>
              </v-row>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeUpdate">
                Cancel
              </v-btn>
              <v-btn
                color="blue darken-1"
                text
                @click="updateApp(editedItem.id)"
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
                @click="deleteApp(editedItem.id)"
                >OK</v-btn
              >
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template #[`item.actions`]="{ item }">
      <v-row align="center" justify="start">
        <v-icon small @click="editItem(item)"> mdi-pencil </v-icon>
        <div class="mx-2"></div>
        <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
        <div class="mx-2"></div>
        <v-icon small id="appDetails" @click="showDetails(item.id)">
          mdi-application
        </v-icon>
      </v-row>
    </template>
  </v-data-table>
</template>
<script>
export default {
  name: 'App',
  data() {
    return {
      dialog: false,
      dialogUpdate: false,
      dialogDelete: false,
      headers: [
        {
          text: 'Registered apps',
          align: 'start',
          sortable: false,
          value: 'name',
        },
        { text: 'Active', value: 'active' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      appList: [],
      createResponse: {},
      editedIndex: -1,
      editedItem: {
        name: '',
        description: '',
        active: false,
      },
      defaultItem: {
        name: '',
        description: '',
        active: false,
      },
      editorOption: {
        theme: 'snow',
      },
    }
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
    },
    editor() {
      return this.$refs.quillEditor
    },
  },
  watch: {
    dialog(val) {
      val || close()
    },
    dialogDelete(val) {
      val || close()
    },
    dialogUpdate(val) {
      val || close()
    },
  },
  mounted() {
    console.log('this is quill instance object', this.editor)
  },
  beforeMount() {
    this.getApps()
  },
  methods: {
    showDetails(id) {
      this.$router.push(`/app/${id}`)
    },
    getApps() {
      this.$axios.get('/api/app').then((response) => {
        this.appList = response.data
      })
    },
    createApp() {
      this.$axios
        .post('/api/app', {
          name: this.$data.editedItem.name,
          description: this.$data.editedItem.description,
          active: this.$data.editedItem.active,
        })
        .then((response) => {
          this.appList.push(response.data)
          this.createResponse = response.data
        })
      this.close()
    },
    deleteApp(id) {
      this.$axios.delete('/api/app/' + id).then((response) => {
        const index = this.appList.findIndex((list) => list.id === id)
        if (~index) this.appList.splice(index, 1)
        this.createResponse = response.data
        this.closeDelete()
        this.$toast.show('App deleted, and all tokens if it had any')
      })
    },
    updateApp(id) {
      this.$axios
        .put('/api/app/' + id, {
          name: this.$data.editedItem.name,
          description: this.$data.editedItem.description,
          active: this.$data.editedItem.active,
        })
        .then((response) => {
          this.getApps()
          this.createResponse = response.data
        })
      this.closeUpdate()
    },
    editItem(item) {
      this.editedIndex = this.appList.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogUpdate = true
    },
    deleteItem(item) {
      this.editedIndex = this.appList.indexOf(item)
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
    closeShow() {
      this.dialogShow = false
    },
    onEditorBlur(quill) {
      // console.log('editor blur!', quill)
    },
    onEditorFocus(quill) {
      // console.log('editor focus!', quill)
    },
    onEditorReady(quill) {
      // console.log('editor ready!', quill)
    },
  },
}
</script>

<style>
#app {
  color: #2c3e50;
  margin-top: 10px;
  margin-bottom: 40px;
}

.quill-editor,
.content {
  background-color: white;
}

.editor {
  height: 200px;
}
</style>
