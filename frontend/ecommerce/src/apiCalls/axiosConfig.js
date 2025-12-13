import axios from 'axios';
const base_url = `http://localhost:8080/api`


//call para sing in y sing up
export const axiosCall = axios.create({
    baseURL: base_url ,
    withCredentials: true,
})



