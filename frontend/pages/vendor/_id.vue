<template>
  <div>
    <h1>
      This will be where individual form will be visible. Visible to vendor and
      admin
    </h1>
    <div v-if="vendorLoaded">
      <a-row>
        <!--              <qrcode-vue-->
        <!--                :value="vendorFormURL"-->
        <!--                size="300"-->
        <!--                class="vendor-qrcode"-->
        <!--                id="vendor-qrcode"-->
        <!--              ></qrcode-vue>-->
        <a-button type="primary">
          <nuxt-link :to="getQrcodeURL" target="_blank"
            >Print your QR Code here</nuxt-link
          >
        </a-button>
        <a-button
          ><nuxt-link :to="vendorSubmittedFormURL"
            >See all submitted forms</nuxt-link
          ></a-button
        >
      </a-row>
      <a-row>
        <table style="width: 100%">
          <tbody>
            <tr>
              <td class="table-bold" width="30%">Name</td>
              <td>{{ vendorDetails.vendorName }}</td>
            </tr>
            <tr>
              <td class="table-bold">Email</td>
              <td>{{ vendorDetails.vendorEmail }}</td>
            </tr>
            <tr>
              <td class="table-bold">Location</td>
              <td>{{ vendorDetails.vendorLocation }}</td>
            </tr>
            <tr>
              <td class="table-bold">Primary Contact</td>
              <td>{{ vendorDetails.vendorContact }}</td>
            </tr>
            <tr>
              <td class="table-bold">Secondary Contact</td>
              <td>{{ vendorDetails.vendorSecondaryContact }}</td>
            </tr>
          </tbody>
        </table>
      </a-row>
    </div>
  </div>
</template>

<script>
import QrcodeVue from 'qrcode.vue'

export default {
  name: 'VendorIndividualComponent',
  components: { QrcodeVue },
  beforeCreate() {
    console.log('Before create')
  },
  mounted() {
    console.log('AAAAAA')
    const vendorID = window.location.pathname.split('/')[2]
    this.vendorID = vendorID
    console.log('bbbb')

    this.vendorFormURL = `${window.location.origin}/form/new/${vendorID}`
    this.getVendorDetails(vendorID)
    console.log('ccccc')
  },
  computed: {
    getQrcodeURL() {
      return '/vendor/qrcode/?url=' + this.vendorFormURL
    },
    vendorSubmittedFormURL() {
      return '/vendor/forms/' + this.vendorID
    },
  },
  data() {
    return {
      vendorFormURL: 'testID',
      vendorLoaded: false,
      vendorDetails: {},
      vendorID: '',
    }
  },
  methods: {
    async getVendorDetails(vendorID) {
      console.log('VENDORRRR', vendorID)
      const result = await this.$axios.post('vendor/' + vendorID)
      if (result.data.vendorName) {
        this.vendorLoaded = true
        this.vendorDetails = result.data
      } else {
        this.$message.error('Could not fetch vendor data')
      }
    },
  },
}
</script>

<style scoped></style>
