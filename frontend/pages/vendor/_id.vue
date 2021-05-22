<template>
  <div>
    <h1>
      This will be where individual form will be visible. Visible to vendor and
      admin
    </h1>
    <a-row v-if="vendorLoaded">
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
    </a-row>
    <a-row v-if="vendorLoaded">
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
      vendorDetails: {},
    }
  },
  methods: {
    async getVendorDetails(vendorID) {
      const result = await this.$axios.post('vendor/' + vendorID)
      if (result.data.vendorName) {
        this.vendorLoaded = true
        this.vendorDetails = result.data
        console.log(result.data)
      } else {
        this.$message.error('Could not fetch vendor data')
      }
    },
  },
}
</script>

<style scoped></style>
