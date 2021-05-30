<template>
  <div>
    <h3>This will be where forms related to vendor will be shown</h3>
    <a-button @click="downloadCSV()">Download CSV</a-button>
    <a-table
      :columns="columns"
      :data-source="formList"
      :rowKey="(record) => record.id"
      :scroll="{ x: 1200 }"
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
  // middleware: ['vendorAuth'],
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
    downloadCSV() {
      let csvContent = 'data:text/csv;charset=utf-8,'
      csvContent += [
        [
          'S.No.',
          'Full Name',
          'Phone Number',
          'Email',
          'Vendor Name',
          'Date of Visit',
          'Time of Visit',
          'Do you have temperature?',
          'Do you have cough?',
          'Have you travelled abord in past 14 days?',
          'Have you been in positive contact in 14 days?',
          'Comments',
        ].join(','),
        ...this.formList.map((item, index) =>
          [
            index + 1,
            item.fullName,
            item.phoneNumber,
            item.email,
            item.vendorID?.vendorName,
            item.dateOfVisit.slice(0, 10),
            item.timeOfVisit,
            item.temperature ? 'Yes' : 'No',
            item.cough ? 'Yes' : 'No',
            item.abroadIn14Days ? 'Yes' : 'No',
            item.contactIn14Days ? 'Yes' : 'No',
            item.comments,
          ].join(',')
        ),
      ]
        .join('\n')
        .replace(/(^\[)|(\]$)/gm, '')

      const data = encodeURI(csvContent)
      const link = document.createElement('a')
      link.setAttribute('href', data)
      link.setAttribute('download', 'vendorforms.csv')
      link.click()
    },
    async getFormList() {
      const forms = await this.$axios.post('/form/vendor/' + this.vendorID)
      if (!Array.isArray(forms?.data)) {
        this.$message.error('Could not load form data.')
      }
      this.formList = forms?.data
    },
  },
}
</script>

<style scoped></style>
