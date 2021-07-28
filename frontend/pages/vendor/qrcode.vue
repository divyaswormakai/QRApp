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
    >Save PNG
    </a-button
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
    >Save indoor QR PNG
    </a-button
    >

    <h3>Poster Indoor Form</h3>
    <div class="qr-container" id="qr-container-poster" style="background-color: white">
      <img
        src="~assets/esociety_logo_qr.svg"
        alt="E-society logo"
        width="100"
        style="margin-bottom: 25px"
      />
      <p style="color: #f6b618; font-size: 2.5rem; margin: 0; ">
        VACCINATION CERT
      </p>
      <p
        style="color: black; font-size: 2.25rem; margin: 0;"
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
        Scan This Code.
      </div>

      <div
        class="container-body"
      >
        <!--        BORDER IN CANVAS-->
        <div
          class="qr-code"
        >
          <qrcode-vue
            v-show="vendorIndoorFormURL.length > 0"
            :value="vendorIndoorFormURL"
            size="250"
            class="vendor-qrcode"
            id="vendor-qrcode-poster"
          ></qrcode-vue>
        </div>

        <p style=" font-size: 1.25rem; color:black">
          Safe. Simple. Steady.
        </p>


        <ul style="color: white; font-size: 16px; font-weight: 600; text-align: left; padding-right: 2%">
          <li>Upload your EU Vaccination Certificate, Immunisation Proof or Equivalent.</li>
          <li>Upload your identification.</li>
          <li>Upload a file/image or take a picture.</li>
        </ul>
        <div style="font-weight: 900; font-size: 1.25rem">
          <span style="text-decoration: line-through">&nbsp;&nbsp;&nbsp;</span>
          GDPR COMPLIANT
          <span style="text-decoration: line-through">&nbsp;&nbsp;&nbsp;</span>
        </div>
        <p style="    padding: 0px 18%;
    font-size: 12px;
    font-weight: 600;
">
          Personal data contained in a proof of immunity shall be processed only for the purpose of accessing and
          verifying the information included in such proof of immunity in connection with the admittance of permitted
          persons to relevant indoor premises.

        </p>
        <div
          class="footer-3"
        >
          <div style="font-weight: bolder;">{{vendorName}}</div>

        </div>
      </div>
    </div>

    <a-button type="primary" @click="downloadPNGQPoster" id="png-btn-poster"
    >Save indoor QR PNG
    </a-button
    >

    <div id="img-out"></div>
  </div>
</template>

<script>
// Big text for scan your code
// Safety word
// It's here for all our safety.
import QrcodeVue from "qrcode.vue";
import * as htmlToImage from "html-to-image";

export default {
  name: "qrcode",
  components: { QrcodeVue },
  middleware: ["vendorAuth"],
  mounted() {
    if (!this.$route.query.url) {
      this.$message.error("QR code could not be generated");
      this.$router.push("/vendor");
    }
    this.vendorFormURL = this.$route.query.url;
    this.vendorIndoorFormURL = this.$route.query.url.replace("new", "indoor");
    this.vendorName = this.$route.query.vendorName;
    console.log(this.$route.query.url.replace("new", "indoor"));
  },
  data() {
    return {
      vendorFormURL: "",
      vendorIndoorFormURL: "",
      vendorName:""
    };
  },
  methods: {
    downloadPNGQR() {
      htmlToImage
        .toJpeg(document.getElementById("qr-container"), { quality: 0.95 })
        .then(function(dataUrl) {
          const link = document.createElement("a");
          link.download = "my-image-name.jpg";
          link.href = dataUrl;
          link.click();
        });
    },
    downloadPNGQRIndoor() {
      htmlToImage
        .toJpeg(document.getElementById("qr-container-indoor"), { quality: 0.95 })
        .then(function(dataUrl) {
          const link = document.createElement("a");
          link.download = "indoor-qr.jpg";
          link.href = dataUrl;
          link.click();
        });
    },
    downloadPNGQPoster(){
      htmlToImage
        .toJpeg(document.getElementById("qr-container-poster"), { quality: 0.95 })
        .then(function(dataUrl) {
          const link = document.createElement("a");
          link.download = "poster-qr.jpg";
          link.href = dataUrl;
          link.click();
        });
    }
  }
};
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
  max-width: 450px;
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

.container-body{
  background-color: #f6b618;
  margin-top: 150px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.footer-3 {
  display: flex;
  flex-direction: row;
  width: 90%;
  /*margin: 10px 0;*/
  justify-content: center;
  align-items: center;
  align-self:center;
  background-color: white;
  padding: 10px 25px;
  border-radius: 25px;
  margin-bottom: 2%;
}

.qr-code{
  width: 270px;
  height: 260px;
  margin-top: -100px;
  background-color: white;
}

@media screen and (max-width: 768px) {
  .footer-3 {
    /*flex-direction: column;*/
    width: 80%;
  }
}
</style>
