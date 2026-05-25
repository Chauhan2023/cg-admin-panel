import axios from "axios";
import { baseUrlMain } from "../Api/axiosInstance";


export const axiosClients = axios.create({
    baseURL: baseUrlMain,
    withCredentials: true
})

export const axiosClient = axios.create({
    baseURL: baseUrlMain,
    withCredentials: true
})