import axios from 'axios'

var baseUrl = 'http://babbelbord.herokuapp.com/'

export default () => {
  return axios.create({
    baseURL: baseUrl
  })
}
