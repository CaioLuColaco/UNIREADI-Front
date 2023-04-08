import axios from "axios";
import { parseCookies } from 'nookies'

const { 'uniReadiToken': token } = parseCookies()

const api = axios.create({
    baseURL: process.env.API_URL
})

if(token) {
    api.defaults.headers['Authorization'] = `Bearer ${token}`
}

export default api;