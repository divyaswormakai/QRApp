<template>
  <div>
    <h1>Form Details:</h1>
    <table v-show="formLoaded">
      <tbody>
        <tr>
          <td class="table-bold">Full Name</td>
          <td>{{ formDetails.fullName }}</td>
        </tr>
        <tr>
          <td class="table-bold">Vendor visited</td>
          <td>{{ formDetails.vendorName }}</td>
        </tr>
        <tr>
          <td class="table-bold">Email</td>
          <td>{{ formDetails.email }}</td>
        </tr>
        <tr>
          <td class="table-bold">Contact Number</td>
          <td>{{ formDetails.phoneNumber }}</td>
        </tr>
        <tr>
          <td class="table-bold">Date Of Visit</td>
          <td>{{ formDetails.dateOfVisit }}</td>
        </tr>
        <tr>
          <td class="table-bold">Time of Visit</td>
          <td>{{ formDetails.timeOfVisit }}</td>
        </tr>
        <tr>
          <td class="table-bold">Have Temperature?</td>
          <td>{{ formDetails.temperature ? 'Yes' : 'No' }}</td>
        </tr>
        <tr>
          <td class="table-bold">Have Cough?</td>
          <td>{{ formDetails.cough ? 'Yes' : 'No' }}</td>
        </tr>
        <tr>
          <td class="table-bold">Visited Abroad in 14 days?</td>
          <td>{{ formDetails.abroadIn14Days ? 'Yes' : 'No' }}</td>
        </tr>
        <tr>
          <td class="table-bold">
            Been in contact with positive person in 14 days?
          </td>
          <td>{{ formDetails.contactIn14Days ? 'Yes' : 'No' }}</td>
        </tr>
        <tr>
          <td class="table-bold">
            How many people were there in your table/group?
          </td>
          <td>{{ formDetails.noOfPeopleInGroup || '-' }}</td>
        </tr>
        <tr>
          <td class="table-bold">Comments</td>
          <td>{{ formDetails.commments || '' }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'FormIndividualComponent',
  middleware: ['vendorAuth'],
  mounted() {
    const formID = window.location.pathname.split('/')[2]
    this.getFormDetails(formID)
  },
  data() {
    return {
      formDetails: {},
      formLoaded: false,
    }
  },

  methods: {
    async getFormDetails(formID) {
      const result = await this.$axios.post('form/' + formID)
      if (result.data.fullName) {
        this.formDetails = { ...result.data }
        this.formDetails.vendorName = result.data?.vendorID?.vendorName || ''
        this.formDetails.dateOfVisit =
          result.data?.dateOfVisit?.slice(0, 10) || ''
        this.formLoaded = true
      } else {
        this.$message.error('Could not load form data. Try again!!!')
        this.$router.go(-1)
      }
    },
  },
}
</script>

<style scoped></style>
