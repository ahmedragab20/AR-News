export const actions = {
  async TopHeadlines(_, payload) {
    let response = await this.$axios.$get(
      `top-headlines?category=${payload}&country=us`
    )
    return response
  },
  async SearchResults(_, payload) {
    let response = await this.$axios.$get(`everything?q=${payload}`)
    return response
  },
}
