import axios from "axios";

const API = axios.create({

    baseURL: 'https://api.hgbrasil.com/'

})

export default API