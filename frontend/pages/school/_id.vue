<template>
  <div>
    <h1>School Details:</h1>
    <div v-if="schoolLoaded">
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
            <td>{{ schoolDetails.schoolName }}</td>
          </tr>
          <tr>
            <td class="table-bold">Email</td>
            <td>{{ schoolDetails.schoolEmail }}</td>
          </tr>
          <tr>
            <td class="table-bold">Location</td>
            <td>{{ schoolDetails.schoolLocation }}</td>
          </tr>
          <tr>
            <td class="table-bold">Primary Contact</td>
            <td>{{ schoolDetails.schoolContact }}</td>
          </tr>
          <tr>
            <td class="table-bold">Class List</td>
            <td>
              {{schoolDetails.classRoomList.join(", ")}}
            </td>

          </tr>
          </tbody>
        </table>
      </a-row>
    </div>
  </div>
</template>

<script>
export default {
name: "individualSchool",
  mounted() {
    const schoolID = window.location.pathname.split('/')[2]
    this.schoolID = schoolID

    this.schoolFormURL = `${window.location.origin}/form/school/${schoolID}`
    this.getSchoolDetails(schoolID)
  },

  computed:{
    getQrcodeURL() {
      return '/school/qrcode/?url=' + this.schoolFormURL+'&schoolID='+this.schoolID
    },
    vendorSubmittedFormURL() {
      return '/school/forms/' + this.schoolID
    },
  },
  data(){
  return{
    schoolFormURL:'',
    schoolLoaded: false,
    schoolDetails:{},
    schoolID:""
  }
  },
  methods:{
  async getSchoolDetails(schoolID){
    const result = await this.$axios.post("school/"+schoolID)
    if(result.data.schoolName){
      this.schoolDetails = result.data
      this.schoolLoaded=true
    }else{
      this.$message.error("Could not fetch school data")
    }
  }
  }
}
</script>

<style scoped>

</style>
