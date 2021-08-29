<template>
  <div>
    <h3>List of all school forms in the past 28 days.</h3>
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
      <p slot="fullName" slot-scope="text, record">{{ text }}</p>
      <span slot="dateOfVisit" slot-scope="text, record">
        {{ text.split('T')[0] }}
      </span>

    </a-table>
  </div>
</template>

<script>
import { SCHOOL_FORMS_ADMIN_COLUMNS } from '../../../utils/constants'

export default {
  name: "School Forms",
  mounted(){
    const schoolID = window.location?.pathname?.split('/')[3]
    this.schoolID = schoolID
    this.getSchoolFormList()
  },
  data(){
    return{
      schoolID: '',
      formList:[],
      columns: SCHOOL_FORMS_ADMIN_COLUMNS
    }
  },
  methods:{
    downloadCSV(){
      let csvContent = 'data:text/csv;charset=utf-8,'
      csvContent += [
        [
          'S.No.',
          'Full Name',
          'Phone Number',
          'Email',
          'Student ID',
          'Room Number',
          'Date of Visit',
          'Time of Visit',
        ].join(','),
        ...this.formList.map((item, index) =>
          [
            index + 1,
            item.fullName,
            item.phoneNumber,
            item.email,
            item.studentID,
            item.roomNumber,
            item.dateOfVisit.slice(0, 10),
            item.timeOfVisit,
          ].join(',')
        ),
      ]
        .join('\n')
        .replace(/(^\[)|(\]$)/gm, '')

      const data = encodeURI(csvContent)
      const link = document.createElement('a')
      link.setAttribute('href', data)
      const date = new Date()
      link.setAttribute('download', `forms-${date.toISOString().split('T')[0]}.csv`)
      link.click()
    },
    async getSchoolFormList(){
      const result = await this.$axios.post("/form/school/"+this.schoolID)
      if(!Array.isArray(result?.data)){
        this.$message.error("Could not load forms data")
      }
      this.formList=result?.data
    }
  }
};
</script>

<style scoped>

</style>
