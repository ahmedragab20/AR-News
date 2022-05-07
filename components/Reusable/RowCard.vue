<template>
  <v-container>
    <v-card
      width="100%"
      class="mx-auto my-1 d-flex justify-space-between align-center flex-nowrap pa-1 pa-sm-3"
      rounded="lg"
      elevation="10"
      @click="dialogHandler"
    >
      <v-sheet max-width="75%">
        <div class="context">
          <small v-html="dateHandler(item.publishedAt)"></small>
          <h6 class="text-body-1 text-sm-h6 text-truncate">
            {{ item.title }}
          </h6>
          <p class="text-caption text-sm-body-1 text-truncate">
            {{ item.content }}
          </p>
          <small>{{ item.source.name }}</small>
        </div>
      </v-sheet>
      <v-sheet max-width="15%" rounded="lg" class="overflow-hidden">
        <v-img
          :src="item.urlToImage || require('@/assets/images/banner.jpg')"
        ></v-img>
      </v-sheet>
    </v-card>
    <ReusablePreviewDialog
      v-if="dialog"
      :dialog="dialog"
      :dialogHandler="dialogHandler"
    >
      <ReusableLGCard :item="item" />
    </ReusablePreviewDialog>
  </v-container>
</template>
<script>
import { dateHandler } from '../../utils/helpers'

export default {
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  data: () => ({
    dialog: false,
  }),
  methods: {
    dateHandler: dateHandler,
    dialogHandler() {
      this.dialog = !this.dialog
    },
  },
}
</script>
