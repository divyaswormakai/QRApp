export const VENDOR_COLUMNS = [
  {
    dataIndex: 'vendorName',
    key: 'vendorName',
    title: 'Vendor Name',
    scopedSlots: { customRender: 'vendorName' },
  },
  {
    dataIndex: 'vendorLocation',
    key: 'vendorLocation',
    title: 'Vendor Location',
  },
  {
    dataIndex: 'vendorEmail',
    key: 'vendorEmail',
    title: 'Vendor Email',
  },
  {
    dataIndex: 'vendorContact',
    key: 'vendorContact',
    title: 'Vendor Contact',
  },
  {
    dataIndex: 'vendorSecondaryContact',
    key: 'vendorSecondaryContact',
    title: 'Vendor Secondary Contact',
  },
  {
    title: 'Action',
    key: 'action',
    scopedSlots: { customRender: 'action' },
  },
]

export const FORMS_ADMIN_COLUMNS = [
  {
    dataIndex: 'id',
    key: 'id',
    title: 'ID',
    scopedSlots: { customRender: 'formID' },
  },
  {
    dataIndex: 'fullName',
    key: 'fullName',
    title: 'Full Name',
    scopedSlots: { customRender: 'fullName' },
  },
  {
    dataIndex: 'phoneNumber',
    key: 'phoneNumber',
    title: 'Phone Number',
  },
  {
    dataIndex: 'email',
    key: 'email',
    title: 'Email',
  },
  {
    dataIndex: 'vendorName',
    key: 'vendorName',
    title: 'Vendor Name',
    scopedSlots: { customRender: 'vendorName' },
  },
  {
    dataIndex: 'dateOfVisit',
    key: 'dateOfVisit',
    title: 'Date of Visit',
    scopedSlots: { customRender: 'dateOfVisit' },
  },
  {
    dataIndex: 'timeOfVisit',
    key: 'timeOfVisit',
    title: 'Time of Visit',
  },
]
