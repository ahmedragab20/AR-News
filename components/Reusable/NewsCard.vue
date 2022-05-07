<template>
  <v-card
    class="mx-auto"
    :max-width="this.$vuetify.breakpoint.width > 280 ? 270 : 250"
    v-if="item"
  >
    <v-img
      :src="item.urlToImage || require('@/assets/images/banner.jpg')"
      height="200px"
    ></v-img>
    <v-card-title>
      <span class="text-truncate" :title="item.title">
        {{ item.title }}
      </span>
    </v-card-title>

    <v-card-subtitle :title="item.author" class="text-truncate">
      {{ item.author || 'Unknown Author' }}
    </v-card-subtitle>

    <v-card-actions>
      <v-btn @click="dialogHandler(item)" color="orange lighten-2" text>
        Explore
      </v-btn>

      <v-spacer></v-spacer>

      <v-btn icon @click="show = !show">
        <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
      </v-btn>
    </v-card-actions>

    <v-expand-transition>
      <div v-show="show">
        <v-divider></v-divider>

        <v-card-text v-if="item.content">
          {{
            item.content.length > 110
              ? `${item.content.substring(0, 110)}...`
              : item.content
          }}
        </v-card-text>
      </div>
    </v-expand-transition>
  </v-card>
</template>
<script>
export default {
  props: {
    item: {
      type: Object,
      required: true,
    },
    dialogHandler: {
      type: Function,
      required: true,
    },
  },
  data: () => ({
    show: false,
  }),
}
</script>
