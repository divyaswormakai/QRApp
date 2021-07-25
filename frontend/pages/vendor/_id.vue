<template>
  <div>
    <h1>Venue Details:</h1>
    <div v-if="vendorLoaded">
      <a-row>
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

  mounted() {
    const vendorID = window.location.pathname.split('/')[2]
    this.vendorID = vendorID

    this.vendorFormURL = `${window.location.origin}/form/new/${vendorID}`
    this.getVendorDetails(vendorID)
  },
  computed: {
    getQrcodeURL() {
      return '/vendor/qrcode/?url=' + this.vendorFormURL+'&vendorName='+this.vendorDetails.vendorName
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
      const result = await this.$axios.post('vendor/' + vendorID)
      if (result.data.vendorName) {
        this.vendorDetails = result.data
        this.vendorLoaded = true
      } else {
        this.$message.error('Could not fetch vendor data')
      }
    },
  },
}
</script>

<style scoped></style>
