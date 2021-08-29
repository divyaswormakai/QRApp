<template>
  <div class="login-container">
    <h1 class="header">Ireland Contact Tracing</h1>

    <a-radio-group v-model="selectedOption" button-style="solid">
      <a-radio-button v-for="option in radioButtonOptions" :key="option" :value="option" >
        {{ option }}
      </a-radio-button>
    </a-radio-group>

    <h2 class="header">{{ selectedOption }} Login</h2>
    <a-form
      id="vendor-login-form"
      :form="vendorLoginForm"
      class="login-form"
      @submit="handleSubmit"
      v-show="selectedOption==='Vendor'"
      :scroll="{ x: 1200 }"
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
      id="admin-login-form"
      :form="adminLoginForm"
      class="login-form"
      @submit="handleAdminLogin"
      v-show="selectedOption==='Admin'"
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
    <a-form
      id="school-login-form"
      :form="schoolLoginForm"
      class="login-form"
      @submit="handleSchoolLogin"
      v-show="selectedOption==='School'"
      :scroll="{ x: 1200 }"
    >
      <a-form-item>
        <a-input
          v-decorator="[
            'schoolEmail',
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
    <p id="login-footer">Powered by e-society.ie</p>
    <a href="https://e-society.ie">
      <img src="~assets/esociety-logo.svg" alt="E-society logo" width="150" />
    </a>
  </div>
</template>

<script>
import {
  LOCAL_STORAGE_TOKEN,
  LOCAL_STORAGE_ROLE_TYPE,
  LOCAL_STORAGE_VENDOR_ID,
} from '../utils/constants'

export default {
  beforeCreate() {
    switch (this.$cookies.get(LOCAL_STORAGE_ROLE_TYPE)) {
      case 'vendor': {
        this.$router.push(
          '/vendor/' + this.$cookies.get(LOCAL_STORAGE_VENDOR_ID)
        )
        break
      }
      case 'admin': {
        this.$router.push('/vendor')
        break
      }
      default: {
        break
      }
    }
    this.vendorLoginForm = this.$form.createForm(this, {
      name: 'vendor_login_form',
    })
    this.adminLoginForm = this.$form.createForm(this, {
      name: 'admin_login_form',
    })
    this.schoolLoginForm = this.$form.createForm(this, {
      name: 'school_login_form',
    })
  },

  data() {
    return {

      selectedOption: "Vendor",
      radioButtonOptions: [
        "Admin" ,"Vendor", "School"
      ]
    }
  },
  methods: {
    async handleSubmit(e) {
      e.preventDefault()
      await this.vendorLoginForm.validateFields(async (err, values) => {
        if (!err) {
          const result = await this.$axios.post('login/vendor', values)
          if (result.data.token) {
            this.$message.success(`Welcome ${result?.data?.vendor?.vendorName}`)

            this.$cookies.set(LOCAL_STORAGE_TOKEN, result.data.token)
            this.$cookies.set(LOCAL_STORAGE_ROLE_TYPE, 'vendor')
            this.$cookies.set(LOCAL_STORAGE_VENDOR_ID, result.data.vendor.id)
            this.$root.$emit('loginEvent')
            this.$router.push(`vendor/${result.data.vendor.id}`)
          }
        }
      })
    },
    async handleAdminLogin(e) {
      e.preventDefault()
      await this.adminLoginForm.validateFields(async (err, values) => {
        if (!err) {
          const result = await this.$axios.post('login/admin', values)
          if (result.data.token) {
            this.$cookies.set(LOCAL_STORAGE_TOKEN, result.data.token)
            this.$cookies.set(LOCAL_STORAGE_ROLE_TYPE, 'admin')
            this.$root.$emit('loginEvent')
            this.$router.push(`vendor`)
          }
        }
      })
    },
    async handleSchoolLogin(e) {
      e.preventDefault()
      await this.schoolLoginForm.validateFields(async (err, values) => {
        if (!err) {
          const result = await this.$axios.post('login/school', values)
          if (result.data.token) {
            this.$cookies.set(LOCAL_STORAGE_TOKEN, result.data.token)
            this.$cookies.set(LOCAL_STORAGE_ROLE_TYPE, 'school')
            this.$root.$emit('loginEvent')
            this.$router.push(`school/${result.data.school.id}`)
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
</style>
