import {
  LOCAL_STORAGE_ROLE_TYPE,
  LOCAL_STORAGE_VENDOR_ID,
} from '../utils/constants'

export default function ({ app, redirect }) {
  console.log(
    'Inside auth: ',
    app.context.app.$cookies.get(LOCAL_STORAGE_ROLE_TYPE)
  )
  if (app.context.app.$cookies.get(LOCAL_STORAGE_ROLE_TYPE) === 'vendor') {
    redirect(`/vendor/${app.context.app.$cookies.get(LOCAL_STORAGE_VENDOR_ID)}`)
  } else if (
    app.context.app.$cookies.get(LOCAL_STORAGE_ROLE_TYPE) === 'admin'
  ) {
    redirect(`/vendor`)
  }
}
