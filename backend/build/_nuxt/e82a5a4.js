(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{1211:function(e,t,n){"use strict";n.r(t);var o=n(25),r=n(1198),c=(n(113),n(114),n(140),n(297),n(202),n(89),n(88),n(26)),d=(n(1203),{name:"index",middleware:["adminAuth"],mounted:function(){this.getFormList()},data:function(){return{formList:[],columns:c.a}},methods:{downloadCSV:function(){var e="data:text/csv;charset=utf-8,";e+=[["S.No.","Full Name","Phone Number","Email","Vendor Name","Date of Visit","Time of Visit","Do you have temperature?","Do you have cough?","Have you travelled abord in past 14 days?","Have you been in positive contact in 14 days?","How many people were there in your table/group?","Comments"].join(",")].concat(Object(r.a)(this.formList.map((function(e,t){var n;return[t+1,e.fullName,e.phoneNumber,e.email,null===(n=e.vendorID)||void 0===n?void 0:n.vendorName,e.dateOfVisit.slice(0,10),e.timeOfVisit,e.temperature?"Yes":"No",e.cough?"Yes":"No",e.abroadIn14Days?"Yes":"No",e.contactIn14Days?"Yes":"No",e.noOfPeopleInGroup,e.comments].join(",")})))).join("\n").replace(/(^\[)|(\]$)/gm,"");var data=encodeURI(e),link=document.createElement("a");link.setAttribute("href",data),link.setAttribute("download","forms.csv"),link.click()},getFormList:function(){var e=this;return Object(o.a)(regeneratorRuntime.mark((function t(){var n;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.$axios.post("/admin/form");case 2:n=t.sent,Array.isArray(null==n?void 0:n.data)?e.formList=Object(r.a)(n.data):e.$message.error("Could not load form data.");case 4:case"end":return t.stop()}}),t)})))()}}}),m=n(87),component=Object(m.a)(d,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("h1",[e._v("Submitted Form List")]),e._v(" "),n("a-button",{on:{click:function(t){return e.downloadCSV()}}},[e._v("Download CSV")]),e._v(" "),n("a-table",{directives:[{name:"show",rawName:"v-show",value:e.formList.length>0,expression:"formList.length > 0"}],attrs:{columns:e.columns,"data-source":e.formList,rowKey:function(e){return e.id},scroll:{x:1200}},scopedSlots:e._u([{key:"formID",fn:function(text,t,o){return n("span",{},[e._v(e._s(o+1))])}},{key:"fullName",fn:function(text,t){return n("a",{attrs:{href:"/form/"+t.id}},[e._v(e._s(text))])}},{key:"dateOfVisit",fn:function(text,t){return n("span",{},[e._v("\n      "+e._s(text.split("T")[0])+"\n    ")])}},{key:"vendorName",fn:function(text,t){return n("a",{directives:[{name:"show",rawName:"v-show",value:t.vendorID&&null!==t.vendorID,expression:"record.vendorID && record.vendorID !== null"}],attrs:{href:"/vendor/"+t.vendorID.id}},[e._v(e._s(t.vendorID.vendorName||"Deleted"))])}}])})],1)}),[],!1,null,"e39e473c",null);t.default=component.exports}}]);