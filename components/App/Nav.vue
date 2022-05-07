<template>
  <nav>
    <v-system-bar height="30" class="d-flex justify-center align-center">
      <span v-html="dateHandler('default')"></span>
    </v-system-bar>
    <v-toolbar dense flat>
      <v-app-bar-nav-icon
        v-if="isSmall"
        @click.stop="drawer = !drawer"
      ></v-app-bar-nav-icon>

      <v-toolbar-title>
        <nuxt-link to="/" class="color--text text-decoration-none logo-link"
          >AR<strong>News</strong></nuxt-link
        >
      </v-toolbar-title>
      <div class="links" v-if="!isSmall">
        <v-btn
          v-for="(link, $index) in links"
          :key="$index"
          :to="`/${link.name}`"
          plain
          class="color--text"
          :ripple="false"
        >
          {{ link.name }}
        </v-btn>
      </div>

      <v-spacer></v-spacer>

      <!-- the left side -->
      <div>
        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <v-btn v-bind="attrs" v-on="on" @click="appModeHandler" icon>
              <v-icon>mdi-lightbulb</v-icon>
            </v-btn>
          </template>
          <span>Change your color mode</span>
        </v-tooltip>
      </div>
    </v-toolbar>
    <!-- the drawer -->
    <v-navigation-drawer v-model="drawer" temporary app hide-overlay>
      <v-list nav dense>
        <v-list-item-group
          v-model="group"
          active-class="amber--text text--accent-4"
        >
          <v-list-item v-for="(link, $index) in links" :key="$index">
            <nuxt-link
              :to="`/${link.name}`"
              class="w-full text-capitalize text-decoration-none color--text"
            >
              <v-list-item-title>
                {{ link.name }}
              </v-list-item-title>
            </nuxt-link>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </nav>
</template>

<script>
import { dateHandler } from '../../utils/helpers'
export default {
  data() {
    return {
      drawer: false,
      group: null,
      links: [{ name: 'sports' }, { name: 'technology' }],
    }
  },
  computed: {
    isSmall() {
      return this.$vuetify.breakpoint.smAndDown
    },
  },
  created() {
    setInterval(() => {
      this.dateHandler('default')
    }, 1000)
  },
  watch: {
    group() {
      this.drawer = false
    },
  },
  methods: {
    appModeHandler() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark
      // localStorage.setItem('useDarkTheme', this.$vuetify.theme.dark.toString())
    },
    dateHandler: dateHandler,
  },
  mounted() {
    // const theme = localStorage.getItem('useDarkTheme')
    // console.log(theme)
    // if (theme) {
    //   if (theme == 'true') {
    //     this.$vuetify.theme.dark = true
    //   } else this.$vuetify.theme.dark = false
    // }
  },
}
</script>

<style lang="scss" scoped>
nav {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 9;

  .logo-link:focus {
    outline: none;
  }
}
</style>
