<template>
  <v-row no-gutters class="flex-column">
    <div>
      <AppBanner :bannerImage="bannerImage" title="TECH" />
    </div>
    <v-btn v-if="waitingData" x-large text plain loading></v-btn>
    <div class="pt-5" id="news_sections">
      <v-container>
        <h3 class="headline font-weight-bold my-9">Top Headlines</h3>

        <v-row no-gutters justify="center" align="center">
          <v-col
            cols="12"
            lg="3"
            md="4"
            sm="6"
            v-for="(item, $index) in fetchedHeadlines"
            :key="$index"
            class="d-flex justify-center align-center py-2"
          >
            <ReusableNewsCard :item="item" :dialogHandler="dialogHandler" />
          </v-col>
        </v-row>
        <ReusablePreviewDialog :dialog="dialog" :dialogHandler="dialogHandler">
          <ReusableLGCard :item="clickedPost" />
        </ReusablePreviewDialog>
      </v-container>
    </div>
  </v-row>
</template>

<script>
export default {
  head() {
    return {
      title: 'AR-News',
    }
  },
  data() {
    return {
      bannerImage: require('@/assets/images/tech-banner.jpg'),
      fetchedHeadlines: [],
      dialog: false,
      clickedPost: null,
      waitingData: false,
    }
  },
  created() {
    this.fetchGlobalHeadlines()
  },
  methods: {
    async fetchGlobalHeadlines() {
      this.waitingData = true
      let response = await this.$store.dispatch('TopHeadlines', 'technology')
      if (response?.articles.length > 8) {
        this.fetchedHeadlines = response.articles.splice(0, 8)
      } else {
        this.fetchedHeadlines = response.articles
      }
      this.waitingData = false
    },
    dialogHandler(post) {
      this.clickedPost = post
      this.dialog = !this.dialog
    },
  },
}
</script>
