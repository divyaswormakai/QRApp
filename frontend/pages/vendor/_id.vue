<template>
  <div>
    <h1>This will be homepage for the vendor.</h1>
    <h2>
      They can see their details and QR code here. QR will give the link to new
      form with vendor intials
    </h2>
  </div>
</template>

<script>
export default {
  name: '_id',
  mounted() {
    fetchVendors()
  },
  data() {
    return {
      vendorList: [],
    }
  },
  methods: {
    async fetchVendors() {
      try {
        const vendorList = await this.$axios.post('admin/vendor')
        this.vendorList = vendorList
      } catch (err) {
        console.log(err)
        message.error('Could not fetch vendor list')
      }
    },
  },
}
</script>

<style scoped></style>
