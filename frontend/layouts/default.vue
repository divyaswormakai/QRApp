<template>
  <div>
    <div class="navbar" id="navbar" v-show="loggedIn">
      <a href="/">
        <img src="~assets/esociety-logo.svg" alt="E-society logo" width="150" />
      </a>
      <div style="flex-direction: row; display: flex">
        <div v-show="!isVendor" class="logout-link">
          <a href="/vendor" class="logout-link">Vendor </a>|
          <a href="/form" class="logout-link"> Forms </a>|&nbsp;
        </div>

        <a @click="LogoutHandler()" class="logout-link"> Logout</a>
      </div>
    </div>
    <div class="container">
      <Nuxt />
    </div>
  </div>
</template>

<script>
import {
  LOCAL_STORAGE_TOKEN,
  LOCAL_STORAGE_ROLE_TYPE,
  LOCAL_STORAGE_VENDOR_ID,
} from '../utils/constants'

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
      isVendor: false,
    }
  },

  methods: {
    LogoutHandler() {
      this.$cookies.remove(LOCAL_STORAGE_TOKEN)
      this.$cookies.remove(LOCAL_STORAGE_ROLE_TYPE)
      this.$message.success('Logged out')
      this.loggedIn = false
      this.$router.push('/')
    },
    getLoggedInStatus() {
      this.loggedIn =
        this.$cookies.get(LOCAL_STORAGE_TOKEN) &&
        this.$cookies.get(LOCAL_STORAGE_TOKEN).length > 0
      this.isVendor =
        this.$cookies.get(LOCAL_STORAGE_ROLE_TYPE) &&
        this.$cookies.get(LOCAL_STORAGE_ROLE_TYPE) === 'vendor'
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
  margin: 1% 0px;
}

.ant-input {
  padding: 200px 100px;
  border-radius: 15px;
  min-width: 400px;
  min-height: 50px;
  margin: 1% 0px;
}

.ant-switch-inner {
  font-size: 1.25rem;
}
.container {
  margin: 0 auto;
  display: flex;
  justify-content: center;
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

.ant-layout-header a {
  font-weight: 500;
}

.header-brand {
  font-size: 24px;
  font-weight: 700;
}

table {
  border-collapse: collapse;
  margin: 2% 0%;
  overflow-x: scroll;
  //width: 1200px;
  min-width: 100%;
  table-layout: auto;
}

th {
  font-weight: 600;
}

td,
th {
  border: 1px solid #dddddd;
  text-align: center;
  padding: 10px;
}

/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type='number'] {
  -moz-appearance: textfield;
}

.container {
  width: 90%;
  margin: 0 auto;
  padding: 15px;
}

.ant-layout-header {
  background: #fff;
}

.ant-table-title {
  padding: 16px 0px;
  color: #3e7ffc;
  font-size: 18px;
}

.text-left {
  text-align: left;
}

.text-right {
  text-align: right;
}

.table-responsive {
  overflow-x: auto;
}

.table-responsive .table-p8 {
  min-width: 400px;
}

.ant-steps-item-container {
  padding: 8px 0px;
}

.ant-steps-item-wait .ant-steps-item-icon {
  border: none;
}

.ant-steps-item-icon {
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(184, 209, 233, 0.42);
}

.ant-table table {
  border-collapse: collapse;
}

.ant-form-item-label > label {
  color: #6c757d;
}

.steps-content {
  padding: 2% 0px;
  width: 100%;
}

input.nepali-datepicker {
  width: 100%;
}

input {
  line-height: 1.5715;
}

input:focus {
  -webkit-box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
  box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
}
input,
.ant-input {
  background: rgba(244, 250, 255, 1);
  border-radius: 8px;
  padding: 8px 11px;
  outline: none;
  border: none;
  border: 1px solid rgba(167, 182, 211, 0.69);
}

input:focus,
.ant-input:focus {
  outline: none;
  border: none;
  background: rgba(255, 255, 255, 1);
}

.ant-select:not(.ant-select-customize-input) .ant-select-selector,
.ant-cascader-input.ant-input,
.ant-input-number-input,
.ant-input-number {
  background: rgba(244, 250, 255, 1) !important;
  border-radius: 8px;
  /* padding: 8px 11px; */
  outline: none;
  border: none;
  border: 1px solid rgba(167, 182, 211, 0.69);
}

.ant-select-single:not(.ant-select-customize-input) .ant-select-selector,
.ant-input-number-input {
  min-height: 41.15px;
}

.ant-select-single .ant-select-selector .ant-select-selection-item,
.ant-select-single .ant-select-selector .ant-select-selection-placeholder {
  line-height: 41.15px;
}

td .ant-select {
  width: 100%;
}

.ant-btn {
  border-radius: 8px;
  padding: 15px 72px;
  height: auto;
}

.ant-btn-sm {
  padding: 15px 36px;
  margin: 0px 5px;
}

.ant-btn-xs {
  padding: 0px 5px;
  margin: 0px 5px;
}

.ant-table-wrapper {
  max-width: 90vw;
}

@media (max-width: 400px) {
  .container {
    width: 100%;
  }
}
</style>
