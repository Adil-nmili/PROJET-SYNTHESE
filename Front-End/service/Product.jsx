import { axiosClient } from "../api/axios"


const Product =  {
  getCSRFToken: async () => {
    return await axiosClient.get("/sanctum/csrf-cookie")
  },
  getAll: async () => {
    return axiosClient.get('/api/products')
  },
  create: async (payload) => {
    return axiosClient.post('/api/products', payload, { headers: { "Content-Type": "multipart/form-data" } })
  },
  update: async (id, payload) => {
    return axiosClient.put(`/api/products/${id}`, payload, {
      headers: { 
        "Content-Type": "multipart/form-data" 
      }
    })
  },
  delete: async (id) => {
    return axiosClient.delete(`/api/products/${id}`)
  },
  getById: async (id) => {
    return axiosClient.get(`/api/products/${id}`)
  }
}

export default Product
