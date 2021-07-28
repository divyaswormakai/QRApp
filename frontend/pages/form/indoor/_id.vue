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
        <b> Data Protection Notice:</b> Your personal data is being collected on this form in order to help prevent the spread of COVID-19 in
        <b
        ><i>"{{ vendorName }}"</i></b
        >
        and to protect our staff and our customers. Your personal data is being processed in accordance with Article 9(2)(i) of the General Data Protection Regulation, and Section 53 of the Data Protection Act 2018. The information you provide on this form will not be used for any other purpose, and will be strictly confidential. The form will be accessible only to the vendor for whom you have filled the form. E-Society will not retain any of your information once you hit submit.  <br />
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
          format="hh:mm A"
          style="width: 100%"
        />
      </a-form-item>
      <a-form-item label="Table Number/Booking Reference/Confirmation Number">
        <a-input
          v-decorator="[
            'refNo',

          ]"
        />
      </a-form-item>

      <a-form-item label="Upload One of the following: EU Vaccination Cert/ or Foreign Equivalent/ or Immunization Proof" >
        <a-upload :file-list="fileList" :remove="handleRemove" :before-upload="beforeUpload" :multiple="false">
          <a-button> <a-icon type="upload" /> Select File </a-button>
        </a-upload>
      </a-form-item>

      <a-form-item label="Upload your identification" >
        <a-upload :file-list="identityFileList" :remove="handleRemoveIdentity" :before-upload="beforeUploadIdentity" :multiple="false">
          <a-button> <a-icon type="upload" /> Select Identification File </a-button>
        </a-upload>
      </a-form-item>



      <a-checkbox v-model="isCheckBoxTrue">
        Tick this box to confirm the information provided is authentic and that all images/files uploaded are verification of your legal capability to enter the premises for indoor dining within the present Health Acts & Emergency measures.      </a-checkbox>
      <a-form-item>
        <a-button type="primary" html-type="submit" :disabled="!isCheckBoxTrue || isClicked"> Submit </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
export default {
  name: 'NewIndoorFormComponent',
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
      agreed: false,
      fileList:[],
      identityFileList:[],
      isCheckBoxTrue: false,
      isClicked: false,
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

        this.isClicked = true;
        e.preventDefault()
        setTimeout(()=>{
          this.isClicked=false;
        },30000)
        await this.form.validateFields(async (err) => {
          if (err) {
            this.isClicked = false;
            this.$message.error('Could not submit form. Please try again.')
            return
          }

          try{
            const formValues = this.form.getFieldsValue();
            const formData = new FormData();
            formData.append("vendorID",this.vendorID);
            formData.append("email",formValues.email);
            formData.append("fullName", formValues.fullName)
            formData.append("dateOfVisit", formValues.dateOfVisit)
            formData.append("timeOfVisit", formValues.timeOfVisit.format('hh:mm A').toString())
            formData.append("refNo", formValues.refNo || "")
            formData.append("image",
              this.fileList[0]
            )
            if(this.identityFileList.length>0) {
              formData.append('image2', this.identityFileList[0])
            }
            const result = await this.$axios.post('form/indoor/add', formData)
            if(result.status!==200){
              throw new Error(result.data.error)
            }
              this.$message.success('Your form has been received successfully.')
              this.formSubmitted = true
              this.isClicked = false;


          }  catch(error){
            console.log(error)
            this.isClicked = false;
          }

        })





    },
    handleRemove(file) {
      const index = this.fileList.indexOf(file);
      const newFileList = this.fileList.slice();
      newFileList.splice(index, 1);
      this.fileList = newFileList;
    },
    beforeUpload(file) {
      this.fileList = [ file];
      return false;
    },
    handleRemoveIdentity(file) {
      const index = this.identityFileList.indexOf(file);
      const newFileList = this.identityFileList.slice();
      newFileList.splice(index, 1);
      this.identityFileList = newFileList;
    },
    beforeUploadIdentity(file) {
      this.identityFileList = [  file];
      return false;
    },
    closeWindow() {
      window.close()
    },
  },
}
</script>

<style scoped>
.anticon .anticon-loading{
  display: none !important;
}
</style>
