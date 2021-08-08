<template>
  <div>
    <h1>Submitted Form List</h1>
    <a-button @click="downloadCSV()">Download CSV</a-button>
    <a-table
      :columns="columns"
      :data-source="formList"
      :rowKey="(record) => record.id"
      :scroll="{ x: 1200 }"
      v-show="formList.length > 0"
    >
      <span slot="formID" slot-scope="text, record, index">{{
        index + 1
      }}</span>
      <p slot="fullName" slot-scope="text, record">{{ text }}</p>
      <span slot="dateOfVisit" slot-scope="text, record">
        {{ text.split('T')[0] }}
      </span>
      <p slot="vendorName" slot-scope="text, record" v-show="!record.vendorID">
        {{ 'Deleted' }}
      </p>
      <a
        slot="vendorName"
        slot-scope="text, record"
        v-show="record.vendorID && record.vendorID !== null"
        :href="'/vendor/' + record.vendorID.id"
        >{{ record.vendorID.vendorName || 'Deleted' }}</a
      >
    </a-table>
  </div>
</template>

<script>
import { FORMS_ADMIN_COLUMNS } from '../../utils/constants'

const $ = require('jquery')

export default {
  name: 'index',
  middleware: ['adminAuth'],

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

          'How many people are there in your table/group?',

        ].join(','),
        ...this.formList.map((item, index) =>
          [
            index + 1,
            item.fullName,
            item.phoneNumber,
            item.email,
            item.vendorID?.vendorName || '',
            item.dateOfVisit.slice(0, 10),
            item.timeOfVisit,

            item.noOfPeopleInGroup,
          ].join(',')
        ),
      ]
        .join('\n')
        .replace(/(^\[)|(\]$)/gm, '')

      const data = encodeURI(csvContent)
      const link = document.createElement('a')
      link.setAttribute('href', data)
      link.setAttribute('download', 'forms.csv')
      link.click()
    },
    async getFormList() {
      const result = await this.$axios.post('/admin/form')
      if (!Array.isArray(result?.data)) {
        this.$message.error('Could not load form data.')
      } else {
        this.formList = [...result.data]
      }
    },
  },
}
</script>

<style scoped></style>
