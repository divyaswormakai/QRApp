<template>
  <div>
    <div class="qr-container" id="qr-container">
      <h2>Please scan this QR code for Contact Tracing Form</h2>
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

      <h2>sadfasdf</h2>
    </div>

    <a-button type="primary" @click="downloadPNGQR" id="png-btn"
      >Save PNG</a-button
    >
    <div id="img-out"></div>
  </div>
</template>

<script>
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
  },
  data() {
    return {
      vendorFormURL: '',
    }
  },
  methods: {
    downloadPNGQR() {
      htmlToImage
        .toJpeg(document.getElementById('qr-container'), { quality: 0.95 })
        .then(function (dataUrl) {
          var link = document.createElement('a')
          link.download = 'my-image-name.jpeg'
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
h2,
h4 {
  color: white;
}
</style>
