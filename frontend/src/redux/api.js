import axios from 'axios'
export const URL = "http://localhost:5000/api"
// export const URL = "https://ill-lime-eagle.cyclic.app/"
// export const URL = "boostrap/api"
// export const URL = "https://railway-mern-production.up.railway.app/api"
// export const Image_URL = "https://railway-mern-production.up.railway.app"

const api = axios.create({
    baseURL:URL
})

export default api