import axios from 'axios'

const BASE_URL = 'https://alpha-production.herokuapp.com/api'
// const BASE_URL = 'http://mtoffice.dyndns.org:8001/api'

export const Axios = axios.create({
    baseURL: BASE_URL,
})