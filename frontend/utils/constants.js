export const VENDOR_COLUMNS = [
  {
    dataIndex: 'vendorName',
    key: 'vendorName',
    title: 'Vendor Name',
    scopedSlots: { customRender: 'vendorName' },
    width: 200,
  },
  {
    dataIndex: 'vendorLocation',
    key: 'vendorLocation',
    title: 'Vendor Location',
    width: 200,
  },
  {
    dataIndex: 'vendorEmail',
    key: 'vendorEmail',
    title: 'Vendor Email',
    width: 200,
  },
  {
    dataIndex: 'vendorContact',
    key: 'vendorContact',
    title: 'Vendor Contact',
    width: 200,
  },
  {
    dataIndex: 'vendorSecondaryContact',
    key: 'vendorSecondaryContact',
    title: 'Vendor Secondary Contact',
    width: 200,
  },
  {
    title: 'Action',
    key: 'action',
    scopedSlots: { customRender: 'action' },
    width: 200,
  },
]

export const SCHOOL_COLUMNS = [
  {
    dataIndex: 'logoURL',
    key:'logoURL',
    title:"Logo",
    scopedSlots: {customRender: 'logo'},
    width: 200
  },
  {
    dataIndex: 'schoolName',
    key: 'schoolName',
    title: 'School Name',
    scopedSlots: { customRender: 'schoolName' },
    width: 200,
  },
  {
    dataIndex: 'schoolLocation',
    key: 'schoolLocation',
    title: 'School Location',
    width: 200,
  },
  {
    dataIndex: 'schoolEmail',
    key: 'schoolEmail',
    title: 'School Email',
    width: 200,
  },
  {
    dataIndex: 'schoolContact',
    key: 'schoolContact',
    title: 'School Contact',
    width: 200,
  },
  {
    title: 'Action',
    key: 'action',
    scopedSlots: { customRender: 'action' },
    width: 200,
  },
]

export const FORMS_ADMIN_COLUMNS = [
  {
    dataIndex: 'id',
    key: 'id',
    title: 'ID',
    scopedSlots: { customRender: 'formID' },
    width: 200,
  },
  {
    dataIndex: 'fullName',
    key: 'fullName',
    title: 'Full Name',
    scopedSlots: { customRender: 'fullName' },
    width: 200,
  },
  {
    dataIndex: 'phoneNumber',
    key: 'phoneNumber',
    title: 'Phone Number',
    width: 200,
  },
  {
    dataIndex: 'email',
    key: 'email',
    title: 'Email',
    width: 200,
  },
  {
    dataIndex: 'vendorName',
    key: 'vendorName',
    title: 'Vendor Name',
    scopedSlots: { customRender: 'vendorName' },
    width: 200,
  },
  {
    dataIndex: 'dateOfVisit',
    key: 'dateOfVisit',
    title: 'Date of Visit',
    scopedSlots: { customRender: 'dateOfVisit' },
    width: 200,
  },
  {
    dataIndex: 'timeOfVisit',
    key: 'timeOfVisit',
    title: 'Time of Visit',
    width: 200,
  },
]

export const SCHOOL_FORMS_ADMIN_COLUMNS = [
  {
    dataIndex: 'id',
    key: 'id',
    title: 'ID',
    scopedSlots: { customRender: 'formID' },
    width: 50,
  },
  {
    dataIndex: 'fullName',
    key: 'fullName',
    title: 'Full Name',
    scopedSlots: { customRender: 'fullName' },
    width: 200,
  },
  {
    dataIndex: 'phoneNumber',
    key: 'phoneNumber',
    title: 'Phone Number',
    width: 200,
  },
  {
    dataIndex: 'email',
    key: 'email',
    title: 'Email',
    width: 200,
  },

  {
    dataIndex: 'studentID',
    key: 'studentID',
    title: 'Student ID',
    width: 200,
  },

  {
    dataIndex: 'roomNumber',
    key: 'roomNumber',
    title: 'Room Number',
    width: 200,
  },

  {
    dataIndex: 'dateOfVisit',
    key: 'dateOfVisit',
    title: 'Date of Visit',
    scopedSlots: { customRender: 'dateOfVisit' },
    width: 200,
  },
  {
    dataIndex: 'timeOfVisit',
    key: 'timeOfVisit',
    title: 'Time of Visit',
    width: 200,
  },
]

export const LOCAL_STORAGE_TOKEN = 'scanMeToken'
export const LOCAL_STORAGE_ROLE_TYPE = 'scanMeRole'
export const LOCAL_STORAGE_VENDOR_ID = 'tescanMeVendorID'
export const BASE_URL = 'https://form.e-society.ie/api/'
