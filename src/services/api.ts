import axios from "axios"

export const api = axios.create({
    baseURL: "https://budgets-management.herokuapp.com"
})