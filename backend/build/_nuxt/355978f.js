(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{1226:function(e,n,t){"use strict";t.r(n);var r=t(26),o=t(1199),d=(t(113),t(114),t(140),t(297),t(202),t(89),t(88),t(22)),c=(t(1208),{name:"index",middleware:["adminAuth"],mounted:function(){this.getFormList()},data:function(){return{formList:[],columns:d.b}},methods:{downloadCSV:function(){var e="data:text/csv;charset=utf-8,";e+=[["S.No.","Full Name","Phone Number","Email","Vendor Name","Date of Visit","Time of Visit","How many people are there in your table/group?"].join(",")].concat(Object(o.a)(this.formList.map((function(e,n){var t;return[n+1,e.fullName,e.phoneNumber,e.email,(null===(t=e.vendorID)||void 0===t?void 0:t.vendorName)||"",e.dateOfVisit.slice(0,10),e.timeOfVisit,e.noOfPeopleInGroup].join(",")})))).join("\n").replace(/(^\[)|(\]$)/gm,"");var data=encodeURI(e),link=document.createElement("a");link.setAttribute("href",data),link.setAttribute("download","forms.csv"),link.click()},getFormList:function(){var e=this;return Object(r.a)(regeneratorRuntime.mark((function n(){var t;return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,e.$axios.post("/admin/form");case 2:t=n.sent,Array.isArray(null==t?void 0:t.data)?e.formList=Object(o.a)(t.data):e.$message.error("Could not load form data.");case 4:case"end":return n.stop()}}),n)})))()}}}),l=t(87),component=Object(l.a)(c,(function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("div",[t("h1",[e._v("Submitted Form List")]),e._v(" "),t("a-button",{on:{click:function(n){return e.downloadCSV()}}},[e._v("Download CSV")]),e._v(" "),t("a-table",{directives:[{name:"show",rawName:"v-show",value:e.formList.length>0,expression:"formList.length > 0"}],attrs:{columns:e.columns,"data-source":e.formList,rowKey:function(e){return e.id},scroll:{x:1200}},scopedSlots:e._u([{key:"formID",fn:function(text,n,r){return t("span",{},[e._v(e._s(r+1))])}},{key:"fullName",fn:function(text,n){return t("p",{},[e._v(e._s(text))])}},{key:"dateOfVisit",fn:function(text,n){return t("span",{},[e._v("\n      "+e._s(text.split("T")[0])+"\n    ")])}},{key:"vendorName",fn:function(text,n){return t("a",{directives:[{name:"show",rawName:"v-show",value:n.vendorID&&null!==n.vendorID,expression:"record.vendorID && record.vendorID !== null"}],attrs:{href:"/vendor/"+n.vendorID.id}},[e._v(e._s(n.vendorID.vendorName||"Deleted"))])}}])})],1)}),[],!1,null,"d1829282",null);n.default=component.exports}}]);