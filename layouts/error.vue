<template>
  <v-app dark style="height: 100vh">
    <div class="h-full d-flex justify-center align-center flex-column">
      <h1 v-if="error.statusCode === 404" class="mt-16">
        {{ pageNotFound }}
      </h1>
      <h1 v-else>
        {{ otherError }}
      </h1>
      <v-btn class="px-4" text rounded to="/"> Home page </v-btn>
    </div>
  </v-app>
</template>

<script>
export default {
  name: 'EmptyLayout',
  layout: 'empty',
  props: {
    error: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      pageNotFound: '404 Not Found',
      otherError: 'An error occurred',
    }
  },
  head() {
    const title =
      this.error.statusCode === 404 ? this.pageNotFound : this.otherError
    return {
      title,
    }
  },
}
</script>

<style scoped>
h1 {
  font-size: 20px;
}
</style>
