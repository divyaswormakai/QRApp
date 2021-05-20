import { message } from 'ant-design-vue'

export default function ({ $axios, redirect }) {
  $axios.onError((error) => {
    if (error.response.status === 400) {
      message.error('Failed to load data. Try again later.')
    }
  })
}
