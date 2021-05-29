<template>
  <div>
    <h2>Please fill in the form below:</h2>
    <div v-if="formSubmitted">
      <h4>
        Your form has been submitted. You will receive a copy of the form that
        you have submitted in the given email address
      </h4>
      <i>You can close this window.</i>
    </div>
    <a-form :form="form" @submit="handleNewFormAddition" v-else>
      <p>
        <b> Data Protection Notice:</b> Your personal data is being collected on
        this form in order to help prevent the spread of COVID-19 in our
        barbershops and to protect our staff. Your personal data is being
        processed in accordance with Article 9(2)(i) of the General Data
        Protection Regulation, and Section 53 of the Data Protection Act 2018.
        The information you provide on this form will not be used for any other
        purpose, and will be strictly confidential. The form will be accessible
        only to administrator of e-society and the vendor for whom you have
        filled the form. Your data will be retained for 12 weeks.
      </p>
      <a-form-item label="Vendor">
        <a-input v-model="vendorName" disabled />
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
      <a-form-item label="Date of Visit">
        <a-date-picker
          v-decorator="[
            'dateOfVisit',
            {
              rules: [
                { required: true, message: 'Please input your date of visit!' },
              ],
            },
          ]"
          style="width: 100%"
        />
      </a-form-item>
      <a-form-item label="Time of Visit">
        <a-time-picker
          v-decorator="[
            'timeOfVisit',
            {
              rules: [
                { required: true, message: 'Please input your time of visit!' },
              ],
            },
          ]"
          use12-hours
          format="h:mm:a"
          style="width: 100%"
        />
      </a-form-item>
      <a-form-item label="Do you have temperature?">
        <a-radio-group
          v-decorator="[
            'temperature',
            {
              rules: [
                { required: true, message: 'Please input your time of visit!' },
              ],
            },
          ]"
          button-style="solid"
        >
          <a-radio-button :value="true"> Yes </a-radio-button>
          <a-radio-button :value="false"> No </a-radio-button>
        </a-radio-group>
      </a-form-item>
      <a-form-item label="Do you have cough?">
        <a-radio-group
          v-decorator="[
            'cough',
            {
              rules: [
                { required: true, message: 'Please input your time of visit!' },
              ],
            },
          ]"
          button-style="solid"
        >
          <a-radio-button :value="true"> Yes </a-radio-button>
          <a-radio-button :value="false"> No </a-radio-button>
        </a-radio-group>
      </a-form-item>
      <a-form-item label="Have you been abroad in the past 14 days? ">
        <a-radio-group
          v-decorator="[
            'abroadIn14Days',
            {
              rules: [
                { required: true, message: 'Please input your time of visit!' },
              ],
            },
          ]"
          button-style="solid"
        >
          <a-radio-button :value="true"> Yes </a-radio-button>
          <a-radio-button :value="false"> No </a-radio-button>
        </a-radio-group>
      </a-form-item>
      <a-form-item
        label="Have you been in contact with a confirmed positive Covid-19 case in the past 14 days? "
      >
        <a-radio-group
          v-decorator="[
            'contactIn14Days',
            {
              rules: [
                { required: true, message: 'Please input your time of visit!' },
              ],
            },
          ]"
          button-style="solid"
        >
          <a-radio-button :value="true"> Yes </a-radio-button>
          <a-radio-button :value="false"> No </a-radio-button>
        </a-radio-group>
      </a-form-item>
      <a-form-item label="How many people were there in your table/group?">
        <a-input-number v-decorator="['noOfPeopleInGroup']" />
      </a-form-item>
      <a-form-item
        label="Have you been in contact with a confirmed positive Covid-19 case in the past 14 days? "
      >
        <a-textarea
          v-decorator="['comments']"
          placeholder="Any comments on the form, feel free to write it down here."
          :auto-size="{ minRows: 2, maxRows: 10 }"
        />
      </a-form-item>
      <a-form-item :wrapper-col="{ span: 12, offset: 5 }">
        <a-button type="primary" html-type="submit"> Submit </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
export default {
  name: 'NewFormComponent',
  mounted() {
    const vendorID = window.location?.pathname?.split('/')[3]
    this.vendorID = vendorID
    this.getVendorName()
  },
  data() {
    return {
      vendorID: '',
      form: this.$form.createForm(this, { name: 'coordinated' }),
      vendorName: '',
      formSubmitted: false,
    }
  },
  methods: {
    async getVendorName() {
      const result = await this.$axios.post('vendor/' + this.vendorID)
      if (result.data.vendorName) {
        this.vendorName = result.data.vendorName
      } else {
        this.$message.error(
          'Could not find the vendor. Please scan the QR again'
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
          vendorID: this.vendorID,
        }
        postBody.timeOfVisit = postBody.timeOfVisit.format('h:mm a').toString()
        const result = await this.$axios.post('form/add', postBody)
        if (result.data.vendorID) {
          this.$message.success('Your form has been recieved successfully')
          this.formSubmitted = true
        }
      })
    },
  },
}
</script>

<style scoped></style>
