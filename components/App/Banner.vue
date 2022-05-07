<template>
  <div class="banner">
    <section class="overlay">
      <div class="weather d-flex justify-center align-center">
        <div class="image mx-1">
          <v-img :src="weatherImage" width="30"></v-img>
        </div>
        <h3 class="text-center" v-if="weatherDetailsLength > 1">
          {{
            `${weatherDetails.city_name}, ${weatherDetails.country} ${weatherDetails.status_code}`
          }}
          <v-icon>mdi-thermometer-low</v-icon>
        </h3>
        <div class="text-center" v-else>
          <h3>Tryna detect your location</h3>
          <strong>make sure you've allowed it</strong>
        </div>
      </div>
      <h3
        class="text-center mt-3 text-uppercase"
        :class="[!this.isSmall ? 'display-3' : 'headline']"
      >
        BE CONNECTED WITH <strong>{{ title }}</strong>
      </h3>
      <div class="d-flex justify-center align-center">
        <v-btn
          text
          link
          href="#news_sections"
          rounded
          min-width="250"
          max-height="250"
          class="mx-auto px-6"
          >GET MORE!</v-btn
        >
      </div>
    </section>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  props: {
    bannerImage: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      weatherDetails: {},
    }
  },
  computed: {
    bannerBG() {
      if (this.$vuetify.theme.isDark) {
        return 'rgba(0, 0, 0, 0.8)'
      } else {
        return 'rgba(255, 255, 255, 0.2)'
      }
    },
    isSmall() {
      return this.$vuetify.breakpoint.smAndDown
    },
    weatherDetailsLength() {
      return Object.keys(this.weatherDetails).length
    },
    weatherImage() {
      if (this.weatherDetailsLength > 0) {
        if (
          this.weatherDetails.status_text?.includes('lear') &&
          !this.weatherDetails.status_text?.includes('ain') &&
          !this.weatherDetails.status_text?.includes('loud')
        ) {
          return require('@/assets/images/weather/sunny.png')
        } else if (
          this.weatherDetails.status_text?.includes('ain') &&
          !this.weatherDetails.status_text?.includes('lear') &&
          !this.weatherDetails.status_text?.includes('loud')
        ) {
          return require('@/assets/images/weather/rainy.png')
        } else {
          return require('@/assets/images/weather/fine.png')
        }
      }
    },
  },
  mounted() {
    this.weatherHandler()
    const banner = document.querySelector('.banner')
    const overlay = document.querySelector('.overlay')
    banner.style.backgroundImage = `url(${this.bannerImage})`
    setInterval(() => {
      overlay.style.background = `linear-gradient(transparent, ${this.bannerBG})`
    })
  },
  methods: {
    weatherHandler() {
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition((position) => {
          // location info
          const lat = position.coords.latitude
          const lon = position.coords.longitude

          // api options
          const api_key = '8450f5434dmshd37611d1dd5c49dp1fe6fdjsn7d5ba06fbd11'
          const url =
            'https://weatherbit-v1-mashape.p.rapidapi.com/forecast/3hourly'
          const params = { lat: lat, lon: lon }
          const headers = {
            'X-RapidAPI-Host': 'weatherbit-v1-mashape.p.rapidapi.com',
            'X-RapidAPI-Key': api_key,
          }
          axios
            .get(url, {
              params,
              headers,
            })
            .then((response) => {
              let payload = {}
              Object.assign(payload, {
                country: response.data.country_code,
                status_code: +response.data.state_code,
                city_name: response.data.city_name,
                status_text: response.data.data[0].weather.description,
              })
              this.weatherDetails = payload
            })
            .catch((error) => console.error(error))
        })
      } else {
        // I will handle it later
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.banner {
  height: 100vh;
  width: 100vw;
  background: center no-repeat;
  background-size: cover;
  position: relative;

  .overlay {
    position: absolute;
    inset: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 10px;
  }
}
</style>
