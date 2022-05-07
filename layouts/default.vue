<template>
  <v-app>
    <AppNav />
    <v-main>
      <Nuxt />
      <v-card flat rounded="0" width="100%" color="" class="pa-5">
        <v-btn @click="dialogHandler" block>
          <v-icon left>mdi-crosshairs</v-icon>
          search for something
        </v-btn>
      </v-card>
      <ReusablePreviewDialog :dialog="dialog" :dialogHandler="dialogHandler">
        <v-card flat :loading="waitingData" class="overflow-x-hidden">
          <div class="text-center pa-sm-3 pa-1">
            <div class="text-body-1">Type something</div>
            <v-text-field
              v-model="searchText"
              @change="SearchResults(searchText)"
              clearable
              color="amber accent-4"
            ></v-text-field>
          </div>
          <div v-for="(item, i) in fetchedResults" :key="i">
            <ReusableRowCard :item="item" />
          </div>
        </v-card>
      </ReusablePreviewDialog>
    </v-main>
    <v-footer color="transparent" class="mt-6">
      created by Ahmed Ragab {{ new Date().getFullYear() }}&copy;
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: 'DefaultLayout',
  data() {
    return {
      dialog: false,
      searchText: '',
      fetchedResults: [],
      waitingData: false,
    }
  },
  methods: {
    dialogHandler() {
      this.dialog = !this.dialog
    },
    async SearchResults(text) {
      this.waitingData = true
      let response = await this.$store.dispatch('SearchResults', text)
      console.log(response)
      if (response?.articles.length > 30) {
        this.fetchedResults = response.articles.splice(0, 30)
      } else {
        this.fetchedResults = response.articles
      }
      this.waitingData = false
    },
  },
}
</script>
<style lang="scss">
html,
body {
  scroll-behavior: smooth;
}
</style>
