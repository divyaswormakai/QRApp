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
        <b> Data Protection Notice:</b> Your personal data is being collected on
        this form in order to help prevent the spread of COVID-19 in
        <b
          ><i>"{{ vendorName }}"</i></b
        >
        and to protect our staff. Your personal data is being processed in
        accordance with Article 9(2)(i) of the General Data Protection
        Regulation, and Section 53 of the Data Protection Act 2018. The
        information you provide on this form will not be used for any other
        purpose, and will be strictly confidential. The form will be accessible
        only to administrator of e-society and the vendor for whom you have
        filled the form.<br />
        The Health Act 1947 (Section 31A - Temporary Restrictions) (Covid-19) (No. 2) Regulations 2021 (SI 217 of 2021) provide that a specified person shall retain and make available records made under paragraph (2) for the purposes of inspection by a member of the Garda Síochána acting in the course of his or her duties under these Regulations, or by a person appointed by the Health Service Executive for the purposes of the programme commonly known as the Covid-19 Contact Management Programme, for a period of 28 days after the records have been made. Should a confirmed case arise, the Contact Management Programme will take the necessary action to contact those who need to be contacted.
        <br/>
        <b>Powered by:</b><br />
        <a href="https://e-society.ie"
          ><img
            src="~assets/esociety-logo.svg"
            alt="E-society logo"
            width="150"
        /></a>
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
                            initialValue: currentTime

            },
          ]"
          style="width: 100%"
          format="DD-MM-YYYY"

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
              initialValue: currentTime
            },
          ]"
          use12-hours
          format="hh:mm A"
          style="width: 100%"
        />
      </a-form-item>

      <a-form-item label="How many people are there in your table/group?">
        <a-input-number v-decorator="['noOfPeopleInGroup']" />
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
      currentTime:moment()
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
          dateOfVisit: this.form.getFieldsValue().dateOfVisit.format('YYYY-MM-DD').toString(),
          timeOfVisit: this.form.getFieldsValue().timeOfVisit.format('hh:mm A').toString(),
          vendorID: this.vendorID
        }
        const result = await this.$axios.post('form/add', postBody)
        if (result.data.vendorID) {
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

<style scoped></style>
