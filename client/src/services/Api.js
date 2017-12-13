import axios from 'axios'

var baseUrl = 'https://localhost:8081/'

export default () => {
  return axios.create({
    baseURL: baseUrl
  })
}
