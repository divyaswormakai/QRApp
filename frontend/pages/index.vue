<template>
  <div class="login-container">
    <h1 class="header">Ireland Contact Tracing</h1>

    <a-switch
      checked-children="Admin"
      un-checked-children="Vendor"
      @change="isAdmin = !isAdmin"
    />

    <h2 class="header">{{ getLoginTypeTitle }}</h2>
    <a-form
      id="vendor-login-form"
      :form="vendorLoginForm"
      class="login-form"
      @submit="handleSubmit"
      v-if="!isAdmin"
    >
      <a-form-item>
        <a-input
          v-decorator="[
            'vendorEmail',
            {
              rules: [{ required: true, message: 'Please input your email!' }],
            },
          ]"
          placeholder="Email"
        >
          <a-icon
            slot="prefix"
            type="mail"
            style="color: rgba(0, 0, 0, 0.25)"
          />
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-input
          v-decorator="[
            'password',
            {
              rules: [
                { required: true, message: 'Please input your Password!' },
              ],
            },
          ]"
          type="password"
          placeholder="Password"
        >
          <a-icon
            slot="prefix"
            type="lock"
            style="color: rgba(0, 0, 0, 0.25)"
          />
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-button type="primary" html-type="submit" class="login-form-button">
          Log in
        </a-button>
      </a-form-item>
    </a-form>
    <a-form
      id="admin-loginform"
      :form="adminLoginForm"
      class="login-form"
      @submit="handleAdminLogin"
      v-else
    >
      <a-form-item>
        <a-input
          v-decorator="[
            'username',
            {
              rules: [{ required: true, message: 'Please input your email!' }],
            },
          ]"
          placeholder="Username"
        >
          <a-icon
            slot="prefix"
            type="user"
            style="color: rgba(0, 0, 0, 0.25)"
          />
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-input
          v-decorator="[
            'password',
            {
              rules: [
                { required: true, message: 'Please input your Password!' },
              ],
            },
          ]"
          type="password"
          placeholder="Password"
        >
          <a-icon
            slot="prefix"
            type="lock"
            style="color: rgba(0, 0, 0, 0.25)"
          />
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-button type="primary" html-type="submit" class="login-form-button">
          Log in
        </a-button>
      </a-form-item>
    </a-form>
    <p id="login-footer">Powered by e-society.ie</p>
    <a href="https://e-society.ie">
      <img src="~assets/esociety-logo.svg" alt="E-society logo" width="150" />
    </a>
  </div>
</template>

<script>
import { LOCAL_STORAGE_TOKEN } from '../utils/constants'

export default {
  beforeCreate() {
    this.vendorLoginForm = this.$form.createForm(this, {
      name: 'vendor_login_form',
    })
    this.adminLoginForm = this.$form.createForm(this, {
      name: 'admin_login_form',
    })
  },
  computed: {
    getLoginTypeTitle() {
      return this.isAdmin ? 'Admin Login' : 'Vendor Login'
    },
  },
  data() {
    return {
      isAdmin: false,
    }
  },
  methods: {
    async handleSubmit(e) {
      e.preventDefault()
      await this.vendorLoginForm.validateFields(async (err, values) => {
        if (!err) {
          console.log(values)
          const result = await this.$axios.post('login/vendor', values)
          if (result.data.token) {
            this.$message.success(`Welcome ${result?.data?.vendor?.vendorName}`)
            localStorage.setItem(LOCAL_STORAGE_TOKEN, result.data.token)

            this.$router.push(`vendor/${result.data.vendor.id}`)
          }
        }
      })
    },
    async handleAdminLogin(e) {
      e.preventDefault()
      await this.adminLoginForm.validateFields(async (err, values) => {
        if (!err) {
          console.log(values)
          const result = await this.$axios.post('login/admin', values)
          if (result.data.token) {
            localStorage.setItem(LOCAL_STORAGE_TOKEN, result.data.token)
            this.$router.push(`vendor`)
          }
        }
      })
    },
  },
}
</script>

<style>
.login-container {
  background: #9f9f9f;
  padding: 5% 10%;
  border-radius: 30px;
  //background: #e0e0e0;
  box-shadow: 8px 8px 16px #aaaaaa, -8px -8px 16px #ffffff;
}

.header {
  color: white;
  font-weight: bold;
}

#login-footer {
  color: white;
  font-style: italic;
}
.ant-switch {
  margin: 10% 0px;
  width: 100%;
  padding: 10% 5%;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  align-self: center;
}
button.ant-switch::after {
  height: 100%;
  top: 0;
}

.ant-form-item {
  margin: 5% 0px;
}

.ant-input {
  padding: 20px 0px;
  border-radius: 15px;
}

.ant-switch-inner {
  font-size: 1.25rem;
}
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}

.ant-btn-primary {
  height: 50px;
  width: 200px;
  background: darkslateblue;
}
.ant-btn {
  height: 50px;
  width: 200px;
}
</style>
