<template>
  <div>
    <h3>This will be where forms related to vendor will be shown</h3>
    <a-table
      :columns="columns"
      :data-source="formList"
      :rowKey="(record) => record.id"
    >
      <span slot="formID" slot-scope="text, record, index">{{
        index + 1
      }}</span>
      <a
        slot="fullName"
        slot-scope="text, record"
        :href="'/form/' + record.id"
        >{{ text }}</a
      >
      <span slot="dateOfVisit" slot-scope="text, record">
        {{ text.split('T')[0] }}
      </span>
      <a
        slot="vendorName"
        slot-scope="text, record"
        :href="'/vendor/' + record.vendorID.id"
        >{{ record.vendorID.vendorName }}</a
      >
    </a-table>
  </div>
</template>

<script>
import { FORMS_ADMIN_COLUMNS } from '../../../utils/constants'

export default {
  name: 'forms',
  mounted() {
    const vendorID = window.location?.pathname?.split('/')[3]
    this.vendorID = vendorID
    this.getFormList()
  },
  data() {
    return {
      vendorID: '',
      formList: [],
      columns: FORMS_ADMIN_COLUMNS,
    }
  },
  methods: {
    async getFormList() {
      const forms = await this.$axios.post('/form/vendor/' + this.vendorID)
      if (!Array.isArray(forms?.data)) {
        this.$message.error('Could not load form data.')
      }
      this.formList = forms?.data
      console.log(this.formList)
    },
  },
}
</script>

<style scoped></style>
