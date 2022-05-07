export default function ({ $axios }) {
  $axios.onRequest((config) => {
    config.headers = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    }
    config.params = {
      apiKey: '81cbcf0b383046309504f25ab7c00bd4',
    }
  })

  $axios.onError((error) => {
    console.log(error)
  })
}
