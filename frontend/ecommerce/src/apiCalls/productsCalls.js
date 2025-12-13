import { axiosCall } from "./axiosConfig";


//auth reqs
export async function getAllProductsReq(searchQuery){
    try {
        const response = await axiosCall.get(`/products/getall?${searchQuery}`)
        return {status: response.status, data: response.data.message};
    } catch (error) {
        console.log(error)
        if(error.response.data.message){
            return {status: error.response.status, data: error.response.data.message};
        //error no coneccion
        }else{
            return {status: error.response.status, data: "No server response."};
        }
    }
}





