<template>
  <div>
    <h2>Please fill in the form below:</h2>

    <div v-show="formSubmitted">
      <h3>
        Your form has been submitted. You will receive a copy of the form that
        you have submitted in the given email address.
      </h3>
      <a @click="closeWindow()"><i>You can close this window.</i></a>
    </div>
    <a-form
      :form="form"
      @submit="handleNewFormAddition"
      v-show="!formSubmitted"
    >
      <p style="background: #9f9f9f">
        <b> Data Protection Notice:</b> Your personal data is being collected for Covid-19 contact tracing.
        The information you provide on this form will not be used for any other purpose.
        Your information will be kept for 28 days in accordance with: The Health Act 1947
        (Section 31A - Temporary Restrictions) (Covid-19) (No. 2) Regulations 2021 (SI 217 of 2021). <br/>
        <b>Powered by:</b><br />
        <a href="https://e-society.ie"
        ><img
          src="~assets/esociety-logo.svg"
          alt="E-society logo"
          width="150"
        /></a>
      </p>

      <a-form-item label="College Name">
        <a-input v-model="schoolName" disabled />
      </a-form-item>
      <a-form-item label="Room Number">
        <a-input
          v-decorator="[
            'roomNumber',
            {initialValue:roomNumber}
          ]"
          disabled
        />
      </a-form-item>
      <a-form-item label="Email">
        <a-input
          v-decorator="[
            'email',
            {
              rules: [{ required: true, message: 'Please input your email!' }],
            },
          ]"
          type="email"
        />
      </a-form-item>
      <a-form-item label="Full Name">
        <a-input
          v-decorator="[
            'fullName',
            {
              rules: [
                { required: true, message: 'Please input your full name!' },
              ],
            },
          ]"
        />
      </a-form-item>
      <a-form-item label="Student/Staff ID">
        <a-input
          v-decorator="[
            'studentID',

          ]"
        />
      </a-form-item>
      <a-form-item label="Contact Number">
        <a-input
          v-decorator="[
            'phoneNumber',
            {
              rules: [
                {
                  required: true,
                  message: 'Please input your contact number!',
                },
              ],
            },
          ]"
        />
      </a-form-item>
      <a-form-item label="Date of Entry">
        <a-date-picker
          v-decorator="[
            'dateOfVisit',
            {
              rules: [
                { required: true, message: 'Please input your date of entry!' },
              ],
                            initialValue: currentTime

            },
          ]"
          format="DD-MM-YYYY"
          style="width: 100%"

        />
      </a-form-item>
      <a-form-item label="Time of Entry">
        <a-time-picker
          v-decorator="[
            'timeOfVisit',
            {
              rules: [
                { required: true, message: 'Please input your time of entry!' },
              ],
              initialValue: currentTime
            },
          ]"
          use12-hours
          format="hh:mm A"
          style="width: 100%"
        />
      </a-form-item>



      <a-form-item>
        <a-button type="primary" html-type="submit"> Submit </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
import moment from 'moment'
export default {
name: "SchoolForm",

  mounted() {
    const schoolID = window.location?.pathname?.split('/')[3]
    this.schoolID = schoolID
    this.roomNumber = window?.location?.search?.split("=")[1]

    this.getSchoolName()
  },
  data() {
    return {
      schoolID: '',
      form: this.$form.createForm(this, { name: 'coordinated' }),
      schoolName: '',
      formSubmitted: false,
      currentTime:moment(),
      roomNumber:'',
    }
  },
  methods: {
    async getSchoolName() {
      const result = await this.$axios.post('school/' + this.schoolID)
      if (result.data.schoolName) {
        this.schoolName = result.data.schoolName
      } else {
        this.$message.error(
          'Could not find the school. Please scan the QR again'
        )
      }
    },
    async handleNewFormAddition(e) {
      e.preventDefault()
      await this.form.validateFields(async (err) => {
        if (err) {
          this.$message.error('Could not submit form. Please try again.')
          return
        }
        let postBody = {
          ...this.form.getFieldsValue(),
          dateOfVisit: this.form.getFieldsValue().dateOfVisit.format('YYYY-MM-DD').toString(),
          timeOfVisit: this.form.getFieldsValue().timeOfVisit.format('hh:mm A').toString(),
          schoolID: this.schoolID
        }
        const result = await this.$axios.post('form/school/add', postBody)
        if (result.data.schoolID) {
          this.$message.success('Your form has been received successfully')
          this.formSubmitted = true
        }
      })
    },
    closeWindow() {
      window.close()
    },
  },
}
</script>

<style scoped>

</style>
