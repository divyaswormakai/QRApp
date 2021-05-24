<template>
  <div>
    <div class="qr-container" id="qr-container">
      <h4>Please scan this QR code for Contact Tracing</h4>
      <qrcode-vue
        v-if="vendorFormURL.length > 0"
        :value="vendorFormURL"
        size="400"
        class="vendor-qrcode"
        id="vendor-qrcode"
      ></qrcode-vue>
      <nuxt-link :to="vendorFormURL">{{ vendorFormURL }}</nuxt-link>
    </div>
    <a-button type="primary" @click="printQRCode" id="print-btn"
      >Print QR Code</a-button
    >
  </div>
</template>

<script>
import QrcodeVue from 'qrcode.vue'

export default {
  name: 'qrcode',
  components: { QrcodeVue },

  mounted() {
    if (!this.$route.query.url) {
      this.$message.error('QR code could not be generated')
      this.$router.push('/vendor')
    }
    this.vendorFormURL = this.$route.query.url
  },
  data() {
    return {
      vendorFormURL: '',
    }
  },
  methods: {
    printQRCode() {
      document.getElementById('print-btn').style.visibility = 'hidden'
      window.print()
      document.getElementById('print-btn').style.visibility = 'block'
    },
  },
}
</script>

<style scoped>
.qr-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
