<template>
  <div>
    <h1>
      This will be where individual form will be visible. Visible to vendor and
      admin
    </h1>
    <div v-if="vendorLoaded">
      <qrcode-vue
        :value="vendorFormURL"
        size="300"
        class="vendor-qrcode"
        id="vendor-qrcode"
      ></qrcode-vue>
      <a-button type="primary">
        <nuxt-link :to="getQrcodeURL" target="_blank">Print this</nuxt-link>
      </a-button>
      <a :href="vendorFormURL">Go to new form</a>
    </div>
  </div>
</template>

<script>
import QrcodeVue from 'qrcode.vue'

export default {
  //  TODO: Show the details of the vendor in a table or however you want. just show only
  name: 'VendorIndividualComponent',
  components: { QrcodeVue },
  mounted() {
    const vendorID = window.location.pathname.split('/')[2]
    this.vendorFormURL = `${window.location.origin}/form/new/${vendorID}`
    this.getVendorDetails(vendorID)
  },
  computed: {
    getQrcodeURL() {
      return '/vendor/qrcode/?url=' + this.vendorFormURL
    },
  },
  data() {
    return {
      vendorFormURL: '',
      vendorLoaded: false,
    }
  },
  methods: {
    async getVendorDetails(vendorID) {
      const result = await this.$axios.post('vendor/' + vendorID)
      if (result.data.vendorName) {
        this.vendorLoaded = true
      } else {
        this.$message.error('Could not fetch vendor data')
      }
    },
    printQRCode() {
      // const printContent = document.getElementById('vendor-qrcode').innerHTML
      // const originalContent = document.body.innerHTML
      // document.body.innerHTML = printContent
      window.print()
      // document.body.innerHTML = originalContent
    },
  },
}
</script>

<style scoped></style>
