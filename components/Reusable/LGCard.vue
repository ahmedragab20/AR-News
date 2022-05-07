<template>
  <v-card flat>
    <v-card v-if="item" flat>
      <div class="image mb-4">
        <v-img
          :src="item.urlToImage || require('@/assets/images/banner.jpg')"
          max-height="40%"
          width="100%"
        ></v-img>
      </div>
      <v-btn plain text target="_blank" :href="item.url">
        <v-icon> mdi-link-variant </v-icon>
      </v-btn>

      <v-card-title v-text="item.title" />
      <v-card-subtitle v-html="dateHandler(item.publishedAt)"></v-card-subtitle>

      <v-card-subtitle> Content: </v-card-subtitle>
      <v-card-text v-text="item.content" />

      <v-card-subtitle> Description: </v-card-subtitle>
      <v-card-text v-text="item.description" />

      <v-card-text class="d-flex">
        <v-icon small>mdi-creation</v-icon>
        <v-card-text v-text="item.source.name" />
      </v-card-text>
    </v-card>
    <div v-else class="d-flex justify-center align-center">
      <v-btn x-large text plain loading></v-btn>
    </div>
  </v-card>
</template>

<script>
import { dateHandler } from '../../utils/helpers'
export default {
  props: {
    item: {
      type: null,
      required: true,
    },
  },
  methods: {
    dateHandler: dateHandler,
  },
}
</script>

<style lang="scss" scoped></style>
