<template>
    <div>
      <h1>School List</h1>
      <a-button type="primary" @click="showAddFormModal">
        Add a new school
      </a-button>
      <a-modal
        title="Add details of the new school"
        :visible="visibleAddForm"
        :confirm-loading="confirmLoading"
        @ok="handleSchoolAddition"
        @cancel="handleCancel"
      >
        <a-form :form="form">
          <a-form-item label="Name of the school">
            <a-input
              v-decorator="[
              'schoolName',
              {
                rules: [
                  {
                    required: true,
                    message: 'School Name can\'t be empty',
                  },
                ],
              },
            ]"
            /></a-form-item>
          <a-form-item label="Password for the school">
            <a-input
              v-decorator="[
              'password',
              {
                rules: [
                  {
                    required: true,
                    min: 4,
                    message: 'School Password should be at least 4 letters.',
                  },
                ],
              },
            ]"
              type="password"
            /></a-form-item>
          <a-form-item label="Location of the school">
            <a-input
              v-decorator="[
              'schoolLocation',
              {
                rules: [
                  {
                    required: true,
                    message: 'School Location can\'t be empty',
                  },
                ],
              },
            ]"
            /></a-form-item>

          <a-form-item label="Email of the school">
            <a-input
              v-decorator="[
              'schoolEmail',
              {
                rules: [
                  {
                    required: true,
                    message: 'School Email can\'t be empty',
                  },
                ],
              },
            ]"
            /></a-form-item>

          <a-form-item label="Contact Number of the school">
            <a-input
              v-decorator="[
              'schoolContact',
              {
                rules: [
                  { required: true, message: 'School Contact can\'t be empty' },
                ],
              },
            ]"
            />
          </a-form-item>

          <!--          Add some way to upload a csv file and then read the files to make them into array-->
          <a-form-item label="File for ClassRoom" >
            <a-upload :file-list="excelFileList" :remove="handleRemoveExcel" :before-upload="beforeUploadExcel" :multiple="false">
              <a-button> <a-icon type="upload" /> Select Excel File </a-button>
            </a-upload>
          </a-form-item>
          <!--         Upload logo-->
          <a-form-item label="School Logo" >
            <a-upload :file-list="fileList" :remove="handleRemove" :before-upload="beforeUpload" :multiple="false">
              <a-button> <a-icon type="upload" /> Select Logo </a-button>
            </a-upload>
          </a-form-item>
        </a-form>
      </a-modal>

      <a-button @click="downloadCSV()">Download CSV</a-button>

      <a-table
        :columns="columns"
        :data-source="schoolList"
        :scroll="{ x: 1200 }"
        :rowKey="(record) => record.id"
      >
        <img slot="logo" slot-scope="text,record" :src="baseURL+record.logoURL" alt="Logo" width="100" height="100"/>
        <a
          slot="schoolName"
          slot-scope="text, record"
          :href="'/school/' + record.id"
        >{{ text }}</a
        >
        <span slot="action" slot-scope="text, record">
        <a-button type="primary" @click="editSchoolAction(record)"
        >Edit</a-button
        >

      </span>
      </a-table>

      <!--    Edit a school     -->
      <a-modal
        title="Edit Details for the school"
        :visible="visibleEditForm"
        :confirm-loading="confirmLoading"
        @ok="handleSchoolUpdate"
        @cancel="handleCancel"
      >
        <a-form :form="editForm">
          <a-form-item label="Name of the school">
            <a-input
              v-decorator="[
              'schoolName',
              {
                rules: [
                  {
                    required: true,
                    message: 'School Name can\'t be empty',
                  },
                ],
              },
            ]"
            /></a-form-item>
          <a-form-item label="Password for the school">
            <a-input
              v-decorator="[
              'password',
              {
                rules: [
                  {
                    required: true,
                    min: 4,
                    message: 'School Password should be at least 4 letters.',
                  },
                ],
              },
            ]"
              type="password"
              default=""
              placeholder="Put the old password if you don't want to change password"
            /></a-form-item>
          <a-form-item label="Location of the school">
            <a-input
              v-decorator="[
              'schoolLocation',
              {
                rules: [
                  {
                    required: true,
                    message: 'School Location can\'t be empty',
                  },
                ],
              },
            ]"
            /></a-form-item>

          <a-form-item label="Email of the school">
            <a-input
              v-decorator="[
              'schoolEmail',
              {
                rules: [
                  {
                    required: true,
                    message: 'school Email can\'t be empty',
                  },
                ],
              },
            ]"
            /></a-form-item>

          <a-form-item label="Contact Number of the school">
            <a-input
              v-decorator="[
              'schoolContact',
              {
                rules: [
                  { required: true, message: 'School Contact can\'t be empty' },
                ],
              },
            ]"
            /></a-form-item>
<!--          Room list update here. -->
        </a-form>
      </a-modal>
    </div>
