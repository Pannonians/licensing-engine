<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <v-card class="logo py-4 d-flex justify-center">
        <Case3DLogo />
      </v-card>
      <v-card>
        <v-card-title class="headline justify-center">
          Licensing engine
        </v-card-title>
        <v-card-text>
          <router-link to="/app">
            <v-card class="my-5" color="#555" dark>
              <v-card-title class="text-h5"> Apps </v-card-title>

              <v-card-subtitle
                >Manage your apps which provide tokens that you can use to
                authenticate with Licensing Engine.</v-card-subtitle
              >
            </v-card>
          </router-link>
          <router-link to="/domain">
            <v-card class="my-5" color="#555" dark>
              <v-card-title class="text-h5"> Domains </v-card-title>

              <v-card-subtitle
                >Register domains and grant them access to your
                licenses.</v-card-subtitle
              >
            </v-card>
          </router-link>
          <router-link to="/license">
            <v-card class="my-5" color="#555" dark>
              <v-card-title class="text-h5"> Licenses </v-card-title>

              <v-card-subtitle
                >Manage your apps which provide tokens that you can use to
                authenticate with Licensing Engine.</v-card-subtitle
              >
            </v-card>
          </router-link>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'IndexPage',
}
</script>
