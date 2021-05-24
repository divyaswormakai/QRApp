<template>
  <div>
    <div class="navbar" v-if="loggedIn">
      <a href="/">
        <img src="~assets/esociety-logo.svg" alt="E-society logo" width="150" />
      </a>
      <a @click="LogoutHandler()" class="logout-link">Logout</a>
    </div>
    <div class="container">
      <Nuxt />
    </div>
  </div>
</template>

<script>
import { LOCAL_STORAGE_TOKEN } from '../utils/constants'

export default {
  mounted() {
    this.getLoggedInStatus()

    this.$root.$on('loginEvent', () => {
      this.getLoggedInStatus()
    })
  },
  data() {
    return {
      loggedIn: false,
    }
  },

  methods: {
    LogoutHandler() {
      localStorage.removeItem(LOCAL_STORAGE_TOKEN)
      this.$message.success('Logged out')
      this.loggedIn = false
      this.$router.push('/')
    },
    getLoggedInStatus() {
      this.loggedIn =
        localStorage &&
        localStorage.getItem(LOCAL_STORAGE_TOKEN) &&
        localStorage.getItem(LOCAL_STORAGE_TOKEN).length > 0
    },
  },
}
</script>
<style>
html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}

.container {
  margin: 0 5%;
  //padding: 0 5%;
  //width: 100%;
  padding: 2%;
  background: white;
}

.navbar {
  //max-width: 100vw;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 1% 5%;
  background: #454545;
}

.logout-link {
  color: #d7acac;
  text-decoration: none;
  font-size: 1.2rem;
}

.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}

.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}

.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}

.ant-form-item {
  margin-bottom: 0px;
}
.table-bold {
  font-weight: bold;
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
