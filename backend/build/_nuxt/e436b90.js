(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{1211:function(e,t,o){"use strict";o.r(t);var n=o(26),r=o(1198),c=(o(113),o(114),o(140),o(297),o(202),o(89),o(88),o(25)),d=(o(1203),{name:"index",middleware:["adminAuth"],mounted:function(){this.getFormList()},data:function(){return{formList:[],columns:c.a}},methods:{downloadCSV:function(){var e="data:text/csv;charset=utf-8,";e+=[["S.No.","Full Name","Phone Number","Email","Vendor Name","Date of Visit","Time of Visit","Do you have temperature?","Do you have cough?","Have you travelled abord in past 14 days?","Have you been in positive contact in 14 days?","How many people were there in your table/group?","Comments"].join(",")].concat(Object(r.a)(this.formList.map((function(e,t){var o;return[t+1,e.fullName,e.phoneNumber,e.email,null===(o=e.vendorID)||void 0===o?void 0:o.vendorName,e.dateOfVisit.slice(0,10),e.timeOfVisit,e.temperature?"Yes":"No",e.cough?"Yes":"No",e.abroadIn14Days?"Yes":"No",e.contactIn14Days?"Yes":"No",e.noOfPeopleInGroup,e.comments].join(",")})))).join("\n").replace(/(^\[)|(\]$)/gm,"");var data=encodeURI(e),link=document.createElement("a");link.setAttribute("href",data),link.setAttribute("download","forms.csv"),link.click()},getFormList:function(){var e=this;return Object(n.a)(regeneratorRuntime.mark((function t(){var o;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.$axios.post("/admin/form");case 2:o=t.sent,Array.isArray(null==o?void 0:o.data)?(e.formList=Object(r.a)(o.data),console.log(e.formList)):e.$message.error("Could not load form data.");case 4:case"end":return t.stop()}}),t)})))()}}}),l=o(87),component=Object(l.a)(d,(function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",[o("h1",[e._v("\n    The home page to form will be list of all the form filled accessible to\n    the admin\n  ")]),e._v(" "),o("a-button",{on:{click:function(t){return e.downloadCSV()}}},[e._v("Download CSV")]),e._v(" "),o("a-table",{attrs:{columns:e.columns,"data-source":e.formList,rowKey:function(e){return e.id},scroll:{x:1200}},scopedSlots:e._u([{key:"formID",fn:function(text,t,n){return o("span",{},[e._v(e._s(n+1))])}},{key:"fullName",fn:function(text,t){return o("a",{attrs:{href:"/form/"+t.id}},[e._v(e._s(text))])}},{key:"dateOfVisit",fn:function(text,t){return o("span",{},[e._v("\n      "+e._s(text.split("T")[0])+"\n    ")])}},{key:"vendorName",fn:function(text,t){return o("a",{directives:[{name:"show",rawName:"v-show",value:t.vendorID,expression:"record.vendorID"}],attrs:{href:"/vendor/"+t.vendorID.id}},[e._v(e._s(t.vendorID.vendorName||"Deleted"))])}}])})],1)}),[],!1,null,"341e3299",null);t.default=component.exports}}]);