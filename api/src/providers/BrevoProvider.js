// Lưu ý Brevo là tên thương hiệu mới của sib - Sendinblue
// Vì thế trong phần hướng dẫn trên github có thể nó vẫn còn giữ tên biến SibApiV3Sdk
// https://github.com/getbrevo/brevo-node
const SibApiV3Sdk = require('@getbrevo/brevo')
import { env } from '~/config/environment'

/**
* Có thể xem thêm phần docs câu hình theo từng ngôn ngữ khác nhau tùy dự án ở Brevo Dashboard > Account >
* SMTP & API > API Keys
* https://brevo.com
* Với Nodejs thì tốt nhất cứ lên github repo của bọn nó là nhanh nhất:
* https://github.com/getbrevo/brevo-node
*/
let apiInstance = new SibApiV3Sdk.TransactionalEmailsApi()
let apiKey = apiInstance.authentications ['apiKey']
apiKey.apiKey = env.BREVO_API_KEY

const sendEmail = async (recipientEmail, customSubject, htmlContent) => {
  // Khởi tạo sendSmtpEmail
  let sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail()

  // Tài khoản gửi mail: địa chỉ admin email, là email tạo tài khoản Brevo
  sendSmtpEmail.sender = { email: env.ADMIN_EMAIL_ADDRESS, name: env.ADMIN_EMAIL_NAME }

  // Những tài khoản nhận mail
  // 'to' là Array để tùy biến gửi mail tới users theo tùy tính năng
  sendSmtpEmail.to = [{ email: recipientEmail }]

  // Tiêu đề:
  sendSmtpEmail.subject = customSubject

  // Nội dung: định dạng html
  sendSmtpEmail.htmlContent = htmlContent

  // Gọi hành động gửi mail
  return apiInstance.sendTransacEmail(sendSmtpEmail)
}

export const BrevoProvider = {
  sendEmail
}