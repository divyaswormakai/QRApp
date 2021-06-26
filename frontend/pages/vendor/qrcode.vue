<template>
  <div>
    <div class="qr-container" id="qr-container">
      <div
        style="
          position: absolute;
          right: 0;
          top: 35%;
          transform: translateY(-50%);
        "
      >
        <div
          style="
            background-color: #f6b618;
            color: white;
            margin-bottom: 10px;
            right: 0;
            width: 150px;
            position: absolute;
            top: -50px;
            right: 0;
            border-radius: 3px;
          "
        >
          <span style="font-size: 2rem; font-weight: 600"> &euro;1 | </span>
          <span style="font-size: 1.5rem">1 Day</span>
        </div>
        <div
          style="
            background-color: #f6b618;
            color: white;
            width: 225px;
            position: absolute;
            top: 10px;
            right: 0;
            border-radius: 3px;
          "
        >
          <span style="font-size: 2rem; font-weight: 600"> &euro;90 | </span>
          <span style="font-size: 1.5rem">3 Months</span>
        </div>
      </div>
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
        Keeping Staff & Customers Safe With Zero Hassle And No More Delays.
      </div>

      <div
        style="
          background-color: #f6b618;
          margin-top: 150px;
          display: flex;
          flex-direction: column;
          align-items: center;
        "
      >
        <!--        BORDER IN CANVAS-->
        <div
          style="
            width: 270px;
            height: 260px;
            margin-top: -100px;
            background-color: white;
          "
        >
          <qrcode-vue
            v-show="vendorFormURL.length > 0"
            :value="vendorFormURL"
            size="250"
            class="vendor-qrcode"
            id="vendor-qrcode"
          ></qrcode-vue>
        </div>

        <p style="font-weight: bold; font-size: 0.75rem">
          Scan This Code To View The Sample Form
        </p>
        <p
          style="
            padding: 0 18%;
            font-size: 16px;
            font-weight: 600;
            margin-top: 50px;
          "
        >
          Introducing a system to save you time to increase your sales. Print &
          Place on Tables, Menus, Entrances & More. Customer recieves an
          immediate confirmation email. Staff can easily check with a distant
          glance. If it is a
          <span style="color: red; font-weight: bold">RED</span>, they submitted
          YES to a Question , if it is
          <span style="color: white; font-weight: bold">WHITE</span> they said
          NO.
        </p>
        <p style="color: white; font-size: 16px; font-weight: 600">
          No queues at doors to check in.<br />
          Staff and Customer Safety Made Simple.<br />Instant & Automated -No
          More Pens, Pads and ClipBoards.
        </p>
        <div style="font-weight: 900; font-size: 1.25rem">
          <span style="text-decoration: line-through">&nbsp;&nbsp;&nbsp;</span>
          GDPR COMPLIANT
          <span style="text-decoration: line-through">&nbsp;&nbsp;&nbsp;</span>
        </div>
        <div
          style="
            display: flex;
            flex-direction: row;
            width: 40vw;
            margin: 20px 0;
            justify-content: space-between;
            background-color: white;
            padding: 5px 25px;
            border-radius: 25px;
          "
        >
          <div style="font-weight: bolder">ESOC-LIVE LTD</div>
          <div style="font-weight: bolder">oisin@e-society.ie</div>
          <div style="font-weight: bolder">0873323843</div>
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
