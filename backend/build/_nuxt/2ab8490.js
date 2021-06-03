(window.webpackJsonp=window.webpackJsonp||[]).push([[10],{1198:function(e,r,n){"use strict";n.d(r,"a",(function(){return d}));var t=n(203);var o=n(298);function d(e){return function(e){if(Array.isArray(e))return Object(t.a)(e)}(e)||function(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(e)||Object(o.a)(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}},1212:function(e,r,n){"use strict";n.r(r);var t=n(26),o=n(1198),d=(n(113),n(114),n(140),n(297),n(202),n(89),n(77),n(64),n(78),n(25)),c={middleware:["adminAuth"],name:"index",mounted:function(){this.getVendorList()},data:function(){return{vendorList:[],columns:d.e,visibleAddForm:!1,confirmLoading:!1,form:this.$form.createForm(this,{name:"form"}),visibleEditForm:!1,editForm:this.$form.createForm(this,{name:"editForm"}),activeVendorID:""}},methods:{downloadCSV:function(){var e="data:text/csv;charset=utf-8,";e+=[["S.No.","Vendor Name","Vendor Location","Vendor Email","Vendor Contact","Vendor Secondary Contact","Is Vendor Active?"].join(",")].concat(Object(o.a)(this.vendorList.map((function(e,r){return[r+1,e.vendorName,e.vendorLocation,e.vendorEmail,e.vendorContact,e.vendorSecondaryContact,e.active?"Yes":"No"].join(",")})))).join("\n").replace(/(^\[)|(\]$)/gm,"");var data=encodeURI(e),link=document.createElement("a");link.setAttribute("href",data),link.setAttribute("download","vendors.csv"),link.click()},getVendorList:function(){var e=this;return Object(t.a)(regeneratorRuntime.mark((function r(){var n;return regeneratorRuntime.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,e.$axios.post("/admin/vendor");case 2:if(n=r.sent,Array.isArray(null==n?void 0:n.data)){r.next=6;break}return e.$message.error("Could not load data"),r.abrupt("return");case 6:e.vendorList=null==n?void 0:n.data;case 7:case"end":return r.stop()}}),r)})))()},deleteVendor:function(e){var r=this;return Object(t.a)(regeneratorRuntime.mark((function n(){var t;return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,r.$axios.delete("admin/vendor/".concat(null==e?void 0:e.id));case 2:200===(null==(t=n.sent)?void 0:t.status)&&(r.$message.success("Successfully deleted"+(null==e?void 0:e.vendorName)),r.vendorList=r.vendorList.filter((function(r){return r.id!==e.id})));case 4:case"end":return n.stop()}}),n)})))()},showAddFormModal:function(){this.visibleAddForm=!0},handleVendorAddition:function(e){var r=this;return Object(t.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r.confirmLoading=!0,e.next=3,r.form.validateFields(function(){var e=Object(t.a)(regeneratorRuntime.mark((function e(n,t){var o;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(n){e.next=7;break}return e.next=3,r.$axios.post("admin/vendor/add",t);case 3:200===(null==(o=e.sent)?void 0:o.status)?(r.vendorList.push(null==o?void 0:o.data),r.form.resetFields(),r.$message.success("Successfully added new vendor."),r.visibleAddForm=!1):r.$message.error("Could not add new vendor."),e.next=8;break;case 7:r.$message.error("Please input correct values");case 8:r.confirmLoading=!1;case 9:case"end":return e.stop()}}),e)})));return function(r,n){return e.apply(this,arguments)}}());case 3:case"end":return e.stop()}}),e)})))()},handleCancel:function(e){this.visibleAddForm=!1,this.visibleEditForm=!1,this.confirmLoading=!1},EditVendorAction:function(e){var r=this;this.visibleEditForm=!0,Object.keys(e).forEach((function(n){r.editForm.getFieldDecorator(n,{initialValue:e[n]})})),this.activeVendorID=null==e?void 0:e.id},handleVendorUpdate:function(e){var r=this;return Object(t.a)(regeneratorRuntime.mark((function e(){var n;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r.confirmLoading=!0,n=r.editForm.getFieldsValue(),e.next=4,r.editForm.validateFields(function(){var e=Object(t.a)(regeneratorRuntime.mark((function e(t){var o;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t){e.next=7;break}return e.next=3,r.$axios.put("admin/vendor/"+r.activeVendorID,n);case 3:200===(null==(o=e.sent)?void 0:o.status)?(r.vendorList=r.vendorList.map((function(e){return e.id===r.activeVendorID?null==o?void 0:o.data:e})),r.editForm.resetFields(),r.activeVendorID="",r.$message.success("Successfully updated vendor:"+(null==n?void 0:n.vendorName)),r.visibleEditForm=!1):r.$message.error("Could not update vendor."),e.next=8;break;case 7:r.$message.error("Please input correct values");case 8:r.confirmLoading=!1;case 9:case"end":return e.stop()}}),e)})));return function(r){return e.apply(this,arguments)}}());case 4:case"end":return e.stop()}}),e)})))()}}},l=n(87),component=Object(l.a)(c,(function(){var e=this,r=e.$createElement,n=e._self._c||r;return n("div",[n("h1",[e._v("Vendors: Only for admin")]),e._v(" "),n("a-button",{attrs:{type:"primary"},on:{click:e.showAddFormModal}},[e._v("\n    Add a new vendor\n  ")]),e._v(" "),n("a-modal",{attrs:{title:"Add details of the new vendor",visible:e.visibleAddForm,"confirm-loading":e.confirmLoading},on:{ok:e.handleVendorAddition,cancel:e.handleCancel}},[n("a-form",{attrs:{form:e.form}},[n("a-form-item",{attrs:{label:"Name of the vendor"}},[n("a-input",{directives:[{name:"decorator",rawName:"v-decorator",value:["vendorName",{rules:[{required:!0,message:"Vendor Name can't be empty"}]}],expression:"[\n            'vendorName',\n            {\n              rules: [\n                {\n                  required: true,\n                  message: 'Vendor Name can\\'t be empty',\n                },\n              ],\n            },\n          ]"}]})],1),e._v(" "),n("a-form-item",{attrs:{label:"Password for the vendor"}},[n("a-input",{directives:[{name:"decorator",rawName:"v-decorator",value:["password",{rules:[{required:!0,min:4,message:"Vendor Password should be at least 4 letters."}]}],expression:"[\n            'password',\n            {\n              rules: [\n                {\n                  required: true,\n                  min: 4,\n                  message: 'Vendor Password should be at least 4 letters.',\n                },\n              ],\n            },\n          ]"}],attrs:{type:"password"}})],1),e._v(" "),n("a-form-item",{attrs:{label:"Location of the vendor"}},[n("a-input",{directives:[{name:"decorator",rawName:"v-decorator",value:["vendorLocation",{rules:[{required:!0,message:"Vendor Location can't be empty"}]}],expression:"[\n            'vendorLocation',\n            {\n              rules: [\n                {\n                  required: true,\n                  message: 'Vendor Location can\\'t be empty',\n                },\n              ],\n            },\n          ]"}]})],1),e._v(" "),n("a-form-item",{attrs:{label:"Email of the vendor"}},[n("a-input",{directives:[{name:"decorator",rawName:"v-decorator",value:["vendorEmail",{rules:[{required:!0,message:"Vendor Email can't be empty"}]}],expression:"[\n            'vendorEmail',\n            {\n              rules: [\n                {\n                  required: true,\n                  message: 'Vendor Email can\\'t be empty',\n                },\n              ],\n            },\n          ]"}]})],1),e._v(" "),n("a-form-item",{attrs:{label:"Contact Number of the vendor"}},[n("a-input",{directives:[{name:"decorator",rawName:"v-decorator",value:["vendorContact",{rules:[{required:!0,message:"Vendor Contact can't be empty"}]}],expression:"[\n            'vendorContact',\n            {\n              rules: [\n                { required: true, message: 'Vendor Contact can\\'t be empty' },\n              ],\n            },\n          ]"}]})],1),e._v(" "),n("a-form-item",{attrs:{label:"Secondary Contact of the vendor"}},[n("a-input",{directives:[{name:"decorator",rawName:"v-decorator",value:["vendorSecondaryContact"],expression:"['vendorSecondaryContact']"}]})],1)],1)],1),e._v(" "),n("a-button",{on:{click:function(r){return e.downloadCSV()}}},[e._v("Download CSV")]),e._v(" "),n("a-table",{attrs:{columns:e.columns,"data-source":e.vendorList,scroll:{x:1200},rowKey:function(e){return e.id}},scopedSlots:e._u([{key:"vendorName",fn:function(text,r){return n("a",{attrs:{href:"/vendor/"+r.id}},[e._v(e._s(text))])}},{key:"action",fn:function(text,r){return n("span",{},[n("a-button",{attrs:{type:"primary"},on:{click:function(n){return e.EditVendorAction(r)}}},[e._v("Edit")]),e._v(" "),n("a-divider",{attrs:{type:"vertical"}}),e._v(" "),n("a-popconfirm",{attrs:{title:"Are you sure?","ok-text":"Yes","cancel-text":"No"},on:{confirm:function(n){return e.deleteVendor(r)}}},[n("a-button",{attrs:{type:"danger"}},[e._v("Delete")])],1)],1)}}])}),e._v(" "),n("a-modal",{attrs:{title:"Edit Details for the vendor",visible:e.visibleEditForm,"confirm-loading":e.confirmLoading},on:{ok:e.handleVendorUpdate,cancel:e.handleCancel}},[n("a-form",{attrs:{form:e.editForm}},[n("a-form-item",{attrs:{label:"Name of the vendor"}},[n("a-input",{directives:[{name:"decorator",rawName:"v-decorator",value:["vendorName",{rules:[{required:!0,message:"Vendor Name can't be empty"}]}],expression:"[\n            'vendorName',\n            {\n              rules: [\n                {\n                  required: true,\n                  message: 'Vendor Name can\\'t be empty',\n                },\n              ],\n            },\n          ]"}]})],1),e._v(" "),n("a-form-item",{attrs:{label:"Password for the vendor"}},[n("a-input",{directives:[{name:"decorator",rawName:"v-decorator",value:["password",{rules:[{required:!0,min:4,message:"Vendor Password should be at least 4 letters."}]}],expression:"[\n            'password',\n            {\n              rules: [\n                {\n                  required: true,\n                  min: 4,\n                  message: 'Vendor Password should be at least 4 letters.',\n                },\n              ],\n            },\n          ]"}],attrs:{type:"password",default:"",placeholder:"Put the old password if you don't want to change password"}})],1),e._v(" "),n("a-form-item",{attrs:{label:"Location of the vendor"}},[n("a-input",{directives:[{name:"decorator",rawName:"v-decorator",value:["vendorLocation",{rules:[{required:!0,message:"Vendor Location can't be empty"}]}],expression:"[\n            'vendorLocation',\n            {\n              rules: [\n                {\n                  required: true,\n                  message: 'Vendor Location can\\'t be empty',\n                },\n              ],\n            },\n          ]"}]})],1),e._v(" "),n("a-form-item",{attrs:{label:"Email of the vendor"}},[n("a-input",{directives:[{name:"decorator",rawName:"v-decorator",value:["vendorEmail",{rules:[{required:!0,message:"Vendor Email can't be empty"}]}],expression:"[\n            'vendorEmail',\n            {\n              rules: [\n                {\n                  required: true,\n                  message: 'Vendor Email can\\'t be empty',\n                },\n              ],\n            },\n          ]"}]})],1),e._v(" "),n("a-form-item",{attrs:{label:"Contact Number of the vendor"}},[n("a-input",{directives:[{name:"decorator",rawName:"v-decorator",value:["vendorContact",{rules:[{required:!0,message:"Vendor Contact can't be empty"}]}],expression:"[\n            'vendorContact',\n            {\n              rules: [\n                { required: true, message: 'Vendor Contact can\\'t be empty' },\n              ],\n            },\n          ]"}]})],1),e._v(" "),n("a-form-item",{attrs:{label:"Secondary Contact of the vendor"}},[n("a-input",{directives:[{name:"decorator",rawName:"v-decorator",value:["vendorSecondaryContact"],expression:"['vendorSecondaryContact']"}]})],1),e._v(" "),n("a-form-item",{attrs:{label:"Is the vendor active?"}},[n("a-radio-group",{directives:[{name:"decorator",rawName:"v-decorator",value:["active",{rules:[{required:!0,message:"Please select one!"}]}],expression:"[\n            'active',\n            {\n              rules: [{ required: true, message: 'Please select one!' }],\n            },\n          ]"}],attrs:{"button-style":"solid"}},[n("a-radio-button",{attrs:{value:!0}},[e._v(" Yes ")]),e._v(" "),n("a-radio-button",{attrs:{value:!1}},[e._v(" No ")])],1)],1)],1)],1)],1)}),[],!1,null,"5b8c6b20",null);r.default=component.exports}}]);