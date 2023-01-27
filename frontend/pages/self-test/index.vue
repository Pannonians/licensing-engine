<template>
  <section>
    <div>Self test here, testing with default url</div>
    <div class="d-flex align-center">
      <v-text-field
        v-model="token"
        label="Token (leave blank to test domain)"
      />
      <v-btn color="primary ml-5" @click="testNetwork()"> Test </v-btn>
    </div>
    <div>
      <code style="color: white" v-if="response">
        <pre>{{ JSON.stringify(response, null, 4) }}</pre>
      </code>
    </div>
  </section>
</template>

<script>
import { licensingEngineApi } from 'licensing-engine-sdk'
export default {
  data: () => ({
    response: null,
    token: '',
  }),
  methods: {
    testNetwork() {
      licensingEngineApi(
        !this.token.length ? 'domain' : 'token',
        this.token.length !== 0 ? this.token : null
      )
        .getLicenses[''].GET()
        .then(({ data }) => {
          this.response = data
        })
        .catch((e) => {
          this.response = e.response.data
        })
    },
  },
}
</script>
