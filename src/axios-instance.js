import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://padel-app-api-fleal.herokuapp.com/'
})

export default instance
