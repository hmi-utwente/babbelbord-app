import axios from 'axios'

var baseUrl = 'http://localhost:8080/'

export default () => {
  return axios.create({
    baseURL: baseUrl
  })
}
