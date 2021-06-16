import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:3001/api',
})

export const insertRestaurant = payload => api.post(`/restaurant`, payload)
export const getAllRestaurants = () => api.get(`/restaurants`)
export const updateRestaurantById = (id, payload) => api.put(`/restaurant/${id}`, payload)
export const deleteRestaurantById = id => api.delete(`/restaurant/${id}`)
export const getRestaurantById = id => api.get(`/restaurant/${id}`)

const apis = {
    insertRestaurant,
    getAllRestaurants,
    updateRestaurantById,
    deleteRestaurantById,
    getRestaurantById,
}

export default api