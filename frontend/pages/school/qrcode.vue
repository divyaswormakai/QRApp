<template>
  <div>
    <h1>Poster Contact Tracing Form</h1>
    <!--    Button -->
    <a-button type="primary" @click="downloadAllPosters"
    >Download All Images
    </a-button
    >

   <div v-for="(roomName,index) in schoolDetails.classRoomList" :key="roomName+index" style="margin-bottom: 100px;">
     <div class="qr-container" :id="schoolDetails.schoolName+'-'+roomName" style="background-color: white">
       <img
         :src="logoURL"
         alt="E-society logo"
         width="125"
         style="margin-bottom: 25px"
       />
       <p style="color: #f6b618; font-size: 2.5rem; margin: 0; ">
         CONTACT TRACING FORM
       </p>
       <p
         style="color: black; font-size: 2.25rem; margin: 0;"
       >
         <b>QR CODE</b>
       </p>
       <div
         style="
          background-color: #f6b618;
          color: white;
          margin: 2vh 0px;
          padding: 5px 50px;
          border-radius: 25px;
          font-weight: bold;
        "
       >
         Scan This Code
       </div>

       <div
         class="container-body"
       >
         <!--        BORDER IN CANVAS-->
         <div
           class="qr-code"
         >
           <qrcode-vue
             v-show="schoolFormURL.length > 0"
             :value="schoolFormURL+'?room='+roomName"
             size="250"
             class="vendor-qrcode"
             id="vendor-qrcode-contact-poster"
           ></qrcode-vue>
         </div>

         <p style=" font-size: 1.25rem; color:black">
           Safe. Simple. Speedy.
         </p>


         <ul style="color: white; font-size: 16px; font-weight: 600; text-align: left; padding-right: 2%">
           <li>Open QR Scanner/Camera & Scan The Code.</li>
           <li>Fill In Contact Details.</li>
           <li>Receive Immediate Confirmation Email.</li>
         </ul>
         <div style="font-weight: 900; font-size: 1.25rem">
           <span style="text-decoration: line-through">&nbsp;&nbsp;&nbsp;</span>
           GDPR COMPLIANT
           <span style="text-decoration: line-through">&nbsp;&nbsp;&nbsp;</span>
         </div>
         <p style="    padding: 0px 18%;
    font-size: 12px;
    font-weight: 600;
">
           Your information will be kept for 28 days in accordance with; The Health Act 1947 (Section 31A - Temporary Restrictions) (Covid-19) (No. 2) Regulations 2021 (SI 217 of 2021).

         </p>
         <div
           class="footer-3"
         >
           <div style="font-weight: bolder;">{{roomName}}</div>

         </div>
       </div>
     </div>

     <!--    Button -->
     <a-button type="primary" @click="downloadPoster(`${schoolDetails.schoolName}-${roomName}`)"
     >Save Contact Poster QR JPG
     </a-button
     >

   </div>
  </div>
</template>

<script>
import QrcodeVue from "qrcode.vue";
import * as htmlToImage from "html-to-image";
import { BASE_URL } from "@/utils/constants";

export default {
  name: "schoolQRCode",
  components: { QrcodeVue },
  middleware: ["schoolAuth"],
  mounted() {
    if(!this.$route.query.url){
      this.$message.error("QR could not be generated")
      this.$router.push("/school")
    }
    this.schoolFormURL = this.$route.query.url
    this.schoolID = this.$route.query.schoolID
    this.getRoomList()
  },
  computed:{

  },
  data(){
    return{
      schoolFormURL:"",
      schoolID:"",
      schoolDetails:{},
      logoURL: ''
    }
  },
  methods:{
    async getRoomList(){
      try{
        const result = await this.$axios.post("school/"+this.schoolID)
        if(!result.data.schoolName){
          throw new Error("Could not fetch school data")
        }
        this.schoolDetails = result.data
        this.logoURL = BASE_URL+result.data.logoURL
      }catch(err){
        console.log(err)
        this.$message.error("Could not fetch school data")
      }
    },
    downloadPoster(documentID){
      htmlToImage
        .toJpeg(document.getElementById(documentID), { quality: 0.95 })
        .then((dataUrl) => {
          const link = document.createElement("a");
          link.download = documentID+".jpg";
          link.href = dataUrl;
          link.click();
        });
    },
    downloadAllPosters(){
      this.schoolDetails.classRoomList.forEach(room=>{
        const documentID = this.schoolDetails.schoolName+'-'+room
        htmlToImage
          .toJpeg(document.getElementById(documentID), { quality: 0.95 })
          .then((dataUrl) => {
            const link = document.createElement("a");
            link.download = documentID+".jpg";
            link.href = dataUrl;
            link.click();
          });
      })
    }
  }
};
</script>

<style scoped>
.qr-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: slategray;
  padding: 5px;
  margin-bottom: 10px;
  max-width: 450px;
}

a {
  color: white;
  font-size: 14px;
}

h2 {
  font-size: 4rem;
}

canvas {
  border-width: 5px;
  border-style: solid;
  border-color: white;
}

.container-body{
  background-color: #f6b618;
  margin-top: 150px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.footer-3 {
  display: flex;
  flex-direction: row;
  width: 90%;
  /*margin: 10px 0;*/
  justify-content: center;
  align-items: center;
  align-self:center;
  background-color: white;
  padding: 10px 25px;
  border-radius: 25px;
  margin-bottom: 2%;
}

.qr-code{
  width: 270px;
  height: 260px;
  margin-top: -100px;
  background-color: white;
}

@media screen and (max-width: 768px) {
  .footer-3 {
    /*flex-direction: column;*/
    width: 80%;
  }
}
</style>
