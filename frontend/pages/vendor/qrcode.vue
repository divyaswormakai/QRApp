<template>
  <div>
    <h3>Normal Contact Tracing Form</h3>
    <div class="qr-container" id="qr-container">
      <h4>Please scan this QR code for Contact Tracing Form</h4>
      <qrcode-vue
        v-show="vendorFormURL.length > 0"
        :value="vendorFormURL"
        size="400"
        class="vendor-qrcode"
        id="vendor-qrcode"
      ></qrcode-vue>
      <a :href="vendorFormURL" target="_blank">{{ vendorFormURL }}</a>
      <h4>Powered by:</h4>
      <img src="~assets/esociety-logo.svg" alt="E-society logo" width="100" />
    </div>


    <a-button type="primary" @click="downloadPNGQR" id="png-btn"
    >Save PNG</a-button
    >

    <h3>Indoor Contact Tracing Form</h3>
    <div class="qr-container" id="qr-container-indoor">
      <h4>Please scan this QR code for Indoor Contact Tracing Form</h4>
      <qrcode-vue
        v-show="vendorIndoorFormURL.length > 0"
        :value="vendorIndoorFormURL"
        size="400"
        class="vendor-qrcode"
        id="vendor-qrcode-indoor"
      ></qrcode-vue>
      <a :href="vendorIndoorFormURL" target="_blank">{{ vendorIndoorFormURL }}</a>
      <h4>Powered by:</h4>
      <img src="~assets/esociety-logo.svg" alt="E-society logo" width="100" />
    </div>

    <a-button type="primary" @click="downloadPNGQRIndoor" id="png-btn-indoor"
      >Save indoor QR PNG</a-button
    >
    <div id="img-out"></div>
  </div>
</template>

<script>
// Big text for scan your code
// Safety word
// It's here for all our safety.
import QrcodeVue from 'qrcode.vue'
import * as htmlToImage from 'html-to-image'

export default {
  name: 'qrcode',
  components: { QrcodeVue },
  middleware: ['vendorAuth'],
  mounted() {
    if (!this.$route.query.url) {
      this.$message.error('QR code could not be generated')
      this.$router.push('/vendor')
    }
    this.vendorFormURL = this.$route.query.url
    this.vendorIndoorFormURL = this.$route.query.url.replace('new','indoor')
    console.log(this.$route.query.url.replace('new','indoor'))
  },
  data() {
    return {
      vendorFormURL: '',
      vendorIndoorFormURL:''
    }
  },
  methods: {
    downloadPNGQR() {
      htmlToImage
        .toJpeg(document.getElementById('qr-container'), { quality: 0.95 })
        .then(function (dataUrl) {
          const link = document.createElement('a')
          link.download = 'my-image-name.jpg'
          link.href = dataUrl
          link.click()
        })
    },
    downloadPNGQRIndoor() {
      htmlToImage
        .toJpeg(document.getElementById('qr-container-indoor'), { quality: 0.95 })
        .then(function (dataUrl) {
          const link = document.createElement('a')
          link.download = 'indoor-qr.jpg'
          link.href = dataUrl
          link.click()
        })
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
  background: slategray;
  padding: 5px;
  margin-bottom: 10px;
}
a {
  color: white;
  font-size: 14px;
}
h2 {
  font-size: 4rem;
}
canvas {
  border-width: 5px;
  border-style: solid;
  border-color: white;
}
</style>
