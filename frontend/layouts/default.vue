<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="settings.drawer"
      :mini-variant="settings.miniVariant"
      :clipped="settings.clipped"
      :fixed="settings.fixed"
      app
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar :clipped-left="settings.clipped" fixed app>
      <v-app-bar-nav-icon @click.stop="settings.drawer = !settings.drawer" />
      <v-btn icon @click.stop="settings.miniVariant = !settings.miniVariant">
        <v-icon
          >mdi-{{
            `chevron-${settings.miniVariant ? 'right' : 'left'}`
          }}</v-icon
        >
      </v-btn>
      <v-btn icon @click.stop="settings.clipped = !settings.clipped">
        <v-icon>mdi-application</v-icon>
      </v-btn>
      <v-toolbar-title>{{ title }}</v-toolbar-title>
      <v-spacer />
    </v-app-bar>
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
    <v-footer :absolute="!settings.fixed" app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
const STORAGE_KEY = "LICENSING_ENGINE_SETTINGS"
export default {
  name: 'DefaultLayout',
  data() {
    return {
      settings: {
        clipped: false,
        drawer: false,
        fixed: false,
        miniVariant: false,
      },
      items: [
        {
          icon: 'mdi-home',
          title: 'Welcome',
          to: '/',
        },
        {
          icon: 'mdi-apps',
          title: 'App',
          to: '/app',
        },
        {
          icon: 'mdi-domain',
          title: 'Domain',
          to: '/domain',
        },
        {
          icon: 'mdi-license',
          title: 'License',
          to: '/license',
        },
        {
          icon: 'mdi-cog-outline',
          title: 'Self test',
          to: '/self-test'
        }
      ],
      title: 'Case3DLicensing',
    }
  },
  watch: {
    settings: {
      handler: function (val) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(val))
      },
      deep: true,
    },
  },
  mounted() {
    const settings =  localStorage.getItem(STORAGE_KEY)
    if (!settings) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.settings))
    } else {
      this.settings = JSON.parse(settings)
    }
  },
  methods: {},
}
</script>
