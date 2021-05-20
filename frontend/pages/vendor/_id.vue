<template>
  <div>
    <h1>
      This will be where individual form will be visible. Visible to vendor and
      admin
    </h1>
    <qrcode-vue :value="vendorFormURL"></qrcode-vue>
    <a :href="vendorFormURL">Go to new form</a>
  </div>
</template>

<script>
import QrcodeVue from 'qrcode.vue'

export default {
  name: 'VendorIndividualComponent',
  components: { QrcodeVue },
  mounted() {
    const vendorID = window.location.pathname.split('/')[2]

    this.vendorFormURL = `${window.location.origin}/form/new/${vendorID}`
  },
  data() {
    return {
      vendorFormURL: '',
    }
  },
}
</script>

<style scoped></style>
