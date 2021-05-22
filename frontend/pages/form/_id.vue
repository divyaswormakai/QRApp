<template>
  <div>
    <h1>
      This will be where individual form will be visible. Visible to vendor and
      admin
    </h1>
    <table v-if="formLoaded">
      <tbody>
        <tr>
          <td class="table-bold">Full Name</td>
          <td>{{ formDetails.fullName }}</td>
        </tr>
        <tr>
          <td class="table-bold">Vendor visisted</td>
          <td>{{ formDetails.vendorID.vendorName }}</td>
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
          <td>{{ getVisitDate }}</td>
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
          <td class="table-bold">Comments</td>
          <td>{{ formDetails.commments || '' }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  //  TODO: Show the details of the form like in table here
  name: 'FormIndividualComponent',
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

  computed: {
    getVisitDate() {
      return this.formDetails.dateOfVisit.slice(0, 10)
    },
  },
  methods: {
    async getFormDetails(formID) {
      const result = await this.$axios.post('form/' + formID)
      if (result.data.fullName) {
        this.formDetails = result.data
        console.log(result.data)
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
