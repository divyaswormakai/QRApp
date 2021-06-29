<template>
  <div>
    <div class="qr-container" id="qr-container">
      <img
        src="~assets/esociety_logo_qr.svg"
        alt="E-society logo"
        width="100"
        style="margin-bottom: 25px"
      />
      <p style="color: #f6b618; font-size: 4rem; margin: 0; line-height: 4rem">
        TRACK & TRACE
      </p>
      <p
        style="color: black; font-size: 4.5rem; margin: 0; line-height: 4.5rem"
      >
        <b>USING QR CODE</b>
      </p>
      <div
        style="
          background-color: #f6b618;
          color: white;
          margin: 2vh 0px;
          padding: 5px 50px;
          border-radius: 25px;
          font-weight: bold;
        "
      >
        Keeping Staff & Customers Safe.
      </div>

      <div
        style="
          background-color: #f6b618;
          margin-top: 225px;
          display: flex;
          flex-direction: column;
          align-items: center;
          height: 100%;
          max-width: 80vw;
          min-width: 50vw;
        "
      >
        <!--        BORDER IN CANVAS-->
        <div
          style="
            width: 320px;
            height: 310px;
            margin-top: -150px;
            background-color: white;
          "
        >
          <qrcode-vue
            v-show="vendorFormURL.length > 0"
            :value="vendorFormURL"
            size="300"
            class="vendor-qrcode"
            id="vendor-qrcode"
          ></qrcode-vue>
        </div>

        <p
          style="
            font-weight: bold;
            font-size: 1.5rem;
            text-transform: capitalize;
          "
        >
          Scan the QR Code and please fill the form
        </p>

        <div style="font-weight: 900; font-size: 1.25rem">
          <span style="text-decoration: line-through">&nbsp;&nbsp;&nbsp;</span>
          GDPR COMPLIANT
          <span style="text-decoration: line-through">&nbsp;&nbsp;&nbsp;</span>
        </div>
        <div style="width: 80%">
          <h3 style="font-size: 2rem; color: white">Instructions:</h3>
          <div
            style="
              display: flex;
              flex-direction: row;
              justify-content: center;
              color: white;
            "
          >
            <div style="width: 49%">
              <h3>For iOS</h3>
              <p
                style="
                  font-weight: bold;
                  font-size: 1.75rem;
                  text-transform: capitalize;
                "
              >
                Open your camera
              </p>
            </div>
            <div style="width: 2px; background-color: white"></div>
            <div style="width: 49%">
              <h3>For Android</h3>
              <p style="font-weight: bold; font-size: 1.5rem">
                Open your QR Scanner
              </p>
            </div>
          </div>
        </div>
        <div
          style="
            display: flex;
            flex-direction: row;
            width: 70%;
            margin: 20px 0;
            justify-content: center;
            background-color: white;
            padding: 5px 25px;
            border-radius: 25px;
          "
        >
          <div style="font-weight: bolder">
            Complete the health check. It takes less than a minute. For all of
            our safety.
          </div>
        </div>
      </div>
      <br />
    </div>

    <a-button type="primary" @click="downloadPNGQR" id="png-btn"
      >Save PNG</a-button
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
  background: white;
  padding: 5px;
  margin-bottom: 10px;
  position: relative;
  width: 60vw;
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
