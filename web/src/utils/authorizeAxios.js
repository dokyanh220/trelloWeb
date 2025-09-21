import axios from 'axios'
import { toast } from 'react-toastify'
import { interceptorLoadingElements } from './formatters'

// Khởi tạo đối tượng Axios(authorizeAxiosInstance) mục đích để custom và cấu hình chung cho dự án
let authorizeAxiosInstance = axios.create()
// Thời gian chờ tối đa của 1 request: để 10 phút
authorizeAxiosInstance.defaults.timeout = 1000 * 60 * 10
// witdhCredentials: sẽ cho phép axios tự động gửi cookie trong mỗi request lên BE (phục vụ việc chúng ta sẽ lưu Jwt tokens (refesh & access)
// vào trong httpOnly Cookie của trình duyệt)
authorizeAxiosInstance.defaults.withCredentials = true

// Interceptor request can thiệp vào giữa những request API
authorizeAxiosInstance.interceptors.request.use((config) => {
  // Kỹ thuật ngăn chặn click
  interceptorLoadingElements(true)

  return config
}, (error) => {
  // Do something with request error
  return Promise.reject(error)
})

// Interceptor response can thiệp vào giữa response nhận về
authorizeAxiosInstance.interceptors.response.use((response) => {
  // Kỹ thuật ngăn chặn click
  interceptorLoadingElements(false)

  return response
}, (error) => {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  // Mọi mã http status code nằm ngoài khoảng 200 - 299 là error

  // Kỹ thuật ngăn chặn click
  interceptorLoadingElements(false)

  // Xử lý tập trung phần hiển thị thông báo cho lỗi trả về mọi API ở đât (viết code một lần: Clean code)
  // console.log .error ra sẽ thấy cấu trúc data gửi tới message lỗi như dưới đây
  let errorMessage = error?.message
  if (error.response?.data?.message) {
    errorMessage = error.response.data.message
  }
  // Dùng toastify để hiện bất kể mã lỗi trên màn hình - ngoại trừ mã 410 - GONE phục vụ việc tự động refesh lại token
  if (error.response?.status !== 410) {
    toast.error(errorMessage)
  }
  return Promise.reject(error)
})


export default authorizeAxiosInstance