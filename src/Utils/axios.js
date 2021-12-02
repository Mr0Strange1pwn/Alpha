import axios from 'axios'

const BASE_URL = 'https://alpha-production.herokuapp.com/api'
// const BASE_URL ='https://alpha-mechlin.herokuapp.com/api'
// const BASE_URL ='https://alpha-mechlin.herokuapp.com/API'

export const Axios = axios.create({
    baseURL: BASE_URL,
})