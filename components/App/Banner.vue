<template>
  <div class="banner">
    <section class="overlay">
      <div class="weather d-flex justify-center align-center">
        <div class="text-center" v-if="weatherDetailsLength > 1">
          <p>
            {{ `${weatherDetails.city_name}, ${weatherDetails.country}` }}
          </p>
          <div class="d-flex flex-column justify-center align-center">
            <v-img :src="weatherImage" width="30"></v-img>
            <p class="text-body-2">
              {{ `${weatherDetails.status_text}` }}
            </p>
          </div>
        </div>
        <div class="text-center" v-else>
          <div>
            <v-img :src="weatherImage" width="30"></v-img>
            <h3>Tryna detect your location</h3>
          </div>
          <strong>make sure you've allowed it!</strong>
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
          const API_key = '24040852cab5dde7877cf010b20bd2e0'
          const url = `https://api.openweathermap.org/data/2.5/weather`
          const params = { lat: lat, lon: lon, appid: API_key }
          axios
            .get(url, { params })
            .then((response) => {
              let payload = {}
              Object.assign(payload, {
                country: response.data.sys.country,
                city_name: response.data.name,
                status_text: response.data.weather[0].description,
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
