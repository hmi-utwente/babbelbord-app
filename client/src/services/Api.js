import axios from 'axios'

var baseUrl = 'https://babbelbord.herokuapp.com/'

export default () => {
  return axios.create({
    baseURL: baseUrl
  })
}
