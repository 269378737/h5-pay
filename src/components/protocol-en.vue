<template>
    <div class="container">  
        <el-row id="title" class="fixed-layout" style="z-index:2" v-show="isAndroid()">
            <el-col :p="24">
                <div class="nav-bar">
                <i class="el-icon-arrow-left" @click="backUrl"></i>
                <div class="title" style="text-align: center;"><div style="width: 65%;display: inline-block;">cloud storage service protocol</div></div>
                </div>
            </el-col>
        </el-row>
        <div class="protocol" :style="{ paddingTop: ($store.getters.getBarHeight + 90) + 'px' }">
            <p>
                <span style="font-size: 14px;">Cloud storage service protocol</span>
            </p>
            <p style="font-family: &quot;Microsoft YaHei&quot;; font-size: medium;">
                <span style="font-size: 14px;">This Agreement is a part of the Stavix User Registration Agreement signed by Stavix Technology Co., Ltd. and its affiliates, hereinafter referred to as &quot;Stavix&quot; and users of Stavix cloud services (hereinafter referred to as &quot;you&quot; or &quot;user&quot;). In particular, McCore reminds you to read and fully understand this &quot;Stavix Cloud Storage Service Agreement&quot; hereinafter referred to as &quot;this agreement&quot; before using Stavix Cloud Storage Services.</span>
            </p>
            <p style="font-family: &quot;Microsoft YaHei&quot;; font-size: medium;">
                <span style="font-size: 14px;">One. Service Content</span>
            </p>
            <p style="font-family: &quot;Microsoft YaHei&quot;; font-size: medium;">
                <span style="font-size: 14px;">Stavix Cloud Storage Service is a platform for providing data storage, management, sharing and other online services to the majority of Stavix users.It does not directly upload or provide content.You are registering after registration.You can add your Stavix smart device.You can remotely manipulate the added device through the Web interface, PC client or mobile client interface The details are as follows.</span>
            </p>
            <p style="font-family: &quot;Microsoft YaHei&quot;; font-size: medium;">
                <span style="font-size: 14px;">1. View function</span>
            </p>
            <p style="font-family: &quot;Microsoft YaHei&quot;; font-size: medium;">
                <span style="font-size: 14px;">1) video preview:</span>
            </p>
            <p style="font-family: &quot;Microsoft YaHei&quot;; font-size: medium;">
                <span style="font-size: 14px;">You can preview the live video of the device in real time through the client.</span>
            </p>
            <p style="font-family: &quot;Microsoft YaHei&quot;; font-size: medium;">
                <span style="font-size: 14px;">2) video playback.</span>
            </p>
            <p style="font-family: &quot;Microsoft YaHei&quot;; font-size: medium;">
                <span style="font-size: 14px;">You can view historical videos stored in the Stavix Smart Device or Memory Card through the client. If the Stavix Cloud Storage Service is enabled, historical videos stored on the Stavix Cloud Storage can be replayed.</span>
            </p>
            <p style="font-family: &quot;Microsoft YaHei&quot;; font-size: medium;">
                <span style="font-size: 14px;">3) cloud images.</span>
            </p>
            <p style="font-family: &quot;Microsoft YaHei&quot;; font-size: medium;">
                <span style="font-size: 14px;">If your device supports cloud storage, you can view alert videos and pictures stored on cloud storage during the service cycle after purchasing and launching the McCore cloud storage service.</span>
            </p>
            <p style="font-family: &quot;Microsoft YaHei&quot;; font-size: medium;">
                <span style="font-size: 14px;">2、interactive function</span>
            </p>
            <p style="font-family: &quot;Microsoft YaHei&quot;; font-size: medium;">
                <span style="font-size: 14px;">1) Gegensprechanlage</span>
            </p>
            <p style="font-family: &quot;Microsoft YaHei&quot;; font-size: medium;">
                <span style="font-size: 14px;">If your device supports walkie-talkie</span>
            </p>
            <p style="font-family: &quot;Microsoft YaHei&quot;; font-size: medium;">
                <span style="font-size: 14px;">2) leave a message</span>
            </p>
            <p style="font-family: &quot;Microsoft YaHei&quot;; font-size: medium;">
                <span style="font-size: 14px;">If your device supports the message function, you can interact with your family / friends on the smart device side via the client.</span>
            </p>
            <p style="font-family: &quot;Microsoft YaHei&quot;; font-size: medium;">
                <span style="font-size: 14px;">3) cloud platform</span>
            </p>
            <p style="font-family: &quot;Microsoft YaHei&quot;; font-size: medium;">
                <span style="font-size: 14px;">If your device supports the function of cloud platform, you can operate the PTZ of Stavix intelligent device remotely through the client.</span>
            </p>
            <p style="font-family: &quot;Microsoft YaHei&quot;; font-size: medium;">
                <span style="font-size: 14px;">4) manual video recording</span>
            </p>
            <p style="font-family: &quot;Microsoft YaHei&quot;; font-size: medium;">
                <span style="font-size: 14px;">In video preview or playback, you can manually videotape the video and save it locally.</span>
            </p>
            <p style="font-family: &quot;Microsoft YaHei&quot;; font-size: medium;">
                <span style="font-size: 14px;">5) manual screenshots</span>
            </p>
            <p style="font-family: &quot;Microsoft YaHei&quot;; font-size: medium;">
                <span style="font-size: 14px;">In video preview or playback, you can save screenshots of the current screen.</span>
            </p>
            <p style="font-family: &quot;Microsoft YaHei&quot;; font-size: medium;">
                <span style="font-size: 14px;">3、Information function</span>
            </p>
            <p style="font-family: &quot;Microsoft YaHei&quot;; font-size: medium;">
                <span style="font-size: 14px;">1) Information push</span>
            </p>
            <p style="font-family: &quot;Microsoft YaHei&quot;; font-size: medium;">
                <span style="font-size: 14px;">If your device supports activity detection function, After opening the activity detection reminder, you will push the event message to your client when you detect a specific activity.</span>
            </p>
            <p style="font-family: &quot;Microsoft YaHei&quot;; font-size: medium;">
                <span style="font-size: 14px;">2) Historical information</span>
            </p>
            <p style="font-family: &quot;Microsoft YaHei&quot;; font-size: medium;">
                <span style="font-size: 14px;">You can check the activity information and message of the past 7 days through the client.</span>
            </p>
            <p style="font-family: &quot;Microsoft YaHei&quot;; font-size: medium;">
                <span style="font-size: 14px;">4、Social functions</span>
            </p>
            <p style="font-family: &quot;Microsoft YaHei&quot;; font-size: medium;">
                <span style="font-size: 14px;">1) share with friends</span>
            </p>
            <p style="font-family: &quot;Microsoft YaHei&quot;; font-size: medium;">
                <span style="font-size: 14px;">You can share the video of Stavix smart device with your friend through mobile phone number. You can also customize the time to share and check the rights of your friends.</span>
            </p>
            <p style="font-family: &quot;Microsoft YaHei&quot;; font-size: medium;">
                <span style="font-size: 14px;">2) social software sharing</span>
            </p>
            <p style="font-family: &quot;Microsoft YaHei&quot;; font-size: medium;">
                <span style="font-size: 14px;">You can share the videos and pictures of Mike&#39;s smart devices to your Wechat friends and friends circle through the mobile phone client [or customize the sharing time as needed]. Your friends can view the videos and share them with other friends again.</span>
            </p>
            <p style="font-family: &quot;Microsoft YaHei&quot;; font-size: medium;">
                <span style="font-size: 14px;">3) two dimensional code sharing</span>
            </p>
            <p style="font-family: &quot;Microsoft YaHei&quot;; font-size: medium;">
                <span style="font-size: 14px;">The device can generate two-dimensional code to share with friends. Friends can scan video code by scanning the two-dimensional code through the mobile client.</span>
            </p>
            <p style="font-family: &quot;Microsoft YaHei&quot;; font-size: medium;">
                <span style="font-size: 14px;">4) Stavix intelligent live sharing</span>
            </p>
            <p style="font-family: &quot;Microsoft YaHei&quot;; font-size: medium;">
                <span style="font-size: 14px;">You can share live video or video from the device with other users or visitors on the live channel of Stavix to watch and share the video in real time. You understand that the corresponding functions of different MCO smart devices are different, and may only contain the above functions. See the operating manual for details. MCO reserves the right to add, delete and adjust the above functions at any time.</span>
            </p>
            <p style="font-family: &quot;Microsoft YaHei&quot;; font-size: medium;">
                <span style="font-size: 14px;">Two. charging instructions</span>
            </p>
            <p style="font-family: &quot;Microsoft YaHei&quot;; font-size: medium;">
                <span style="font-size: 14px;">1. cloud storage belongs to toll service</span>
            </p>
            <p style="font-family: &quot;Microsoft YaHei&quot;; font-size: medium;">
                <span style="font-size: 14px;">You need to purchase recharge card, online payment or other way to pay the service charge to recharge. Stavix reserves the right to adjust fees at any time. If your device supports cloud storage, the device automatically turns on cloud storage for video recording when the device detects activity in the monitoring area after opening the cloud storage service.</span>
            </p>
            <p style="font-family: &quot;Microsoft YaHei&quot;; font-size: medium;">
                <span style="font-size: 14px;">2. you understand and agree</span>
            </p>
            <p style="font-family: &quot;Microsoft YaHei&quot;; font-size: medium;">
                <span style="font-size: 14px;">1) The services described in this Agreement do not support refund or refund after successful purchase.</span>
            </p>
            <p style="font-family: &quot;Microsoft YaHei&quot;; font-size: medium;">
                <span style="font-size: 14px;">2) The purchased service and the purchased account are bound and cannot be transferred to other accounts if the purchased service is deleted from the original account.</span>
            </p>
            <p style="font-family: &quot;Microsoft YaHei&quot;; font-size: medium;">
                <span style="font-size: 14px;">After the cloud storage service is added to the new account, the device will not be able to continue to enjoy cloud storage services.</span>
            </p>
            <p style="font-family: &quot;Microsoft YaHei&quot;; font-size: medium;">
                <span style="font-size: 14px;">3. You understand and agree that the service under this Agreement will be suspended for any reason and that the service period will not be extended.</span>
            </p>
            <p style="font-family: &quot;Microsoft YaHei&quot;; font-size: medium;">
                <span style="font-size: 14px;">4. Stavix has the right to deduct the relevant expenses directly from your account balance according to your usage.</span>
            </p>
            <p style="font-family: &quot;Microsoft YaHei&quot;; font-size: medium;">
                <span style="font-size: 14px;">5. McCorn has the right to freeze the balance of your account in whole or in part when one of the following circumstances exists.</span>
            </p>
            <p style="font-family: &quot;Microsoft YaHei&quot;; font-size: medium;">
                <span style="font-size: 14px;">1) the state authorities have the right to ask for a freeze.</span>
            </p>
            <p style="font-family: &quot;Microsoft YaHei&quot;; font-size: medium;">
                <span style="font-size: 14px;">2) your use of Stavix cloud storage service is suspected of violating national laws and regulations.</span>
            </p>
            <p style="font-family: &quot;Microsoft YaHei&quot;; font-size: medium;">
                <span style="font-size: 14px;">3) When the company considers that there are abnormalities in the operation of your account or the flow of funds on the basis of unilateral and reasonable judgment, the company will freeze the balance of your account in accordance with the foregoing provisions and notify you by mail, in-station letters or short messages. If you have any objection, please contact Stavix customer service center.</span>
            </p>
            <p style="font-family: &quot;Microsoft YaHei&quot;; font-size: medium;">
                <span style="font-size: 14px;">6. in addition to the above fees, you need to undertake the equipment related to the use of this website.</span>
            </p>
            <p style="font-family: &quot;Microsoft YaHei&quot;; font-size: medium;">
                <span style="font-size: 14px;">For example, Stavix smart devices, personal computers, mobile terminals, modems and other devices related to access to the Internet and bear other costs, such as telephone and broadband charges paid for access to the Internet.</span>
            </p>
            <p style="font-family: &quot;Microsoft YaHei&quot;; font-size: medium;">
                <span style="font-size: 14px;">Three. Instructions for use</span>
            </p>
            <p style="font-family: &quot;Microsoft YaHei&quot;; font-size: medium;">
                <span style="font-size: 14px;">1. Using the Stavix Cloud Storage Service, each Stavix smart device requires at least 4M bandwidth... Make sure your network meets the requirements before purchasing. If two or more devices are turned on in the same LAN, your bandwidth requirements will increase accordingly; otherwise, the storage speed of your single device may be affected.</span>
            </p>
            <p style="font-family: &quot;Microsoft YaHei&quot;; font-size: medium;">
                <span style="font-size: 14px;">2. Stavix cloud storage service is for non commercial use only. Without the prior written consent of the company, you are not allowed to use the Stavix Cloud Storage Service for any commercial purposes. Otherwise, Stavix may immediately suspend or terminate the provision of Stavix Cloud Storage Services to you, and reserve the right to pursue legal liability for you in accordance with the law. You are committed to abiding by the Seven Bottom Lines of Laws and Regulations, Socialist System, National Interests, Citizens&#39;Legal Rights and Interests, Public Order, Social Ethics and Information Authenticity.</span>
            </p>
            <p style="font-family: &quot;Microsoft YaHei&quot;; font-size: medium;">
                <span style="font-size: 14px;">a) a violation of the basic principles established by the constitution.</span>
            </p>
            <p style="font-family: &quot;Microsoft YaHei&quot;; font-size: medium;">
                <span style="font-size: 14px;">b) endangering national security, divulging state secrets, subverting state power and undermining national unity.</span>
            </p>
            <p style="font-family: &quot;Microsoft YaHei&quot;; font-size: medium;">
                <span style="font-size: 14px;">c) damage to national honor and interests.</span>
            </p>
            <p style="font-family: &quot;Microsoft YaHei&quot;; font-size: medium;">
                <span style="font-size: 14px;">d) inciting national hatred and national discrimination to destroy national unity.</span>
            </p>
            <p style="font-family: &quot;Microsoft YaHei&quot;; font-size: medium;">
                <span style="font-size: 14px;">e) sabotage the state&#39;s religious policy, advocating evil cults and feudalistic superstitions.</span>
            </p>
            <p style="font-family: &quot;Microsoft YaHei&quot;; font-size: medium;">
                <span style="font-size: 14px;">f) spreading rumors, disturbing social order and destroying social stability.</span>
            </p>
            <p style="font-family: &quot;Microsoft YaHei&quot;; font-size: medium;">
                <span style="font-size: 14px;">g) disseminating obscenity, pornography, gambling, violence, terror or abetting crime.</span>
            </p>
            <p style="font-family: &quot;Microsoft YaHei&quot;; font-size: medium;">
                <span style="font-size: 14px;">h) insulting or slander others, infringing upon the legitimate rights and interests of others.</span>
            </p>
            <p style="font-family: &quot;Microsoft YaHei&quot;; font-size: medium;">
                <span style="font-size: 14px;">i) inciting illegal gatherings, association, parades, demonstrations, and crowds to disturb social order.</span>
            </p>
            <p style="font-family: &quot;Microsoft YaHei&quot;; font-size: medium;">
                <span style="font-size: 14px;">j) activities under the name of illegal NGOs.</span>
            </p>
            <p style="font-family: &quot;Microsoft YaHei&quot;; font-size: medium;">
                <span style="font-size: 14px;">k) other contents prohibited by laws, regulations, regulations or other normative documents.</span>
            </p>
            <p style="font-family: &quot;Microsoft YaHei&quot;; font-size: medium;">
                <span style="font-size: 14px;">If you distribute or disseminate information in violation of the above requirements through the Stavix Cloud Storage, Stavix has the right to delete information, suspend services, terminate services, report to the relevant regulatory authorities, and have the right to restrict some or all of your functions. If you cause losses to the Stavix company or the third party because of the above acts, you should pay compensation. In addition, you know and agree that the company has the right to provide necessary and reasonable systematic records to the competent government departments, judicial organs and other relevant bodies.</span>
            </p>
            <p style="font-family: &quot;Microsoft YaHei&quot;; font-size: medium;">
                <span style="font-size: 14px;">2. some features of Stavix cloud storage enable your video to be shared in video square or your social circle in real time. You understand that even if you delete the video, it may still be cached, copied, or stored independently by the third party. If your videos contain personal information about you or someone else, we would like to remind you that it is necessary to upload, publish and make public. Your disclosure of personal information in an open channel may be collected and used by others for illegal purposes [You shall bear the potential risks and losses arising therefrom].</span>
            </p>
            <p style="font-family: &quot;Microsoft YaHei&quot;; font-size: medium;">
                <span style="font-size: 14px;">Four. License</span>
            </p>
            <p style="font-family: &quot;Microsoft YaHei&quot;; font-size: medium;">
                <span style="font-size: 14px;">you to [you will share your video in real time in the Video Plaza or in your social circle] as if you authorize Stavix and other users to use, display, distribute and promote the aforementioned content globally, free, irrevocable, indefinite and re-licensed The contents shall be duplicated, modified, published, issued and used in any other way.</span>
            </p>
            <p style="font-family: &quot;Microsoft YaHei&quot;; font-size: medium;">
                <span style="font-size: 14px;">Five. Responsibility statement and restriction</span>
            </p>
            <p style="font-family: &quot;Microsoft YaHei&quot;; font-size: medium;">
                <span style="font-size: 14px;">1. Any information uploaded, published, transmitted or otherwise disseminated via the Stavix Cloud Storage Service [whether publicly or privately transmitted] is for your responsibility for uploading [and guarantees the legitimacy, integrity, and authenticity of the uploaded content. In addition, if you use or disseminate information uploaded by other users out of trust, you should also assume potential responsibilities and risks on your own.</span>
            </p>
            <p style="font-family: &quot;Microsoft YaHei&quot;; font-size: medium;">
                <span style="font-size: 14px;">2. Any third-party claim arising from the uploading, publishing, transmitting or otherwise disseminating of information via the Stavix Cloud Storage Service that you provide is flawed or infringes upon the legitimate rights and interests of a third party, including but not limited to patents, trademarks, copyrights, portraits, privacy, reputation, etc. It should be borne by you alone. If a claim is made by a third party against the company and its employees, customers or partners as a result of this, you shall bear all losses incurred by the company and its employees, customers or partners, including attorney&#39;s fees.</span>
            </p>
            <p style="font-family: &quot;Microsoft YaHei&quot;; font-size: medium;">
                <span style="font-size: 14px;">3. The company only provides security measures according to the existing technology to prevent the information stored on the cloud from being lost or abused [but can not make any express or implied guarantee of the absolute security of your information.</span>
            </p>
            <p style="font-family: &quot;Microsoft YaHei&quot;; font-size: medium;">
                <span style="font-size: 14px;">4. use Stavix cloud storage service to access the Internet. Please pay attention to prevent network security risks. Because of network attack, hacker attack, virus infection and other reasons will lead to abnormal operation of the site, information leakage, data loss or other problems, you agree to assume their own risks and losses.</span>
            </p>
            <p style="font-family: &quot;Microsoft YaHei&quot;; font-size: medium;">
                <span style="font-size: 14px;">Six. others</span>
            </p>
            <p style="font-family: &quot;Microsoft YaHei&quot;; font-size: medium;">
                <span style="font-size: 14px;">1. When using the Stavix Cloud Storage Service, you also have to abide by the User Registration Agreement, Privacy Policy and other agreements.</span>
            </p>
            <p style="font-family: &quot;Microsoft YaHei&quot;; font-size: medium;">
                <span style="font-size: 14px;">2. in the maximum extent permitted by law, Stavix has the power of interpretation and amendment to this provision.</span>
            </p>
            <p>
                <br/>
            </p>
        </div>
    </div>
</template>
<script>
export default {
    mounted () {
        this.layoutStatuBar(this.$store.getters.getBarHeight)
        document.body.scrollTop = 0
        if(!this.isAndroid()) {
            this.postMessageToIOS({ navTitle: "cloud storage service protocol" });
        }
    },
    methods: {
        
        backUrl () {
            this.$router.back()
        },
        /** 设置导航布局 */
        layoutStatuBar (height) {
            document.getElementsByClassName('statu-bar')[0].style.height = height + 'px'

            let title = document.getElementById('title')
            title.style.paddingTop = height + 'px'
        },
    }
}
</script>

<style scoped>
.protocol {
  padding: 7.5rem 10px 10px;
}
p {
  text-indent: 2rem;
}
</style>
