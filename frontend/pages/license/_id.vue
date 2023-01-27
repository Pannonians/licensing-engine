<!-- eslint-disable vue/no-v-html -->
<!-- eslint-disable vue/no-v-text-v-html-on-component -->
<template>
  <v-container class="bg-surface-variant">
    <v-container>
      <v-row class="random">
        <v-card width="1575" outlined>
          <v-list-item three-line>
            <v-list-item-content>
              <div class="text-overline mb-4">License details</div>
              <v-list-item-title class="text-h5 mb-1 d-flex">
                <div>{{ license.name }}</div>
              </v-list-item-title>
              <hr class="my-5" />
              <prose>
                <div v-html="license.description" />
              </prose>
            </v-list-item-content>
          </v-list-item>
        </v-card>
      </v-row>
    </v-container>
  </v-container>
</template>
<script>
export default {
  name: 'LicenseDetails',
  data() {
    return {
      model: 'rounded-xl',
      singleSelect: false,
      headers1: [
        {
          text: 'Registered Licenses',
          align: 'start',
          value: 'name',
          sortable: false,
        },
        { text: 'description', value: 'description' },
      ],
      license: {},
    }
  },

  beforeMount() {
    this.getLicense()
  },

  methods: {
    getLicense() {
      this.$axios
        .get('/api/license/' + this.$route.params.id)
        .then((response) => {
          this.license = response.data
        })
    },
  },
}
</script>
