(window.webpackJsonp=window.webpackJsonp||[]).push([[11],{1200:function(t,e,n){var content=n(1206);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(142).default)("a034beca",content,!0,{sourceMap:!1})},1204:function(t,e,n){t.exports=n.p+"img/esociety_logo_qr.1af5899.svg"},1205:function(t,e,n){"use strict";n(1200)},1206:function(t,e,n){var o=n(141)(!1);o.push([t.i,".qr-container[data-v-0f64f613]{display:flex;flex-direction:column;align-items:center;justify-content:center;background:#fff;padding:5px;margin-bottom:10px;position:relative;width:60vw}a[data-v-0f64f613]{color:#fff;font-size:14px}h2[data-v-0f64f613]{font-size:4rem}canvas[data-v-0f64f613]{border:5px solid #fff}",""]),t.exports=o},1214:function(t,e,n){"use strict";n.r(e);var o=n(1199),r=n(1211),c={name:"qrcode",components:{QrcodeVue:o.a},middleware:["vendorAuth"],mounted:function(){this.$route.query.url||(this.$message.error("QR code could not be generated"),this.$router.push("/vendor")),this.vendorFormURL=this.$route.query.url},data:function(){return{vendorFormURL:""}},methods:{downloadPNGQR:function(){r.a(document.getElementById("qr-container"),{quality:.95}).then((function(t){var link=document.createElement("a");link.download="my-image-name.jpeg",link.href=t,link.click()}))}}},l=(n(1205),n(87)),component=Object(l.a)(c,(function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",[o("div",{staticClass:"qr-container",attrs:{id:"qr-container"}},[o("img",{staticStyle:{"margin-bottom":"25px"},attrs:{src:n(1204),alt:"E-society logo",width:"100"}}),t._v(" "),o("p",{staticStyle:{color:"#f6b618","font-size":"4rem",margin:"0","line-height":"4rem"}},[t._v("\n      TRACK & TRACE\n    ")]),t._v(" "),t._m(0),t._v(" "),o("div",{staticStyle:{"background-color":"#f6b618",color:"white",margin:"2vh 0px",padding:"5px 50px","border-radius":"25px","font-weight":"bold"}},[t._v("\n      Keeping Staff & Customers Safe.\n    ")]),t._v(" "),o("div",{staticStyle:{"background-color":"#f6b618","margin-top":"225px",display:"flex","flex-direction":"column","align-items":"center",height:"100%","max-width":"80vw","min-width":"50vw"}},[o("div",{staticStyle:{width:"320px",height:"310px","margin-top":"-150px","background-color":"white"}},[o("qrcode-vue",{directives:[{name:"show",rawName:"v-show",value:t.vendorFormURL.length>0,expression:"vendorFormURL.length > 0"}],staticClass:"vendor-qrcode",attrs:{value:t.vendorFormURL,size:"300",id:"vendor-qrcode"}})],1),t._v(" "),o("p",{staticStyle:{"font-weight":"bold","font-size":"1.5rem","text-transform":"capitalize"}},[t._v("\n        Scan the QR Code and please fill the form\n      ")]),t._v(" "),t._m(1),t._v(" "),t._m(2),t._v(" "),t._m(3)]),t._v(" "),o("br")]),t._v(" "),o("a-button",{attrs:{type:"primary",id:"png-btn"},on:{click:t.downloadPNGQR}},[t._v("Save PNG")]),t._v(" "),o("div",{attrs:{id:"img-out"}})],1)}),[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("p",{staticStyle:{color:"black","font-size":"4.5rem",margin:"0","line-height":"4.5rem"}},[n("b",[t._v("USING QR CODE")])])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticStyle:{"font-weight":"900","font-size":"1.25rem"}},[n("span",{staticStyle:{"text-decoration":"line-through"}},[t._v("   ")]),t._v("\n        GDPR COMPLIANT\n        "),n("span",{staticStyle:{"text-decoration":"line-through"}},[t._v("   ")])])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticStyle:{width:"80%"}},[n("h3",{staticStyle:{"font-size":"2rem",color:"white"}},[t._v("Instructions:")]),t._v(" "),n("div",{staticStyle:{display:"flex","flex-direction":"row","justify-content":"center",color:"white"}},[n("div",{staticStyle:{width:"49%"}},[n("h3",[t._v("For iOS")]),t._v(" "),n("p",{staticStyle:{"font-weight":"bold","font-size":"1.75rem","text-transform":"capitalize"}},[t._v("\n              Open your camera\n            ")])]),t._v(" "),n("div",{staticStyle:{width:"2px","background-color":"white"}}),t._v(" "),n("div",{staticStyle:{width:"49%"}},[n("h3",[t._v("For Android")]),t._v(" "),n("p",{staticStyle:{"font-weight":"bold","font-size":"1.5rem"}},[t._v("\n              Open your QR Scanner\n            ")])])])])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticStyle:{display:"flex","flex-direction":"row",width:"70%",margin:"20px 0","justify-content":"center","background-color":"white",padding:"5px 25px","border-radius":"25px"}},[n("div",{staticStyle:{"font-weight":"bolder"}},[t._v("\n          Complete the health check. It takes less than a minute. For all of\n          our safety.\n        ")])])}],!1,null,"0f64f613",null);e.default=component.exports}}]);