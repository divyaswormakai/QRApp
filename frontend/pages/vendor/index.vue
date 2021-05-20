<template>
  <div>
    <h1>Vendors: Only for admin</h1>
    <a-button type="primary" @click="showAddFormModal">
      Add a new vendor
    </a-button>
    <a-modal
      title="Add details of the new vendor"
      :visible="visibleAddForm"
      :confirm-loading="confirmLoading"
      @ok="handleVendorAddition"
      @cancel="handleCancel"
    >
      <a-form :form="form">
        <a-form-item label="Name of the vendor">
          <a-input
            v-decorator="[
              'vendorName',
              {
                rules: [
                  {
                    required: true,
                    message: 'Vendor Name can\'t be empty',
                  },
                ],
              },
            ]"
        /></a-form-item>
        <a-form-item label="Location of the vendor">
          <a-input
            v-decorator="[
              'vendorLocation',
              {
                rules: [
                  {
                    required: true,
                    message: 'Vendor Location can\'t be empty',
                  },
                ],
              },
            ]"
        /></a-form-item>

        <a-form-item label="Email of the vendor">
          <a-input
            v-decorator="[
              'vendorEmail',
              {
                rules: [
                  {
                    required: true,
                    message: 'Vendor Email can\'t be empty',
                  },
                ],
              },
            ]"
        /></a-form-item>

        <a-form-item label="Contact Number of the vendor">
          <a-input
            v-decorator="[
              'vendorContact',
              {
                rules: [
                  { required: true, message: 'Vendor Contact can\'t be empty' },
                ],
              },
            ]"
        /></a-form-item>
        <a-form-item label="Secondary Contact of the vendor">
          <a-input v-decorator="['vendorSecondaryContact']"
        /></a-form-item>
      </a-form>
    </a-modal>

    <a-table
      :columns="columns"
      :data-source="vendorList"
      :rowKey="(record) => record.id"
    >
      <a
        slot="vendorName"
        slot-scope="text, record"
        :href="'/vendor/' + record.id"
        >{{ text }}</a
      >
      <span slot="action" slot-scope="text, record">
        <a-button type="primary" @click="EditVendorAction(record)"
          >Edit</a-button
        >
        <a-divider type="vertical" />
        <a-popconfirm
          title="Are you sure?"
          ok-text="Yes"
          cancel-text="No"
          @confirm="deleteVendor(record)"
        >
          <a-button type="danger">Delete</a-button>
        </a-popconfirm>
      </span>
    </a-table>

    <!--    Edit a vendor-->
    <a-modal
      title="Edit Details for the vendor"
      :visible="visibleEditForm"
      :confirm-loading="confirmLoading"
      @ok="handleVendorUpdate"
      @cancel="handleCancel"
    >
      <a-form :form="editForm">
        <a-form-item label="Name of the vendor">
          <a-input
            v-decorator="[
              'vendorName',
              {
                rules: [
                  {
                    required: true,
                    message: 'Vendor Name can\'t be empty',
                  },
                ],
              },
            ]"
        /></a-form-item>
        <a-form-item label="Location of the vendor">
          <a-input
            v-decorator="[
              'vendorLocation',
              {
                rules: [
                  {
                    required: true,
                    message: 'Vendor Location can\'t be empty',
                  },
                ],
              },
            ]"
        /></a-form-item>

        <a-form-item label="Email of the vendor">
          <a-input
            v-decorator="[
              'vendorEmail',
              {
                rules: [
                  {
                    required: true,
                    message: 'Vendor Email can\'t be empty',
                  },
                ],
              },
            ]"
        /></a-form-item>

        <a-form-item label="Contact Number of the vendor">
          <a-input
            v-decorator="[
              'vendorContact',
              {
                rules: [
                  { required: true, message: 'Vendor Contact can\'t be empty' },
                ],
              },
            ]"
        /></a-form-item>
        <a-form-item label="Secondary Contact of the vendor">
          <a-input v-decorator="['vendorSecondaryContact']"
        /></a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script>
import { VENDOR_COLUMNS } from '../../utils/constants'

export default {
  name: 'index',
  mounted() {
    this.getVendorList()
  },
  data() {
    return {
      //  Data elements for table
      vendorList: [],
      columns: VENDOR_COLUMNS,
      //  Data elements for add modal
      visibleAddForm: false,
      confirmLoading: false,
      form: this.$form.createForm(this, { name: 'dynamic_rule' }),
      //  Data elements for edit modal
      visibleEditForm: false,
      editForm: this.$form.createForm(this, { name: 'dynamic_rule' }),
      activeVendorID: '',
    }
  },
  methods: {
    async getVendorList() {
      const vendors = await this.$axios.post('/admin/vendor')
      if (!Array.isArray(vendors?.data)) {
        this.$message.error('Could not load data')
        return
      }
      this.vendorList = vendors?.data
    },
    async deleteVendor(record) {
      const result = await this.$axios.delete(`admin/vendor/${record?.id}`)
      console.log(result)
      if (result?.status === 200) {
        this.$message.success('Successfully deleted' + record?.vendorName)
        this.vendorList = this.vendorList.filter(
          (vendor) => vendor.id !== record.id
        )
      }
    },
    showAddFormModal() {
      this.visibleAddForm = true
    },
    async handleVendorAddition(e) {
      this.confirmLoading = true
      await this.form.validateFields(async (err) => {
        if (!err) {
          const result = await this.$axios.post(
            'admin/vendor/add',
            this.form.getFieldsValue()
          )
          console.log(result)
          if (result?.status === 200) {
            this.vendorList.push(result?.data)
            this.form.resetFields()
            this.$message.success('Successfully added new vendor.')
            this.visibleAddForm = false
          } else {
            this.$message.error('Could not add new vendor.')
          }
        } else {
          this.$message.error('Please input correct values')
        }
        this.confirmLoading = false
      })
    },
    handleCancel(e) {
      this.visibleAddForm = false
      this.visibleEditForm = false
    },
    EditVendorAction(record) {
      this.visibleEditForm = true
      console.log(record)
      Object.keys(record).forEach((recordKey) => {
        this.editForm.getFieldDecorator(recordKey, {
          initialValue: record[recordKey],
        })
      })
      this.activeVendorID = record?.id
    },
    async handleVendorUpdate(e) {
      this.confirmLoading = true
      const updatedVendor = this.editForm.getFieldsValue()
      await this.editForm.validateFields(async (err) => {
        if (!err) {
          const result = await this.$axios.put(
            'admin/vendor/' + this.activeVendorID,
            updatedVendor
          )
          if (result?.status === 200) {
            this.vendorList = this.vendorList.map((vendor) => {
              return vendor.id === this.activeVendorID ? result?.data : vendor
            })
            this.editForm.resetFields()
            this.activeVendorID = ''
            this.$message.success(
              'Successfully updated vendor:' + updatedVendor?.vendorName
            )
            this.visibleEditForm = false
          } else {
            this.$message.error('Could not update vendor.')
          }
        } else {
          this.$message.error('Please input correct values')
        }
        this.confirmLoading = false
      })
    },
  },
}
</script>

<style scoped>
.ant-form-item {
  margin-bottom: 0px;
}
</style>
