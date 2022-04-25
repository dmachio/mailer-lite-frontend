export default function ({ $axios, $config: { apiURL }, store }) {
  $axios.setBaseURL(apiURL)
}
