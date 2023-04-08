import axios from "axios";
import { parseCookies } from 'nookies'

export function getApiClient(ctx?: any){
    const { 'uniReadiToken': token } = parseCookies(ctx)
    
    const api = axios.create({
        baseURL: process.env.API_URL
    })
    
    if(token) {
        api.defaults.headers['Authorization'] = `Bearer ${token}`
    }

    return api

}