</template>

<script>
import {SCHOOL_COLUMNS,BASE_URL} from '~/utils/constants'
import readXlsxFile from 'read-excel-file'

export default {
name: "schoolIndex",
  middleware: ['adminAuth'],
  mounted() {
    this.getSchoolList()
  },
  data(){
    return{
      schoolList:[],
      columns: SCHOOL_COLUMNS,
      visibleAddForm:false,
      confirmLoading:false,
      form: this.$form.createForm(this, { name: 'school-list-form' }),
      //  Data elements for edit modal
      visibleEditForm: false,
      editForm: this.$form.createForm(this, { name: 'editSchoolForm' }),
      activeSchoolID: '',
      baseURL: BASE_URL,
      fileList:[],
      excelFileList:[]
    }
  },
  methods:{
    downloadCSV(){
      let csvContent = 'data:text/csv;charset=utf-8,'
      csvContent += [
        [
          'S.No.',
          'School Name',
          'School Location',
          'School Email',
          'School Contact',

        ].join(','),
        ...this.schoolList.map((item, index) =>
          [
            index + 1,
            item.schoolName,
            item.schoolLocation,
            item.schoolEmail,
            item.schoolContact,

          ].join(',')
        ),
      ]
        .join('\n')
        .replace(/(^\[)|(\]$)/gm, '')

      const data = encodeURI(csvContent)
      const link = document.createElement('a')
      link.setAttribute('href', data)
      link.setAttribute('download', 'schools.csv')
      link.click()
    },

    async getSchoolList(){
     try{
       const result = await this.$axios.post('/admin/school')
       if (!Array.isArray(result?.data)) {
         this.$message.error('Could not load school data')
         return
       }
       this.schoolList = result?.data
     }catch(err){
       this.$message.error("Could not fetch school list.")
     }
    },

    showAddFormModal() {
      this.visibleAddForm = true
    },

    async handleSchoolAddition(e) {
        this.confirmLoading = true
        await this.form.validateFields(async (err, values) => {
          if (!err) {
            //Calculate the roomlist
            let classRoomList ='';
            const sheets = await readXlsxFile(this.excelFileList[0],{getSheets:true})
            console.log(sheets)
            for(const index in sheets){
              const sheet = sheets[index]
              const data = await readXlsxFile(this.excelFileList[0],{sheet:sheet.name})
              for(const index2 in data){
                if(data[index2][0]==='Room'){
                  continue
                }
                classRoomList+= `${sheet.name} - ${data[index2][0]},`
              }
            }
            classRoomList = classRoomList.slice(0,classRoomList.length-1)

            const formValues = this.form.getFieldsValue();
            const formData = new FormData();
            formData.append("schoolName", formValues.schoolName);
            formData.append("schoolLocation", formValues.schoolLocation);
            formData.append("schoolContact", formValues.schoolContact);
            formData.append("schoolEmail", formValues.schoolEmail);
            formData.append("password", formValues.password);
            formData.append("logo",this.fileList[0])
            formData.append("classRoomList",classRoomList)
            const result = await this.$axios.post('admin/school/add', formData)
            if (result?.status === 200) {
              this.schoolList.push(result?.data)
              this.form.resetFields()
              this.$message.success('Successfully added new school.')
              this.visibleAddForm = false
            } else {
              this.$message.error('Could not add new school.')
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
      this.confirmLoading = false
    },

    editSchoolAction(record) {
      this.visibleEditForm = true

      Object.keys(record).forEach((recordKey) => {
        this.editForm.getFieldDecorator(recordKey, {
          initialValue: record[recordKey],
        })
      })
      this.activeSchoolID = record?.id
    },

    async handleSchoolUpdate(e) {
      this.confirmLoading = true
      const updatedSchool = this.editForm.getFieldsValue()
      await this.editForm.validateFields(async (err) => {
        if (!err) {
          const result = await this.$axios.put(
            'admin/school/' + this.activeSchoolID,
            updatedSchool
          )
          if (result?.status === 200) {
            this.schoolList = this.schoolList.map((school) => {
              return school.id === this.activeSchoolID ? result?.data : school
            })
            this.editForm.resetFields()
            this.activeSchoolID = ''
            this.$message.success(
              'Successfully updated School:' + updatedSchool?.schoolName
            )
            this.visibleEditForm = false
          } else {
            this.$message.error('Could not update school.')
          }
        } else {
          this.$message.error('Please input correct values')
        }
        this.confirmLoading = false
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

    handleRemoveExcel(file) {
      const index = this.excelFileList.indexOf(file);
      const newFileList = this.excelFileList.slice();
      newFileList.splice(index, 1);
      this.excelFileList = newFileList;
    },

    beforeUploadExcel(file) {
      this.excelFileList = [ file];
      return false;
    },
  }

}
</script>

<style scoped>

</style>
