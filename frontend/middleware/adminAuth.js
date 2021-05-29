import { LOCAL_STORAGE_ROLE_TYPE } from '../utils/constants'

export default function ({ app, redirect }) {
  if (app.context.app.$cookies.get(LOCAL_STORAGE_ROLE_TYPE) !== 'admin') {
    redirect(`/`)
  }
}
