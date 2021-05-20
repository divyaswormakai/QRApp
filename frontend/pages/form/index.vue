<template>
  <div>
    <h1>
      The home page to form will be list of all the form filled accessible to
      the admin
    </h1>
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
import { FORMS_ADMIN_COLUMNS } from '../../utils/constants'

export default {
  name: 'index',
  mounted() {
    this.getFormList()
  },
  data() {
    return {
      formList: [],
      columns: FORMS_ADMIN_COLUMNS,
    }
  },
  methods: {
    async getFormList() {
      const forms = await this.$axios.post('/admin/form')
      if (!Array.isArray(forms?.data)) {
        this.$message('Could not load form data.')
      }
      this.formList = forms?.data
      console.log(this.formList)
    },
  },
}
</script>

<style scoped></style>
