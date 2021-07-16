import { message } from 'ant-design-vue'
import { LOCAL_STORAGE_TOKEN } from '../utils/constants'

export default function ({ $axios, redirect, app }) {
  $axios.onRequest((config) => {
    $axios.setHeader(
      'x-auth-token',
      app.context.app.$cookies.get(LOCAL_STORAGE_TOKEN)
    )
  })
  $axios.onResponse((response) => {
    if ([400, 401].includes(response.status)) {
      message.error(response.data.error)
    }
    if ([201].includes(response.status)) {
      message.error(response.data.message)
    }
  })
  $axios.onError((error) => {
    if (error.response.status === 400) {
      message.error(error.response.data.error || 'Failed to load data. Try again later.')
    }
  })
  $axios.onResponseError((error) => {
    if (error.response?.status === 401) {
      message.error(error.response.data.error)
      redirect('/')
    }
  })
}
