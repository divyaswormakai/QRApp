(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{1201:function(e,t,r){var content=r(1208);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,r(142).default)("0a749fce",content,!0,{sourceMap:!1})},1207:function(e,t,r){"use strict";r(1201)},1208:function(e,t,r){var o=r(141)(!1);o.push([e.i,".anticon .anticon-loading[data-v-7ba08f7c]{display:none!important}",""]),e.exports=o},1217:function(e,t,r){"use strict";r.r(t);r(77),r(65),r(78),r(115),r(64),r(116);var o=r(54),n=r(25);r(113),r(114),r(642),r(37),r(203),r(88),r(644);function l(object,e){var t=Object.keys(object);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(object);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(object,e).enumerable}))),t.push.apply(t,r)}return t}function d(e){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?l(Object(source),!0).forEach((function(t){Object(o.a)(e,t,source[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(source)):l(Object(source)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(source,t))}))}return e}var m={name:"NewIndoorFormComponent",mounted:function(){var e,t,r=null===(e=window.location)||void 0===e||null===(t=e.pathname)||void 0===t?void 0:t.split("/")[3];this.vendorID=r,this.getVendorName()},data:function(){return{vendorID:"",form:this.$form.createForm(this,{name:"coordinated"}),vendorName:"",formSubmitted:!1,agreed:!1,fileList:[]}},methods:{getVendorName:function(){var e=this;return Object(n.a)(regeneratorRuntime.mark((function t(){var r;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.$axios.post("vendor/"+e.vendorID);case 2:(r=t.sent).data.vendorName?e.vendorName=r.data.vendorName:e.$message.error("Could not find the vendor. Please scan the QR again");case 4:case"end":return t.stop()}}),t)})))()},handleNewFormAddition:function(e){var t=this;return Object(n.a)(regeneratorRuntime.mark((function r(){return regeneratorRuntime.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return e.preventDefault(),r.next=3,t.form.validateFields(function(){var e=Object(n.a)(regeneratorRuntime.mark((function e(r){var o,n,l;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!r){e.next=3;break}return t.$message.error("Could not submit form. Please try again."),e.abrupt("return");case 3:return d(d({},t.form.getFieldsValue()),{},{vendorID:t.vendorID}),o=t.form.getFieldsValue(),console.log(t.form.getFieldsValue()),console.log(t.fileList),(n=new FormData).append("vendorID",t.vendorID),n.append("email",o.email),n.append("fullName",o.fullName),n.append("dateOfVisit",o.dateOfVisit),n.append("timeOfVisit",o.timeOfVisit.format("hh:mm A").toString()),n.append("image",t.fileList[0]),console.log("BEFORE RESULT"),e.next=17,t.$axios.post("form/indoor/add",n);case 17:l=e.sent,console.log("RESULTT"),console.log(l),"Successful."!==l.data.message&&200!==l.status||(t.$message.success("Your form has been received successfully."),t.formSubmitted=!0);case 21:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}());case 3:case"end":return r.stop()}}),r)})))()},handleRemove:function(e){var t=this.fileList.indexOf(e),r=this.fileList.slice();r.splice(t,1),this.fileList=r},beforeUpload:function(e){return this.fileList=[e],!1},closeWindow:function(){window.close()}}},c=(r(1207),r(87)),component=Object(c.a)(m,(function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",[o("h2",[e._v("Please fill in the form below:")]),e._v(" "),o("div",{directives:[{name:"show",rawName:"v-show",value:e.formSubmitted,expression:"formSubmitted"}]},[o("h3",[e._v("\n      Your form has been submitted. You will receive a copy of the form that\n      you have submitted in the given email address.\n    ")]),e._v(" "),o("a",{on:{click:function(t){return e.closeWindow()}}},[o("i",[e._v("You can close this window.")])])]),e._v(" "),o("a-form",{directives:[{name:"show",rawName:"v-show",value:!e.formSubmitted,expression:"!formSubmitted"}],attrs:{form:e.form},on:{submit:e.handleNewFormAddition}},[o("p",{staticStyle:{background:"#9f9f9f"}},[o("b",[e._v(" Data Protection Notice:")]),e._v(" Your personal data is being collected on\n      this form in order to help prevent the spread of COVID-19 in\n      "),o("b",[o("i",[e._v('"'+e._s(e.vendorName)+'"')])]),e._v("\n      and to protect our staff. Your personal data is being processed in\n      accordance with Article 9(2)(i) of the General Data Protection\n      Regulation, and Section 53 of the Data Protection Act 2018. The\n      information you provide on this form will not be used for any other\n      purpose, and will be strictly confidential. The form will be accessible\n      only to administrator of e-society and the vendor for whom you have\n      filled the form. Your data will be retained for 12 weeks. "),o("br"),e._v(" "),o("b",[e._v("Powered by:")]),o("br"),e._v(" "),o("a",{attrs:{href:"https://e-society.ie"}},[o("img",{attrs:{src:r(643),alt:"E-society logo",width:"150"}})])]),e._v(" "),o("a-form-item",{attrs:{label:"Vendor"}},[o("a-input",{attrs:{disabled:""},model:{value:e.vendorName,callback:function(t){e.vendorName=t},expression:"vendorName"}})],1),e._v(" "),o("a-form-item",{attrs:{label:"Email"}},[o("a-input",{directives:[{name:"decorator",rawName:"v-decorator",value:["email",{rules:[{required:!0,message:"Please input your email!"}]}],expression:"[\n          'email',\n          {\n            rules: [{ required: true, message: 'Please input your email!' }],\n          },\n        ]"}],attrs:{type:"email"}})],1),e._v(" "),o("a-form-item",{attrs:{label:"Full Name"}},[o("a-input",{directives:[{name:"decorator",rawName:"v-decorator",value:["fullName",{rules:[{required:!0,message:"Please input your full name!"}]}],expression:"[\n          'fullName',\n          {\n            rules: [\n              { required: true, message: 'Please input your full name!' },\n            ],\n          },\n        ]"}]})],1),e._v(" "),o("a-form-item",{attrs:{label:"Date of Visit"}},[o("a-date-picker",{directives:[{name:"decorator",rawName:"v-decorator",value:["dateOfVisit",{rules:[{required:!0,message:"Please input your date of visit!"}]}],expression:"[\n          'dateOfVisit',\n          {\n            rules: [\n              { required: true, message: 'Please input your date of visit!' },\n            ],\n          },\n        ]"}],staticStyle:{width:"100%"}})],1),e._v(" "),o("a-form-item",{attrs:{label:"Time of Visit"}},[o("a-time-picker",{directives:[{name:"decorator",rawName:"v-decorator",value:["timeOfVisit",{rules:[{required:!0,message:"Please input your time of visit!"}]}],expression:"[\n          'timeOfVisit',\n          {\n            rules: [\n              { required: true, message: 'Please input your time of visit!' },\n            ],\n          },\n        ]"}],staticStyle:{width:"100%"},attrs:{"use12-hours":"",format:"hh:mm A"}})],1),e._v(" "),o("a-form-item",{attrs:{label:"Upload one of the following:\\nEU Vaccination Cert/ Immunisitaion Proof/ Covid 19 Negative Test or Foreign Equivalent"}},[o("a-upload",{attrs:{"file-list":e.fileList,remove:e.handleRemove,"before-upload":e.beforeUpload,multiple:!1}},[o("a-button",[o("a-icon",{attrs:{type:"upload"}}),e._v(" Select File ")],1)],1)],1),e._v(" "),o("a-form-item",[o("a-button",{attrs:{type:"primary","html-type":"submit"}},[e._v(" Submit ")])],1)],1)],1)}),[],!1,null,"7ba08f7c",null);t.default=component.exports}}]);