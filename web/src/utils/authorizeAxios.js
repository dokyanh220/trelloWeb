import axios from 'axios'
import { toast } from 'react-toastify'
import { interceptorLoadingElements } from './formatters'
import { refreshTokenAPI } from '~/apis'
import { logoutUserAPI } from '~/redux/user/userSlice'

/**
* Không thế import { store } from '~/redux/store' theo cách thông thường ở đây
* Giải pháp: Inject store: là kỹ thuật khi cần sử dụng biến redux store ở các file ngoài phạm vi component
như file authorizeAxios hiện tại
* Hiểu đơn giản: khi ứng dụng bắt đầu chạy lên, code sẽ chạy vào main. jsx đầu tiên, từ bên đó chúng ta gọi
hàm injectStore ngay lập tức để gán biến mainStore vào biến axiosReduxStore cục bộ trong file này.
* https://redux.js.org/faq/code-structure#how-can-i-use-the-redux-store-in-non-component-files
*/

let axiosReduxStore
export const injectStore = mainStore => { axiosReduxStore = mainStore }

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

// Khởi tạo promise cho việc gọi api refresh_token
// Mục đích tạo promise này để khi nào gọi api refresh_token xong xuôi thì mới retry lại nhiều api bị lỗi trước đó.
let refreshTokenPromise = null

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

  /** Quan trọng xử lý refresh token tự động */
  // Trường hợp 1: Nếu như nhân mã 401 từ BE, thì gọi API đăng xuất luôn
  if (error.response?.status === 401) {
    axiosReduxStore.dispatch(logoutUserAPI(false))
  }

  // Trường hợp 2: Nếu như nhận mã 410 từ BE, thì sẽ gọi api refresh token để làm mới lại accessToken
  // Đầu tiên lấy được các request API đang bị lỗi thông qua error.config
  const originalRequests = error.config
  // Chỉ cần originalRequests (chính là error.config) tồn tại thì xử lý.
  if (error.response?.status === 410 && originalRequests) {
  /** Flag _retry để đánh dấu: Nếu request này chưa retry lần nào (_retry = undefined hoặc false) thì cho vào block
  * Chỉ retry duy nhất một lần, nếu retry rồi mà vẫn 410 thì sẽ không thử lại nữa.
  * if (error.response?.status === 410 && !originalRequests._retry) {
  * originalRequests._retry = true
  */

    // Kiểm tra nếu chưa có refreshTokenPromise thì thực hiện việc gọi api refresh_token đồng thời gán vaofcho refreshTokenPromise
    if (!refreshTokenPromise) {
      refreshTokenPromise = refreshTokenAPI()
        .then(data => {
          // Đồng thời accessToken đã nằm trong httpOnly cookie (xử lý từ BE)
          return data?.accessToken
        })
        .catch((_error) => {
          // Nếu nhận lỗi bất kỳ từ refresh_token, logout
          axiosReduxStore.dispatch(logoutUserAPI(false))
          // Đảm bảo những chỗ gọi authorizeAxiosInstance mà refresh fail thì vẫn nhận được reject, thay vì cứ tưởng thành công
          // Tránh refresh fail mà request vẫn bị gọi lại gây bug hoặc loop
          return Promise.reject(_error)
        })
        .finally(() => {
          // Dù api thành công hay lỗi gán refreshTokenPromise về giá trị ban đầu
          refreshTokenPromise = null
        })
    }

    // eslint-disable-next-line no-unused-vars
    return refreshTokenPromise.then(accessToken => {
      /**
      * Bước 1: Đối với Trường hợp nếu dự án cần lưu accessToken vào localstorage hoặc đâu đó thì sẽ viết
      * thêm code xử lý ở đây.
      * Hiện tại ở đây không cần bước 1 này vì chúng ta đã đưa accessToken vào cookie (xử lý từ phía BE)
      * sau khi api refreshToken được gọi thành công.
      */
      // axios.defaults.headers.common['Authorization'] = `Bearer ` + accessToken
      // Hiện tại ở đây không cần bước 1 vì chúng ta đã đưa accessToken vào cookie(xử lý từ BE) sau khi gọi api refresh_token thành công

      // Bước 2: Bước Quan trọng: Return lại axios instance của chúng ta kết hợp các originalRequests để gọi lại những api ban đầu bị lỗi
      return authorizeAxiosInstance(originalRequests)
    })
  }

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