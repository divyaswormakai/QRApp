(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{1218:function(t,e,o){"use strict";o.r(e);var n=o(25),r=(o(113),o(114),o(642),o(202),{name:"VendorIndividualComponent",components:{QrcodeVue:o(1199).a},mounted:function(){var t=window.location.pathname.split("/")[2];this.vendorID=t,this.vendorFormURL="".concat(window.location.origin,"/form/new/").concat(t),this.getVendorDetails(t)},computed:{getQrcodeURL:function(){return"/vendor/qrcode/?url="+this.vendorFormURL},vendorSubmittedFormURL:function(){return"/vendor/forms/"+this.vendorID}},data:function(){return{vendorFormURL:"testID",vendorLoaded:!1,vendorDetails:{},vendorID:""}},methods:{getVendorDetails:function(t){var e=this;return Object(n.a)(regeneratorRuntime.mark((function o(){var n;return regeneratorRuntime.wrap((function(o){for(;;)switch(o.prev=o.next){case 0:return o.next=2,e.$axios.post("vendor/"+t);case 2:(n=o.sent).data.vendorName?(e.vendorDetails=n.data,e.vendorLoaded=!0):e.$message.error("Could not fetch vendor data");case 4:case"end":return o.stop()}}),o)})))()}}}),d=o(87),component=Object(d.a)(r,(function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",[o("h1",[t._v("Venue Details:")]),t._v(" "),t.vendorLoaded?o("div",[o("a-row",[o("a-button",{attrs:{type:"primary"}},[o("nuxt-link",{attrs:{to:t.getQrcodeURL,target:"_blank"}},[t._v("Print your QR Code here")])],1),t._v(" "),o("a-button",[o("nuxt-link",{attrs:{to:t.vendorSubmittedFormURL}},[t._v("See all submitted forms")])],1)],1),t._v(" "),o("a-row",[o("table",{staticStyle:{width:"100%"}},[o("tbody",[o("tr",[o("td",{staticClass:"table-bold",attrs:{width:"30%"}},[t._v("Name")]),t._v(" "),o("td",[t._v(t._s(t.vendorDetails.vendorName))])]),t._v(" "),o("tr",[o("td",{staticClass:"table-bold"},[t._v("Email")]),t._v(" "),o("td",[t._v(t._s(t.vendorDetails.vendorEmail))])]),t._v(" "),o("tr",[o("td",{staticClass:"table-bold"},[t._v("Location")]),t._v(" "),o("td",[t._v(t._s(t.vendorDetails.vendorLocation))])]),t._v(" "),o("tr",[o("td",{staticClass:"table-bold"},[t._v("Primary Contact")]),t._v(" "),o("td",[t._v(t._s(t.vendorDetails.vendorContact))])]),t._v(" "),o("tr",[o("td",{staticClass:"table-bold"},[t._v("Secondary Contact")]),t._v(" "),o("td",[t._v(t._s(t.vendorDetails.vendorSecondaryContact))])])])])])],1):t._e()])}),[],!1,null,"13defd03",null);e.default=component.exports}}]);