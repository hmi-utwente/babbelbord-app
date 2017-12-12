import axios from 'axios'

var baseUrl = 'http://localhost:8081/'

export default () => {
  return axios.create({
    baseURL: baseUrl
  })
}