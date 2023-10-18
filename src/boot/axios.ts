import axios, { type AxiosResponse, type AxiosError, type AxiosInstance, type InternalAxiosRequestConfig, } from 'axios'

// import { boot, } from 'quasar/wrappers'

import { createErrorMessage, } from '../utils/notify'

// Define the interface for your API response data
export type ApiResponse<T> = {
  data: T
  // You can also include other properties like status, message, etc.
}

axios.defaults.timeout = 5000 // 5 second

// Create an Axios instance with a base URL and default configuration
// You can also configure other Axios options such as headers, timeout, etc.
const api: AxiosInstance = axios.create({ baseURL: import.meta.env.VITE_API_BASE_URL, })

/* export default boot(({ app, }) => {
})
 */

// Add request interceptors for common functionality like adding headers, handling errors, etc.
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => config,
  async (error: AxiosError): Promise<AxiosError> => {
    const errorMessage = error.message || error.response?.data?.message || error.response?.data
    const message = JSON.stringify(errorMessage)

    createErrorMessage(message)

    return await Promise.reject(errorMessage)
  }
)

api.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => response,
  async (error: AxiosError): Promise<AxiosError> => {
    const errorMessage = error.message || error.response?.data?.message || error.response?.data
    const message = JSON.stringify(errorMessage)

    createErrorMessage(message)

    return await Promise.reject(errorMessage)
  }
)

export { api, }
